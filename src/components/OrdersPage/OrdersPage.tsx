"use client"
import { getOrders } from "@/helpers/orders.helper";
import { IOrders} from "@/interfaces/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const OrdersPage = () => {
    const { userData } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<IOrders[]>([]);

    const fetchData = async () => {
        if (userData?.token) {
            const ordersResponse = await getOrders(userData.token);
            setOrders(ordersResponse);
        }
    };

    useEffect(() => {
        if (!userData?.token) {
            router.push("/login");
        } else {
            fetchData();
        }
    }, [userData, router]);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {orders && orders.length > 0 ? (
                    orders.map((item) => (
                        <div key={item.id} className="mb-4 p-4 bg-gray-50 rounded-lg border">
                            <p className="text-gray-700 font-medium">
                                Fecha: {new Date(item.date).toLocaleDateString()}
                            </p>
                            <p className="text-green-500">
                                Estado: <span className="font-semibold">{item.status.toLocaleUpperCase()}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        <p>No tienes productos en tus pedidos</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
        



