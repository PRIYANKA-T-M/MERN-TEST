import React, { useState } from "react";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 100px",
        backgroundColor: "#f4f6f8",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          fontSize: "28px",
          color: "#333"
        }}
      >
        Signup
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          backgroundColor: "#ffffff",
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
          name="email"
          type="email"
          placeholder="Email"
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
          type="submit"
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Create Account
        </button>

        {msg && (
          <p
            style={{
              marginTop: "20px",
              color: "green",
              fontSize: "15px"
            }}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signup;
