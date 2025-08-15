"use client";

import React, { useState } from "react";
import PasswordField from "./PasswordField";
import InputField from "./InputField";
import { handleAuth } from "@/app/lib/handleAuth";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitAuth = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      await handleAuth(mode, formData, router, setError);
    } finally {
      setLoading(false);
    }
  };

  const modes = ["login", "register"];

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-8 space-y-6 transition-all animate-fade-in">

      {/* Mode Switcher */}
      <div className="flex rounded-full overflow-hidden border border-blue-200 bg-blue-50 text-sm font-semibold shadow-inner">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`w-1/2 py-2 transition-all duration-300 ${mode === m
                ? "bg-blue-600 text-white shadow-md"
                : "text-blue-600 hover:bg-blue-100"
              }`}
          >
            {m === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Headings */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {mode === "login" ? "Welcome Back 👋" : "Open Your Account"}
        </h2>
        <p className="text-sm text-gray-500">
          {mode === "login"
            ? "Securely access your banking dashboard."
            : "Join and start managing your money smartly."}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Inputs */}
      <div className="space-y-4">
        {mode === "register" && (
          <InputField
            icon={<FiUser className="text-gray-400" />}
            name="name"
            placeholder="Full Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        )}

        <InputField
          icon={<FiMail className="text-gray-400" />}
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <PasswordField
          icon={<FiLock className="text-gray-400" />}
          show={showPassword}
          toggle={() => setShowPassword((s) => !s)}
          value={formData.password}
          onChange={handleChange}
          onEnter={submitAuth}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={submitAuth}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all ${loading
            ? "bg-gray-300 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        {loading ? "Processing..." : mode === "login" ? "Log In" : "Create Account"}
      </button>
    </div>
  );
}
