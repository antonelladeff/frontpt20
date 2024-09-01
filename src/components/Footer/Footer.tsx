import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4">
                {/* Sección de redes sociales */}
                <div className="flex justify-center md:justify-start space-x-4">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaLinkedin />
                    </a>
                </div>

                {/* Sección de información personal */}
                <div className="text-center md:text-right">
                    <p className="text-lg font-semibold">Antonella Defilippi</p>
                    <p className="text-sm text-gray-400">antonella@hotmail.com</p>
                    <p className="text-sm text-gray-400">+123 456 7890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


