"use client";
import React from "react";

import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { token, logout } = useAuth();

  return (
    token && (
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h2 className="text-2xl font-bold text-center">User Management</h2>
        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>
    )
  );
};

export default Header;
