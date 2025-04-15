import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      const user = res.data.find((u) => u.email === email);

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Logged in!");
        navigate("/");
      } else {
        toast.error("User not found.");
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-none justify-center rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border-b-emerald-200 p-2 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading || !email}
        className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <a href="/register" className="text-green-600 hover:underline">
          Register
        </a>
      </p>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

