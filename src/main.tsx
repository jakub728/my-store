import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
//ze wzgledu na github pages
import "./index.css";
import App from "./App.tsx";
import ProductsProvider from "./context/ProductsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ProductsProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ProductsProvider>
);
