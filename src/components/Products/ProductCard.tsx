import "./products.css";
import { useProducts } from "../../context/ProductsContext";
import { toast } from "react-toastify";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToBasket } = useProducts();
  const notify = () => toast(`${product.title} added!`);

  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.title} />
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="product-buy"
            onClick={() => {
              addToBasket(product.id);
              notify();
            }}
          >
            Add to Cart
          </button>
          <span className="product-rating">
            ⭐ {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>
    </div>
  );
}
