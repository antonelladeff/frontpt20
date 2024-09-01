import React from "react";
import IProduct from "@/interfaces/Product";

const Card: React.FC<IProduct> = ({ name, price, image, description, stock }) => {
  return (
    <div className="w-full sm:w-80 bg-white shadow-md rounded-lg overflow-hidden my-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        className="w-full h-48 object-contain p-2"
        src={image}
        alt={`imagen del producto ${name}`}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {name}
        </h2>
        <p className="text-gray-600 mt-2 flex-grow text-sm sm:text-base">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4 text-sm sm:text-base">
          <span className="text-gray-700 font-bold">Precio: ${price}</span>
          <span className="text-gray-700 font-bold">Stock: {stock}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;


