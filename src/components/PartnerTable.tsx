"use client";

const PartnerTable = () => {
    const rowPadding = "px-0 py-2";
    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                <div className="w-full">
                    <div className="flex -mx-4 rounded-lg bg-gray-50 px-4 py-3">
                        <h3 className="text-sm/6 font-semibold">Hazte socio</h3>
                    </div>
                    <ul className="list-disc list-inside">
                        <li className="text-sm/6 font-normal text-gray-600">Invierte a través de derechos fiduciarios y separa tu reserva con sólo $3.000.000 COP.</li>
                    </ul>
                </div>
                <div className="w-full">
                    <div className="flex -mx-4 rounded-lg bg-gray-50 px-4 py-3">
                        <h3 className="text-sm/6 font-semibold">Beneficios</h3>
                    </div>
                    <ul className="list-disc list-inside">
                        <li className="text-sm/6 font-normal text-gray-600">Rentabilidad mensual derivada de la operación del resort.</li>
                        <li className="text-sm/6 font-normal text-gray-600">5 noches anuales gratis y uso ilimitado de las zonas sociales.</li>
                        <li className="text-sm/6 font-normal text-gray-600">Membresía vitalicia al Club de Playa (puedes llevar invitados).</li>
                        <li className="text-sm/6 font-normal text-gray-600">Acceso preferente a experiencias y futuros proyectos.</li>
                    </ul>
                </div>
                <div className="w-full">
                    <div className="flex -mx-4 rounded-lg bg-gray-50 px-4 py-3">
                        <h3 className="text-sm/6 font-semibold">Formas de pago (3)</h3>
                    </div>
                    <ul className="list-disc list-inside">
                        <li className="text-sm/6 font-normal text-gray-600">Reserva: $3.000.000</li>
                        <li className="text-sm/6 font-normal text-gray-600">Paga en 24 cuotas (sin intereses)</li>
                        <li className="text-sm/6 font-normal text-gray-600">Fináncialo a 60 cuotas(1% E.M.)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PartnerTable;