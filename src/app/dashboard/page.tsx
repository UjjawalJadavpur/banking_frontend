"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../zustand/useAuthStore";
import api from "../lib/api";
import { useLogout } from "../hook/useLogout";

export default function DashboardPage() {
  const { token, loading, name } = useAuthStore();
  const router = useRouter();
  const logout = useLogout();

  const [account, setAccount] = useState<{
    accountNumber: string;
    accountType: string;
    balance: number;
  } | null>(null);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.replace("/login");
      } else {
        // Fetch account data from backend
        api
          .get("/accounts/me") // 🔹 adjust endpoint to your backend (e.g., /api/account/me)
          .then((res) => {
            setAccount(res.data);
          })
          .catch((err) => {
            console.error("Failed to fetch account:", err);
            logout(); // if unauthorized → force logout
          })
          .finally(() => setFetching(false));
      }
    }
  }, [loading, token, router, logout]);

  if (loading || fetching) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading Dashboard…
      </div>
    );
  }

  if (!account) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-500">
        <p>No account found.</p>
        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
          Hello, {name || "User"} 👋
        </h1>
        <button
        //   onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Account Information */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Information
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Account Number:</span>{" "}
            {account.accountNumber}
          </p>
          <p>
            <span className="font-medium">Account Type:</span>{" "}
            {account.accountType}
          </p>
          <p>
            <span className="font-medium">Balance:</span> ₹
            {account.balance.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
