import { render, screen, fireEvent } from "@testing-library/react";

import UserTable from "./userTable";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "john@123",
    role: "Admin",
    logins: 10,
    pdfDownloads: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "jane@123",
    role: "User",
    logins: 8,
    pdfDownloads: 3,
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnDownloadPDF = jest.fn();

describe("UserTable Component", () => {
  it("renders a table with user data", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onDownloadPDF={mockOnDownloadPDF}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onDownloadPDF={mockOnDownloadPDF}
      />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("calls onDelete when Delete button is clicked", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onDownloadPDF={mockOnDownloadPDF}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[0].id);
  });

  it("calls onDownloadPDF when Download PDF button is clicked", () => {
    render(
      <UserTable
        users={mockUsers}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onDownloadPDF={mockOnDownloadPDF}
      />
    );

    fireEvent.click(screen.getAllByText("Download PDF")[0]);
    expect(mockOnDownloadPDF).toHaveBeenCalledWith(mockUsers[0].id);
  });
});
