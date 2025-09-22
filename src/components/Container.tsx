"use client";
interface ContainerProps {
    children: React.ReactNode;
    id?: string;
}
const Container: React.FC<ContainerProps> = ({ children, id }) => {
    return (
        <div className="w-full mx-auto px-8 sm:px-16 md:px-32" id={id}>
            {children}
        </div>
    );
}

export default Container;