import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

import logoPic from '../assets/LogoPic.svg'
import CustomButton from './CustomButton'

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation();

    const handleToggle = () => setMenuOpen((prev) => !prev)

    return (
        <>
            <nav className="fixed w-full z-20 top-0 start-0 border-b bg-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logoPic} />
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <a href="https://www.linkedin.com/in/pic-color%C3%AA-entretenimento-a29596232/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                            <FaLinkedin size={30} color="#0A66C2" />
                        </a>
                        <a href="https://www.facebook.com/p/Pic-Color%C3%AA-100078298097262/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                            <FaFacebook size={30} color="#1877F3" />
                        </a>
                        <a href="https://www.instagram.com/pic.colore/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-gray-100">
                            <FaInstagram size={30} color="#E4405F" />
                        </a>
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden border focus:outline-none focus:ring-2"
                            aria-controls="navbar-sticky"
                            aria-expanded={menuOpen}
                            onClick={handleToggle}
                        >
                            <span className="sr-only">Abrir menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? '' : 'hidden'}`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col items-center justify-center p-4 md:p-0 mt-4 font-medium border rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                            <li>
                                <CustomButton
                                    bgColor={location.pathname === "/" ? "#F95D08" : "#7F42CE"}
                                    hoverColor={location.pathname === "/" ? "#7F42CE" : "#F95D08"}
                                    textColor="#fff"
                                >
                                    <Link
                                        to="/"
                                        className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0"
                                        aria-current="page"
                                    >
                                        Quem somos
                                    </Link>
                                </CustomButton>
                            </li>
                            <li>
                                <CustomButton
                                    bgColor={location.pathname === "/agenda" ? "#F95D08" : "#7F42CE"}
                                    hoverColor={location.pathname === "/agenda" ? "#7F42CE" : "#F95D08"}
                                    textColor="#fff"
                                >
                                    <Link
                                        to="/agenda"
                                        className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0"
                                        aria-current="page"
                                    >
                                        Agenda
                                    </Link>
                                </CustomButton>
                            </li>
                            <li>
                                <CustomButton
                                    bgColor={location.pathname === "/licenciados" ? "#F95D08" : "#7F42CE"}
                                    hoverColor={location.pathname === "/licenciados" ? "#7F42CE" : "#F95D08"}
                                    textColor="#fff"
                                >
                                    <Link
                                        to="/licenciados"
                                        className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0"
                                        aria-current="page"
                                    >
                                        Licenciados
                                    </Link>
                                </CustomButton>
                            </li>
                            <li>
                                <CustomButton
                                    bgColor={location.pathname === "/trabalhe-conosco" ? "#F95D08" : "#7F42CE"}
                                    hoverColor={location.pathname === "/trabalhe-conosco" ? "#7F42CE" : "#F95D08"}
                                    textColor="#fff"
                                >
                                    <Link
                                        to="/trabalhe-conosco"
                                        className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0"
                                        aria-current="page"
                                    >
                                        Trabalhe conosco
                                    </Link>
                                </CustomButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}