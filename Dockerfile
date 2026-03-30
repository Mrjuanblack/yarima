# --- Stage 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time arguments para variables NEXT_PUBLIC_*
ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Convertimos ARGs a ENVs para que Next.js los vea durante build
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Instalamos dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el codigo
COPY . .

# Construimos la app en modo standalone
RUN npm run build

# --- Stage 2: Runner (Produccion) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copiamos la carpeta public desde el builder
COPY --from=builder /app/public ./public

# Copiamos la aplicacion standalone
COPY --from=builder /app/.next/standalone ./

# Copiamos los archivos estaticos
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Docker healthcheck
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=20s \
            --retries=3 \
            CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
