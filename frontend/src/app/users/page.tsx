"use client";
import React, { useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import { api } from "../utils/api";
import UserTable from "../components/userTable/userTable";
import UserForm from "../components/userForm/userForm";
import MetricsChart from "../components/metricsChart/metricsChart";
import ProtectedRoute from "../components/protectedRoute/protectedRoute";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  logins: number;
  pdfDownloads: number;
}

interface NewUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<
    { name: string; logins: number; downloads: number }[]
  >([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.fetchUsers();
      setUsers(data);
      fetchMetrics();
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMetrics = async () => {
    try {
      const data = await api.fetchUsers();
      const formattedMetrics = data.map((user: any) => ({
        name: user.name,
        logins: user.logins,
        downloads: user.pdfDownloads,
      }));
      setMetrics(formattedMetrics);
    } catch (error) {
      toast.error("Failed to fetch metrics:");
    }
  };

  const handleAddUser = async (data: Omit<NewUser, "id">) => {
    console.log({data})
    try {
      await api.addUser(data);
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);
      toast.error("Failed to add user");
    }
  };

  const handleEditUser = async (data: Omit<NewUser, "id">) => {
    try {
      if (selectedUser) {
        await api.editUser(selectedUser.id, data);
        fetchUsers();
        setSelectedUser(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await api.deleteUser(id);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleDownloadPDF = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}/pdf`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `User_${id}_Report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      fetchUsers();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const openModal = (user?: User) => {
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          >
            Add User
          </button>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <UserTable
              users={users}
              onEdit={openModal}
              onDelete={handleDeleteUser}
              onDownloadPDF={handleDownloadPDF}
            />
            <div className="border border-gray-300 rounded-lg p-6 my-6">
              <MetricsChart metrics={metrics} />
            </div>
          </>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-1/3 relative">
              <h2 className="text-xl font-bold mb-4">
                {selectedUser ? "Edit User" : "Add User"}
              </h2>
              <UserForm
                initialData={
                  selectedUser
                    ? {
                        name: selectedUser.name,
                        email: selectedUser.email,
                        password: selectedUser.password,
                        role: selectedUser.role,
                      }
                    : undefined
                }
                onSubmit={(data) =>
                  selectedUser ? handleEditUser(data) : handleAddUser(data)
                }
              />
              <button
                onClick={closeModal}
                className=" ml-auto text-gray-600 px-4 py-2 rounded absolute top-0 right-0 text-2xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </ProtectedRoute>
  );
};

export default UsersPage;
