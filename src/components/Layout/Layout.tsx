import "./layout.css";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../context/ProductsContext";


export default function Layout() {
  const { getBasketCount } = useProducts();

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home{" "}
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/basket"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FontAwesomeIcon icon={faShoppingBasket} /> Cart
          {getBasketCount() > 0 && (
            <div className="product-badge">{getBasketCount()}</div>
          )}
        </NavLink>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
