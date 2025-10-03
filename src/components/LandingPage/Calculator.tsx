import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { z } from 'zod/v4'

enum PaymentMethod {
    DIRECT = "financiamiento-directo",
    DEVELOPMENT = "pago-durante-el-desarrollo"
}

const paymentMethodValues = Object.values(PaymentMethod);
const getPaymentMethodLabel = (method: PaymentMethod): string => {
    switch (method) {
        case PaymentMethod.DIRECT:
            return "Financiación directa";
        case PaymentMethod.DEVELOPMENT:
            return "Pago durante el desarrollo";
    }
}

enum PaymentPeriod {
    ONE_YEAR = "1-year",
    TWO_YEARS = "2-years",
    THREE_YEARS = "3-years",
    FOUR_YEARS = "4-years",
    FIVE_YEARS = "5-years",
}
const paymentPeriodValues = Object.values(PaymentPeriod);
const paymentPeriod_DevelopmentFinancing = [
    PaymentPeriod.ONE_YEAR,
    PaymentPeriod.TWO_YEARS
]
const getPaymentPeriodLabel = (period: PaymentPeriod): string => {
    switch (period) {
        case PaymentPeriod.ONE_YEAR:
            return "1 año";
        case PaymentPeriod.TWO_YEARS:
            return "2 años";
        case PaymentPeriod.THREE_YEARS:
            return "3 años";
        case PaymentPeriod.FOUR_YEARS:
            return "4 años";
        case PaymentPeriod.FIVE_YEARS:
            return "5 años";
    }
}
const paymentPeriodToMonths = (period: PaymentPeriod): number => {
    switch (period) {
        case PaymentPeriod.ONE_YEAR:
            return 12 * 1;
        case PaymentPeriod.TWO_YEARS:
            return 12 * 2;
        case PaymentPeriod.THREE_YEARS:
            return 12 * 3;
        case PaymentPeriod.FOUR_YEARS:
            return 12 * 4;
        case PaymentPeriod.FIVE_YEARS:
            return 12 * 5;
    }
}

const calculatorSchema = z.object({
    capital: z.number("El capital a financiar es requerido").gt(0, "El capital a financiar debe ser mayor a 0").check((ctx) => {
        if (ctx.value < 3000000) {
            ctx.issues.push({
                code: "custom",
                message: "El capital a financiar debe ser mayor a 3.000.000",
                input: ctx.value,
            });
            return z.NEVER;
        }
    }),
    interestRate: z.number("La tasa de interés es requerida"),
    paymentMethod: z.enum(PaymentMethod),
    paymentPeriod: z.enum(PaymentPeriod),
})

type CalculatorType = z.infer<typeof calculatorSchema>;

const calculateMonthlyPayment = (values: CalculatorType) => {
    const months = paymentPeriodToMonths(values.paymentPeriod);
    const amount = values.capital;

    const interest = values.interestRate / 100;
    if (values.paymentMethod === PaymentMethod.DIRECT) {
        const calculate = (amount * interest * (Math.pow((1 + interest), (months)))) / ((Math.pow((1 + interest), (months))) - 1);
        return calculate;
    } else {
        const calculate = (amount - 3000000) / months;
        return calculate;
    }

}

const getDifferenceTextColor = (value: number) => {
    if (value !== undefined && value !== null) {
        if (value < 3000000) {
            return "text-red-600";
        }
        return "text-green-600";
    }
    return "text-gray-800";
}

const Calculator: React.FC = () => {
    const form = useForm({
        defaultValues: {
            capital: undefined,
            interestRate: 0.9,
            paymentMethod: PaymentMethod.DIRECT,
            paymentPeriod: PaymentPeriod.ONE_YEAR,
        } as unknown as CalculatorType,
        validators: {
            onChange: calculatorSchema,
            onBlur: calculatorSchema,
            onSubmit: calculatorSchema,
        },
        onSubmit: ({ value }) => {
            console.log('Form submitted successfully:', value);
            const calculatedPayment = calculateMonthlyPayment(value);
            setMonthlyPayment(calculatedPayment);
        },
    })

    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const handlePaymentMethodChange = (value: PaymentMethod) => {
        form.setFieldValue("paymentPeriod", PaymentPeriod.ONE_YEAR);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        }}>
            <div className="mt-10 p-10 max-w-[800px] mx-auto flex flex-col overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-black/5 data-dark:bg-theme-background-200 data-dark:ring-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <form.Field name="capital">
                            {(field) => (
                                <>
                                    <div className="flex justify-between gap-2">
                                        <label htmlFor="capital-a-financiar" className="block text-sm/6 font-medium text-gray-600">
                                            Valor de fracción
                                        </label>
                                        <p className="text-sm text-gray-600">Valor de reserva: $3.000.000</p>
                                    </div>
                                    <div className="mt-2">
                                        <div className={`${"flex items-center rounded-md bg-gray-950/5 pl-3 outline-1 -outline-offset-1 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2"} ${(field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? "outline-red-500" : "outline-black/10 has-[input:focus-within]:outline-theme-gold"}`}>
                                            <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">COP $</div>
                                            <input
                                                id="capital-a-financiar"
                                                name="capital-a-financiar"
                                                type="text"
                                                inputMode="decimal"
                                                placeholder="0.00"
                                                value={field.state.value === undefined || field.state.value === null ? "" : new Intl.NumberFormat('es-CO').format(field.state.value)}
                                                onChange={(e) => {
                                                    const raw = e.target.value
                                                        .replace(/\./g, "")
                                                        .replace(/,/g, ".")
                                                        .replace(/[^\d.\-]/g, "");
                                                    if (raw === "") {
                                                        field.handleChange(undefined as unknown as number);
                                                        return;
                                                    }
                                                    const parsed = parseFloat(raw);
                                                    if (Number.isNaN(parsed)) {
                                                        field.handleChange(undefined as unknown as number);
                                                    } else {
                                                        field.handleChange(parsed as unknown as number);
                                                    }
                                                }}
                                                onBlur={field.handleBlur}
                                                aria-invalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                            />
                                        </div>
                                        {(field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? (
                                            <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
                                        ) : null}
                                        <p className={`mt-1 text ${getDifferenceTextColor(field.state.value)}`}>Valor a diferir: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format((typeof field.state.value === 'number' && !Number.isNaN(field.state.value)) ? field.state.value - 3000000 : 0)}</p>
                                    </div>
                                </>
                            )}
                        </form.Field>

                    </div>
                    <div className="col-span-1">
                        <label htmlFor="tasa-de-interes" className="block text-sm/6 font-medium text-gray-600">
                            Tasa de interés (E.M.)
                        </label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-gray-950/5 pl-3 outline-1 -outline-offset-1 outline-black/10 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-theme-gold">
                                <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">%</div>
                                <input
                                    id="tasa-de-interes"
                                    name="tasa-de-interes"
                                    type="text"
                                    placeholder="0.9"
                                    value="0.9"
                                    disabled
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-800 placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <form.Field name="paymentMethod">
                            {({ state, handleChange, handleBlur }) => (
                                <>
                                    <label htmlFor="modo-de-pago" className="block text-sm/6 font-medium text-gray-600">
                                        Modo de pago
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id="modo-de-pago"
                                            name="modo-de-pago"
                                            autoComplete="modo-de-pago"
                                            value={state.value}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-950/5 py-1.5 pr-8 pl-3 text-base text-gray-800 outline-1 -outline-offset-1 outline-black/10 *:bg-gray-950/5 focus:outline-2 focus:-outline-offset-2 focus:outline-theme-gold sm:text-sm/6"
                                            onChange={(e) => {
                                                handleChange(e.target.value as PaymentMethod);
                                                handlePaymentMethodChange(e.target.value as PaymentMethod);
                                            }}
                                            onBlur={handleBlur}
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                        >
                                            {paymentMethodValues.map((method) => (
                                                <option key={method} value={method}>{getPaymentMethodLabel(method)}</option>
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
                                    {form.state.values.paymentMethod === PaymentMethod.DEVELOPMENT ? (
                                        <p className="mt-1 text-sm text-gray-600">Paga máximo a 24 cuotas sin interés</p>
                                    ) : (
                                        <>
                                            <p className="mt-1 text-sm text-gray-600">Paga máximo a 60 cuotas</p>
                                            <p className="mt-1 text-sm text-gray-600">Tasa del 0,9% E.M.</p>
                                            <p className="mt-1 text-sm text-gray-600">Has aportes a capital cuando quieras</p>
                                        </>
                                    )}
                                </>
                            )}
                        </form.Field>
                    </div>
                    <div className="col-span-1">
                        <form.Field name="paymentPeriod">
                            {({ state, handleChange, handleBlur }) => (
                                <>
                                    <label htmlFor="plazo-de-pago" className="block text-sm/6 font-medium text-gray-600">
                                        Plazo de Pago
                                    </label>
                                    <div className="mt-2 grid grid-cols-1">
                                        <select
                                            id="plazo-de-pago"
                                            name="plazo-de-pago"
                                            autoComplete="plazo-de-pago"
                                            value={state.value}
                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-950/5 py-1.5 pr-8 pl-3 text-base text-gray-800 outline-1 -outline-offset-1 outline-black/10 *:bg-gray-950/5 focus:outline-2 focus:-outline-offset-2 focus:outline-theme-gold sm:text-sm/6"
                                            onChange={(e) => handleChange(e.target.value as PaymentPeriod)}
                                            onBlur={handleBlur}
                                            aria-invalid={state.meta.errors.length > 0 && state.meta.isTouched}
                                        >
                                            {form.state.values.paymentMethod === PaymentMethod.DEVELOPMENT ? (
                                                paymentPeriod_DevelopmentFinancing.map((period) => (
                                                    <option key={period} value={period}>{getPaymentPeriodLabel(period)}</option>
                                                ))
                                            ) :
                                                paymentPeriodValues.map((period) => (
                                                    <option key={period} value={period}>{getPaymentPeriodLabel(period)}</option>
                                                ))
                                            }
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
                    <div className="col-span-1 sm:col-span-2">
                        <button type="submit" className="w-full rounded-full bg-theme-gold px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-theme-gold/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-gold">Calcular</button>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <div className="flex flex-col gap-4">
                            <p className="text-lg font-bold text-black">Resumen de la inversión</p>
                            <div className="flex justify-between gap-2">
                                <p className="text-sm text-gray-600">Cuota mensual</p>
                                <p className="font-semibold text-black">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monthlyPayment)}</p>
                            </div>
                            <div className="flex justify-between gap-2">
                                <p className="text-sm text-gray-600">Plazo</p>
                                <p className="font-semibold text-black uppercase">{getPaymentPeriodLabel(form.state.values.paymentPeriod)}</p>
                            </div>
                            <div className="flex justify-between gap-2">
                                <p className="text-sm text-gray-600">Tasa de interés</p>
                                <p className="font-semibold text-black">{form.state.values.interestRate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default Calculator;