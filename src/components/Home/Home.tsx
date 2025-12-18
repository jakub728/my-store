import "./home.css";
import { useProducts } from "../../context/ProductsContext";
import ProductCard from "../Products/ProductCard";
import { useEffect, useState } from "react";

export default function Home() {
  const { products, loading, error } = useProducts();
  const [randomProduct, setRandomProduct] = useState<
    (typeof products)[0] | null
  >(null);

  useEffect(() => {
    if (products.length === 0) return;

    const index = Math.floor(Math.random() * products.length);
    setRandomProduct(products[index]);
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-grid">
      {randomProduct && (
        <ProductCard key={randomProduct.id} product={randomProduct} />
      )}
    </div>
  );
}
