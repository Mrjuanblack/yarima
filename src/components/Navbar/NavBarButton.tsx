import Link from "next/link";
import { useState } from "react";

interface NavBarButtonTestProps {
    text: string;
    url: string;
    showBorder?: boolean;
    textWhite?: boolean;
}

const NavBarButton: React.FC<NavBarButtonTestProps> = ({ text, url, showBorder = true, textWhite = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const textColor = () => {
        if (textWhite) {
            if(isHovered) {
                return 'text-gray-400';
            }
            return 'text-white';
        }
        if(isHovered) {
            return 'text-gray-500';
        }
        return 'text-black';
    };

    const textWeight = () => {
        if(textWhite) {
            return 'font-bold'
        }
        return 'font-semibold';
    };

    return (
        <Link href={url} className="flex flex-col justify-between items-center gap-2" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={`${textColor()} uppercase text-center h-full pt-3 ${textWeight()} text-sm transition-all flex items-center gap-2`}>
                {text}
            </div>
            <div className={`h-1 ${isHovered ? 'w-full' : 'w-[15px]'} ${isHovered ? 'border-white' : 'border-gray-200'} ${showBorder ? 'border-b relative -bottom-[1px]' : ''} transition-[width,color] duration-200`} />
        </Link>
    );
}

export default NavBarButton;