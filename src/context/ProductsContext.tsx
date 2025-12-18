import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";

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

type Basket = {
  id: number;
  quantity: number;
};

type ProductContextType = {
  products: Product[];
  error: string | null;
  loading: boolean;

  basket: Basket[];
  addToBasket: (id: number) => void;
  removeFromBasket: (id: number) => void;
  clearBasket: () => void;
  getBasketCount: () => number;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export default function ProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<Basket[]>(() => {
    const stored = localStorage.getItem("basket");
    return stored ? JSON.parse(stored) : [];
  });

  //!FETCH PRODUKTÓW
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Server don't respond");
        }

        const result: Product[] = await response.json();
        setProducts(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  //!DODAWANIE DO KOSZYKA
  const addToBasket = (id: number) => {
    setBasket((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  //!USUWANIE Z KOSZYKA
  const removeFromBasket = (id: number) => {
    setBasket((prev) => {
      const item = prev.find((i) => i.id === id);

      if (!item) return prev;

      if (item.quantity === 1) {
        return prev.filter((i) => i.id !== id);
      }

      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  //!CZYSZCZENIE KOSZYKA
  const clearBasket = () => setBasket([]);

  //!ZAPIS W localStorage
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  //!ILOSC PRODUKTÓW W KOSZYKU
  const getBasketCount = () => {
    return basket.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        products,
        loading,
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
        getBasketCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
};
