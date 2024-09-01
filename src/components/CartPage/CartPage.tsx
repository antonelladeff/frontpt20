

"use client";

import { createOrder } from "@/helpers/orders.helper";
import IProduct from "@/interfaces/Product";
import { userSession } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CartPage = () => {
    const router = useRouter();
    const [userSession, setUserSession] = useState<userSession>();
    const [cart, setCart] = useState<IProduct[]>([]);
    const [totalCart, setTotalCart] = useState<number>(0);

    useEffect(() => {
        const userSessionLocal = localStorage.getItem("userSession");
        setUserSession(JSON.parse(userSessionLocal!));
    }, []);
    
    useEffect(() => {
        const cartProducts: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]"); 
        if (cartProducts) {
            let totalCart = 0;
            cartProducts.map((item: IProduct) => {
                totalCart = totalCart + item.price;
            });
            setTotalCart(totalCart);
            setCart(cartProducts);
        }
    }, []);

    useEffect(() => {
        if (userSession?.userData.name) {
            userSession?.userData.name === undefined &&
                router.push("/login");
        }
    }, [userSession?.userData]);

    const handleClick = async () => {
        const idProducts = cart?.map((product) => product.id);
        await createOrder(idProducts, userSession?.token!);
        Swal.fire({
            title: '¡Compra realizada con éxito!',
            text: 'Tu compra se ha completado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        setCart([]);
        setTotalCart(0);
        router.push("/orders");
        localStorage.setItem("cart", "[]");
    };

    const handleRemove = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        setTotalCart(updatedCart.reduce((total, item) => total + item.price, 0));
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                    {cart.length > 0 ? (
                        cart.map((item: IProduct) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-center md:items-start border-b pb-4 mb-4 relative">
                                <img
                                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-lg shadow-lg"
                                    src={item.image}
                                    alt={`imagen del producto ${item.name}`}
                                />
                                <div className="mt-4 md:mt-0 md:ml-6 flex-1 text-center md:text-left">
                                    <p className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-gray-500 text-sm">Precio: ${item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No tienes ningún producto en tu carrito</p>
                        </div>
                    )}
                </div>
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                    <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">Total: ${totalCart}</p>
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        {cart.length > 0 && (
                            <Link href="/">
                                <button
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 hover:bg-blue-500 w-full md:w-auto"
                                >
                                    Volver a comprar
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={handleClick}
                            disabled={cart.length === 0}
                            className={`text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 w-full md:w-auto ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}`}
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
