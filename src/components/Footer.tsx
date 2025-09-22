import Container from "./Container"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";


const Footer: React.FC = () => {
    const socialMediaSize = "w-5 h-auto";
    return (
        <footer className="bg-gradient-to-br from-theme-background-dark-950 via-theme-background-dark-950/95 to-theme-background-dark-950 py-16 px-6 lg:px-8 text-theme-background-200">
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center items-center">
                        <img src="logo-full-blanco.png" alt="Yarima" className="w-auto h-40" />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <FaInstagram className={socialMediaSize} />
                        <FaFacebookSquare className={socialMediaSize} />
                        <FaYoutube className={socialMediaSize} />
                        <AiFillTikTok className={socialMediaSize} />
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;