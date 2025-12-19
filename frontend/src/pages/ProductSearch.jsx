import React, { useState } from "react";

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);

  const searchProducts = async () => {
    const res = await fetch(
      `http://localhost:3000/products/search?query=${query}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div
      style={{
        minHeight: "500vh",
        width: "flex",
        backgroundColor: "#f4f6f8",
        padding: "40px 80px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Heading */}
      <h2
        style={{
          marginBottom: "30px",
          color: "#333"
        }}
      >
        Search Products
      </h2>

      {/* Search Bar Row */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          alignItems: "center"
        }}
      >
        <input
          placeholder="Search by product title"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex: 2,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={searchProducts}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {/* Results Section */}
      <div>
        {products.length === 0 ? (
          <p style={{ color: "#777" }}>No products found</p>
        ) : (
          products.map(p => (
            <div
              key={p._id}
              style={{
                backgroundColor: "#fff",
                padding: "18px 25px",
                marginBottom: "15px",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: "17px", color: "#333" }}>
                <strong>{p.title}</strong>
              </span>

              <span style={{ fontSize: "16px", color: "#007bff" }}>
                ₹{p.price}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductSearch;
