import { useForm } from "@tanstack/react-form";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { z } from "zod/v4";
import { countries } from "country-codes-flags-phone-codes";
import { useEffect, useState, useRef } from "react";

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

enum Interest {
    PROFITABILITY = "profitability",
    USE = "use",
    BOTH = "both",
}

const interestValues = Object.values(Interest);
const getInterestLabel = (interest: Interest): string => {
    switch (interest) {
        case Interest.PROFITABILITY:
            return "Rentabilidad";
        case Interest.USE:
            return "Uso";
        case Interest.BOTH:
            return "Ambos";
    }
}


const contactSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    countryPhoneCode: z.string().min(1, "El código de país es requerido"),
    whatsapp: z.string().min(1, "El número de WhatsApp es requerido"),
    interest: z.enum(interestValues),
})

type ContactType = z.infer<typeof contactSchema>;

// Custom Country Select Component
const CountrySelect = ({ value, onChange, onBlur, isInvalid }: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    isInvalid: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openUpward, setOpenUpward] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCountry = countries.find(country => country.dialCode === value) || countries[0];
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialCode.includes(searchTerm)
    );

    const checkSpaceAndToggle = () => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = 240; // Approximate height of dropdown
            
            // Open upward if there's not enough space below but enough space above
            setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={checkSpaceAndToggle}
                onBlur={onBlur}
                className={`w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-theme-gold sm:text-sm/6 ${isInvalid ? 'outline-red-500' : 'outline-black/10'}`}
            >
                <div className="flex items-center justify-between">
                    <span className="text-gray-800">{selectedCountry.dialCode}</span>
                    <span>{selectedCountry.flag}</span>
                </div>
            </button>
            <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-400"
            />
            
            {isOpen && (
                <div className={`absolute left-0 right-0 z-50 rounded-md bg-white border border-gray-200 shadow-lg ${
                    openUpward ? 'bottom-full mb-1' : 'top-full mt-1'
                }`}>
                    <div className="p-2 border-b border-gray-100">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="max-h-48 overflow-y-auto rounded-b-md">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                    onChange(country.dialCode);
                                    setIsOpen(false);
                                    setSearchTerm("");
                                }}
                                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between ${
                                    country.dialCode === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                                }`}
                            >
                                <span className="text-gray-800">{country.dialCode}</span>
                                <span>{country.flag}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ContactForm = () => {
    const formMountedAtMs = useRef<number>(Date.now());
    const botcheckRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const existing = document.querySelector<HTMLScriptElement>("script[data-recpatcha='v3']");
        if (existing) {
            setIsRecaptchaReady(!!window.grecaptcha);
            return;
        }
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        script.setAttribute("data-recpatcha", "v3");
        script.onload = () => {
            window.grecaptcha?.ready(() => setIsRecaptchaReady(true));
        };
        document.head.appendChild(script);
        return () => {
            // keep script for other pages; no-op on unmount
        };
    }, []);

    const form = useForm({
        defaultValues: {
            name: "",
            countryPhoneCode: countries[0].dialCode,
            whatsapp: "",
            interest: Interest.PROFITABILITY,
        } as ContactType,
        validators: {
            onChange: contactSchema,
            onBlur: contactSchema,
            onSubmitAsync: contactSchema,
        },
        onSubmit: async ({ value }) => {
            if (isSubmitting) return;
            const elapsedMs = Date.now() - formMountedAtMs.current;
            if (elapsedMs < 1500) {
                return;
            }
            if (botcheckRef.current && botcheckRef.current.value.trim().length > 0) {
                return;
            }

            setIsSubmitting(true);

            // Obtain reCAPTCHA v3 token
            let recaptchaToken = "";
            try {
                if (isRecaptchaReady && window.grecaptcha) {
                    recaptchaToken = await window.grecaptcha.execute(
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
                        { action: "contact_submit" }
                    );
                }
            } catch {
                setIsSubmitting(false);
                return;
            }
            if (!recaptchaToken) {
                setIsSubmitting(false);
                return;
            }

            // Transform to formData
            const formData = new FormData();
            formData.append("name", value.name);
            formData.append("countryPhoneCode", value.countryPhoneCode);
            formData.append("whatsapp", value.whatsapp);
            formData.append("interest", value.interest);
            // Include anti-bot fields for observability/debugging (safe to expose)
            formData.append("g-recaptcha-response", recaptchaToken);
            formData.append("botcheck", "");

            //web3forms data
            formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                console.log("Form Submitted Successfully");
                setIsSubmitted(true);
                form.reset();
            } else {
                console.log("Error", data);
            }
            setIsSubmitting(false);
        },
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        }}>
            <div className="grid grid-cols-1 gap-6">
                {/* Honeypot field (hidden). Real users won't fill it; many bots will. */}
                <input ref={botcheckRef} type="text" name="botcheck" autoComplete="off" className="hidden" tabIndex={-1} aria-hidden="true" />
                <div className="col-span-1">
                    <form.Field name="name">
                        {(field) => (
                            <>
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-600">
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <div className={`${"flex items-center rounded-md bg-gray-950/5 pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2"} ${(field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? "outline-red-500" : "outline-black/10 has-[input:focus-within]:outline-theme-gold"}`}>
                                        {/* <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">$ COP</div> */}
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Ingresa tu nombre"
                                            value={field.state.value ?? ""}
                                            onChange={(e) => {
                                                field.handleChange(e.target.value);
                                            }}
                                            onBlur={field.handleBlur}
                                            aria-invalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                    {(field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? (
                                        <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                                    ) : null}
                                </div>
                            </>
                        )}
                    </form.Field>
                </div>
                <div className="col-span-1">
                    <label htmlFor="whatsapp" className="block text-sm/6 font-medium text-gray-600">
                        WhatsApp
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-gray-950/5 pl-3 outline-1 -outline-offset-1 outline-black/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-theme-gold">
                            <div className="shrink-0 w-32">
                                <form.Field name="countryPhoneCode">
                                    {(field) => (
                                        <CountrySelect
                                            value={field.state.value ?? ""}
                                            onChange={field.handleChange}
                                            onBlur={field.handleBlur}
                                            isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                        />
                                    )}
                                </form.Field>
                            </div>
                            <form.Field name="whatsapp">
                                {(field) => (
                                    <input
                                        id="whatsapp"
                                        name="whatsapp"
                                        type="text"
                                        placeholder="Ingresa tu número de WhatsApp"
                                        value={field.state.value ?? ""}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        onBlur={field.handleBlur}
                                        aria-invalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                    />
                                )}
                            </form.Field>
                        </div>
                        <form.Field name="whatsapp">
                            {(field) => (
                                (field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? (
                                    <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                                ) : null
                            )}
                        </form.Field>
                    </div>
                </div>
                <div className="col-span-1">
                    <form.Field name="interest">
                        {({ state, handleChange, handleBlur }) => (
                            <>
                                <label htmlFor="interest" className="block text-sm/6 font-medium text-gray-600">
                                    Interés
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="interest"
                                        name="interest"
                                        autoComplete="interest"
                                        value={state.value}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-950/5 py-1.5 pr-8 pl-3 text-base text-gray-800 outline-1 -outline-offset-1 outline-black/10 *:bg-gray-950/5 focus:outline-2 focus:-outline-offset-2 focus:outline-theme-gold sm:text-sm/6"
                                        onChange={(e) => handleChange(e.target.value as Interest)}
                                        onBlur={handleBlur}
                                        aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                    >
                                        {interestValues.map((method) => (
                                            <option key={method} value={method}>{getInterestLabel(method)}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                                    />
                                </div>
                                {state.meta.errors.length > 0 && state.meta.isTouched ? (
                                    <p className="mt-1 text-sm text-red-600">{state.meta.errors[0]?.message}</p>
                                ) : null}
                            </>
                        )}
                    </form.Field>
                </div>
                <div className="col-span-1">
                    <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-theme-gold px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-theme-gold/80 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-gold">Enviar</button>
                </div>
                <div className="col-span-1">
                    {isSubmitted ? (
                        <p className="mt-1 text-sm text-green-600">Formulario enviado correctamente</p>
                    ) : null}
                </div>
            </div>
        </form>
    )
}

export default ContactForm;