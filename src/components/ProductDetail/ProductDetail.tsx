"use client";
import React, { useEffect, useState } from "react";
import IProduct from "@/interfaces/Product";
import { useRouter } from "next/navigation";
import { userSession } from "@/interfaces/types";
import Swal from 'sweetalert2';
import Image from 'next/image'; 

const ProductDetail: React.FC<IProduct> = ({ name, image, description, stock, id, price, categoryId }) => {
    const router = useRouter();
    const [authenticatedUser, setAuthenticatedUser] = useState<userSession>();

    useEffect(() => {
        const userSessionFromStorage = localStorage.getItem("userSession");
        if (userSessionFromStorage) {
            setAuthenticatedUser(JSON.parse(userSessionFromStorage));
        }
    }, []);

    const addProductToCartHandler = () => {
        if (!authenticatedUser?.token) {
            Swal.fire({
                icon: 'warning',
                title: 'Debes estar logeado',
                confirmButtonText: 'Aceptar'
            });
            router.push("/login");
        } else {
            const productsInCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
            const isProductInCart = productsInCart.some((product: IProduct) => product.id === id);

            if (isProductInCart) {
                Swal.fire({
                    title: '¡Producto ya en el carrito!',
                    text: 'Este producto ya existe en tu carrito.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
                router.push("/cart");
            } else {
                productsInCart.push({
                    name,
                    image,
                    description,
                    stock,
                    id,
                    price,
                    categoryId,
                });
                localStorage.setItem("cart", JSON.stringify(productsInCart));

                Swal.fire({
                    title: '¡Producto añadido al carrito!',
                    text: 'El producto ha sido agregado a tu carrito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                router.push("/cart");
            }
        }
    };

    return (
        <div className="max-w-full sm:max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-6 p-4 sm:p-6">
            <div className="flex justify-center">
                <Image 
                    className="w-full h-48 sm:h-56 md:h-64 object-cover sm:object-contain p-2"
                    src={image}
                    alt={name ? `${name} image` : 'Imagen del producto'}
                    layout="responsive"
                    width={500} // Ajusta según el tamaño de la imagen
                    height={500} // Ajusta según el tamaño de la imagen
                />
            </div>
            <div className="p-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-base sm:text-lg text-gray-600 mt-2">{description}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
                    <span className="text-base sm:text-lg text-gray-700 font-bold">Precio: ${price}</span>
                    <span className="text-base sm:text-lg text-gray-700 font-bold mt-2 sm:mt-0">Stock: {stock}</span>
                </div>
                <button
                    onClick={addProductToCartHandler}
                    className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;
