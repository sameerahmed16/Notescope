"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../utils/auth"; // Importing login function from auth.js

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the login function from auth.js
      const user = await login(input.email, input.password);
      console.log(user);

      // Optionally store user info (e.g., email, profile picture) for session management
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/"); // Redirect to homepage after successful login
    } catch (error) {
      setError(error.message); // Display the error message from Firebase
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="max-w-lg mx-auto my-10 p-8 bg-white text-black shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-left">Login</h2>

        {/* Display any error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={changeEventHandler}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={changeEventHandler}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Signup Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
