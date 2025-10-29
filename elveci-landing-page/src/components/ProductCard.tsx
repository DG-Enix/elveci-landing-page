import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  brand: string;
  measure: string;
  image: string;
  rawImageField: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  brand,
  description,
  price,
  measure,
  image,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between text-center hover:shadow-lg transition-all">
      <img
        src={image}
        alt={name}
        className="h-32 mx-auto object-contain mb-4"
      />
      <div>
        <h2 className="text-gray-800 font-semibold">{description}</h2>
        <p className="text-gray-500 font-medium">{brand}</p>
        <p className="text-red-600 font-bold mt-2 text-lg">
          ${price.toLocaleString("es-CO")}
        </p>
        <p className="text-sm text-gray-500 mt-1">{measure}</p>
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mt-3 rounded-full">
        Comprar
      </button>
    </div>
  );
};

export default ProductCard;
