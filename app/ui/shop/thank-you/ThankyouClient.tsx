"use client";

import useCartStore from "@/app/stores/useCartStore";
import { useEffect } from "react";

const ThankyouClient = ({ children } : { children: React.ReactNode}) => {
    const {clearCart} = useCartStore();

    useEffect(() => {
        clearCart()
    }, [])
    
    return (
        <>{children}</>
    );
}

export default ThankyouClient;