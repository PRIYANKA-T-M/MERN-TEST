import React from "react";

function Home() {
  return (
    <div
      style={{
        minHeight: "500vh",
        width: "flex",
        padding: "60px 100px",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          color: "#222",
          marginBottom: "20px"
        }}
      >
        Welcome to My Website
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#555",
          maxWidth: "700px"
        }}
      >
        This is the home page of my React application. Browse products,
        search items, and manage your account easily using our platform.
      </p>
    </div>
  );
}

export default Home;
