"use client";

interface SectionTitleProps {
    title?: string;
    description?: string;
    removeMargin?: boolean;
}

const SectionTitle = ({ title, description, removeMargin = false }: SectionTitleProps) => {
    return (
        <div className={`text-left ${removeMargin ? "" : "mb-16"}`}>
            {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {title}
                </h2>
            )}
            {description && (
                <p className="text-left max-w-3xl">
                    {description}
                </p>
            )}
        </div>
    );
}

export default SectionTitle;