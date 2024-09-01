
import IProduct from "./Product";


export interface ILoginProps {
    email: string;
    password: string; 
}

export interface ILoginError {
    email?: string; 
    password?: string; 
}


export interface IRegisterProps {
    email: string; 
    password: string; 
    name: string; 
    address: string; 
    phone: string; 
}


export type TRegisterError = Partial<IRegisterProps>;


export interface userSession {
    token: string; 
    userData: { 
        id: number; 
        address: string; 
        email: string; 
        name: string;
        phone: string; 
        orders: []; 
    }
}


export interface IOrders {
    id: string; 
    status: string; 
    date: Date; 
    products: IProduct[]; 
}


export interface AuthContextProps {
    userData: userSession | null; 
    setUserData: (userData: userSession | null) => void;
}

export interface AuthProviderProps {
    children: React.ReactNode; 
}
