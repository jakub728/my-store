import "./basket.css";
import { useProducts } from "../../context/ProductsContext";

export default function Basket() {
  const { basket, products, addToBasket, removeFromBasket, clearBasket } =
    useProducts();

  const basketItems = basket
    .map((item) => {
      const product = products.find((prod) => prod.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const totalPrice = basketItems.reduce(
    (sum, item) => sum + item!.price * item!.quantity,
    0
  );

  if (basketItems.length === 0) {
    return <p>Your basket is empty</p>;
  }

  return (
    <div className="basket">
      <h2>Your Basket</h2>

      {basketItems.map((item) => (
        <div key={item!.id} className="basket-item">
          <img src={item!.image} alt={item!.title} />

          <div className="basket-info">
            <h3>{item!.title}</h3>
            <p>${item!.price.toFixed(2)}</p>

            <div className="basket-buttons">
              <button onClick={() => removeFromBasket(item!.id)}>-</button>
              <span>{item!.quantity}</span>
              <button onClick={() => addToBasket(item!.id)}>+</button>
            </div>
          </div>

          <div className="basket-total">
            ${(item!.price * item!.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <div className="basket-sum">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <button className="clear-button" onClick={clearBasket}>
          Clear basket
        </button>
        <button className="buy-button">Buy</button>
      </div>
    </div>
  );
}
