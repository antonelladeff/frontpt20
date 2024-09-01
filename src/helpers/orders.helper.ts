const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // URL base de la API

export async function createOrder(productIds: number[], authToken: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                Authorization: authToken, 
            },
            body: JSON.stringify({ products: productIds }), 
        });

        const createdOrder = await response.json(); // Orden creada
        return createdOrder; 
    } catch (fetchError: any) {
        throw new Error(fetchError);
    }
}

export async function getOrders(authToken: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", 
                Authorization: authToken, 
            },
        });

        const fetchedOrders = await response.json(); // Órdenes obtenidas
        return fetchedOrders; 
    } catch (fetchError: any) {
        throw new Error(fetchError);
    }
}

