import React from "react";
import Card from "../Card/Card";
import { getProductsDB } from "@/helpers/products.helpers";
import Link from "next/link";

const CardList = async () => {
    const products = await getProductsDB();
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {products && products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <Card {...product} />
                </Link>
            ))}
        </div>
    );
}

export default CardList;
