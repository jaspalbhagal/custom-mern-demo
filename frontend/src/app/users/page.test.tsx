import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { api } from "../utils/api";
import UsersPage from "./page";
import { AuthProvider } from "@/context/AuthContext";

jest.mock("../utils/api");

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div>Mocked Chart</div>,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UsersPage", () => {
  const mockUsers = [
    {
      id: "1",
      name: "Alice",
      email: "alice@example.com",
      role: "Admin",
      logins: 10,
      pdfDownloads: 5,
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@example.com",
      role: "User",
      logins: 15,
      pdfDownloads: 8,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user table and metrics chart", async () => {
    (api.fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {},
    });

    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
