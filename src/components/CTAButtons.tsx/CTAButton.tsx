interface CTAButtonBaseProps {
    children: React.ReactNode;
    onClick: () => void;
    darkBg?: boolean;
}

const CTAButtonBase = ({ children, onClick, darkBg = false }: CTAButtonBaseProps) => {
    const variantClasses = darkBg
        ? "border border-white text-white bg-transparent hover:bg-white/10"
        : "border border-transparent bg-theme-background-dark-950 text-white shadow-md hover:bg-gray-600";

    return (
        <button className={`cursor-pointer sm:w-auto inline-flex items-center justify-center px-8 py-[calc(--spacing(2)-1px)] rounded-full text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap transition-colors ${variantClasses}`} onClick={onClick}>{children}</button>
    );
}

export default CTAButtonBase;