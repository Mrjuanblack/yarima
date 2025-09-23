interface SectionProps {
    children: React.ReactNode;
    overrideClassName?: string;
}

const Section = ({ children, overrideClassName }: SectionProps) => {
    return (
        <section className={overrideClassName || "py-8 md:py-20"}>
            {children}
        </section>
    );
}

export default Section;