import "./products.css";
import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import ProductCard from "./ProductCard";

type Filter = {
  title?: string;
  priceRange?: [number, number];
};

export default function Products() {
  const { products, loading, error } = useProducts();
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<Filter>({});

  //pobieranie produktow
  if (loading) return <p>Loading...</p>;

  //wszystkie errory o ile wystapia
  if (error) return <p>{error}</p>;

  //?filters
  const filteredProducts = products.filter((product) => {
    let matches = true;

    if (filter.title && filter.title.trim() !== "") {
      matches =
        matches &&
        product.title.toLowerCase().includes(filter.title.toLowerCase());
    }

    if (filter.priceRange) {
      const [min, max] = filter.priceRange;
      matches = matches && product.price >= min && product.price <= max;
    }
    return matches;
  });
  //?

  return (
    <div>
      <button
        className="filter-open-button"
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      >
        Filter
      </button>
      {openFilter && (
        <div className="filter-panel">
          <div className="filter-panel-wrapper">
            <label>Title:</label>
            <input
              className="filter-panel-title-input"
              type="text"
              value={filter.title || ""}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Search by title"
            />
          </div>

          <div className="filter-panel-wrapper">
            <label>Price:</label>
            <div>
              <input
                className="filter-panel-price-input"
                type="number"
                value={filter.priceRange?.[0] || ""}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    priceRange: [
                      Number(e.target.value),
                      prev.priceRange?.[1] ?? Infinity,
                    ],
                  }))
                }
                placeholder="0"
              />
              <input
                type="number"
                className="filter-panel-price-input"
                value={filter.priceRange?.[1] || ""}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    priceRange: [
                      prev.priceRange?.[0] ?? 0,
                      Number(e.target.value),
                    ],
                  }))
                }
                placeholder="999"
              />
            </div>
          </div>

          <button className="filter-reset-button" onClick={() => setFilter({})}>Reset</button>
        </div>
      )}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
