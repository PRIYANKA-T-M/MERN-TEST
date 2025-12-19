import React, { useState } from "react";

function Signin() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      <h2 style={{ marginBottom: "30px" }}>Signin</h2>

      <form
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            marginBottom: "25px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Signin;
