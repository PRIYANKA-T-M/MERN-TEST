import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:3000/products?page=${page}&limit=5`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  return (
    <div
      style={{
        minHeight: "500vh",
        width: "flex",
        backgroundColor: "#f4f6f8",
        padding: "50px 80px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#333",
          fontSize: "28px"
        }}
      >
        Products
      </h2>

      {/* Products List */}
      <div>
        {products.map(p => (
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
            <span
              style={{
                fontSize: "17px",
                color: "#333"
              }}
            >
              <strong>{p.title}</strong>
            </span>

            <span
              style={{
                fontSize: "16px",
                color: "#007bff"
              }}
            >
              ₹{p.price}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          gap: "20px"
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "10px 25px",
            fontSize: "15px",
            backgroundColor: page === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: page === 1 ? "not-allowed" : "pointer"
          }}
        >
          Prev
        </button>

        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            padding: "10px 25px",
            fontSize: "15px",
            backgroundColor: page === totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: page === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
