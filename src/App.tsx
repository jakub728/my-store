import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import Basket from "./components/Basket/Basket";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </HashRouter>
    </>
  );
}

export default App;
