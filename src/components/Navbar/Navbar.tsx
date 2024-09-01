"use client";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightFromBracket, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { userData, setUserData } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro que quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            localStorage.removeItem('userSession');
            setUserData(null);
            router.push("/");
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <button title="home" className="text-white text-xl font-bold flex items-center space-x-2">
                        <FontAwesomeIcon icon={faHouse} />
                        <span>HOME</span>
                    </button>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/orders">
                        <button className="text-gray-300 hover:text-white text-lg flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="hidden sm:inline">{userData?.userData?.name}</span>
                        </button>
                    </Link>
                    {userData && (
                        <>
                            <Link href="/cart">
                                <button
                                    title="Carrito de Compras"
                                    className="text-gray-300 hover:text-white text-lg flex items-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                title="Cerrar Sesión"
                                className="text-gray-300 hover:text-white text-lg flex items-center space-x-2"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
