import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

const SCRIPT_URL = "https://n8n.elvecimarket.com/webhook/catalog";

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        // optional: convert string prices to numbers
        const formatted = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            price: Number(item.price),
            description: item.description,
            brand: item.brand,
            measure: item.measure,
            image: item.image,
            rawImageField: item.rawImageField,
          };
        });
        setProducts(formatted);
      })
      .catch((err) => console.error("Error fetching sheet:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
        🔥Promociones de hoy!
      </h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
