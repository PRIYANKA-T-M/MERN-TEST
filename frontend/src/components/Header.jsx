import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        width: "100%",
        padding: "15px 80px",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#007bff"
        }}
      >
        MyApp
      </h2>

      <nav
        style={{
          display: "flex",
          gap: "30px"
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          Home
        </Link>

        <Link
          to="/products"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          Products
        </Link>

        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          SignUp
        </Link>

        <Link
          to="/signin"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          SignIn
        </Link>
      </nav>
    </header>
  );
}

export default Header;
