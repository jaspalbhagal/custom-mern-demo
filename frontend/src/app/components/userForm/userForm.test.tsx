import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import UserForm from "./userForm";

describe("UserForm Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders form fields correctly", () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("displays validation errors when fields are empty", async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Role is required")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    act(() => {
      fireEvent.change(screen.getByTestId("name"), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByTestId("role"), {
        target: { value: "Admin" },
      });

      fireEvent.click(screen.getByText("Submit"));
    });

    waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("renders initial data if provided", () => {
    const initialData = {
      name: "Jane Doe",
      email: "jane@example.com",
      password:"jane@123",
      role: "User",
    };

    render(<UserForm initialData={initialData} onSubmit={mockOnSubmit} />);

    expect(screen.getByTestId("name")).toHaveValue("Jane Doe");
    expect(screen.getByTestId("email")).toHaveValue("jane@example.com");
    expect(screen.getByTestId("role")).toHaveValue("User");
  });

  it("disables submit button when form is submitting", async () => {
    render(<UserForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("role"), {
      target: { value: "Admin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const submitButton = screen.getByRole("button", { name: /submitting/i });
    expect(submitButton).toBeDisabled();
  });
});
