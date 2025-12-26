"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../../utils/auth"; // Importing signUp function from auth.js

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle input field changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const fileChangeHandler = (e) => {
    setInput({ ...input, profilePicture: e.target.files[0] });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if passwords match
    if (input.password !== input.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Call the signUp function from auth.js
      const user = await signUp(
        input.email,
        input.password,
        input.fullname,
        input.profilePicture // Pass the file for uploading
      );

      // After successful signup, redirect to login
      router.push("/");
    } catch (error) {
      setError(error.message); // Display the error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="max-w-lg mx-auto my-10 p-8 bg-white shadow-lg rounded-lg text-black"
      >
        <h2 className="text-2xl font-bold mb-4 text-left">Sign Up</h2>
        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Full Name Input */}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={input.fullname}
          onChange={changeEventHandler}
          className="w-full mb-4 p-3 border rounded"
        />

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

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={changeEventHandler}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Phone Number (Optional) */}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={input.phoneNumber}
          onChange={changeEventHandler}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Profile Picture Input */}
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={fileChangeHandler}
          className="w-full mb-4 p-3 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
