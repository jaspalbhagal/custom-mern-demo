// /components/UserTable.tsx
import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  logins: number;
  pdfDownloads: number;
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onDownloadPDF: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onDownloadPDF,
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Role</th>
          <th className="border px-4 py-2">Total logins</th>
          <th className="border px-4 py-2">PDFs downloaded</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-4 py-2 text-center">{user.name}</td>
            <td className="border px-4 py-2 text-center">{user.email}</td>
            <td className="border px-4 py-2 text-center">{user.role}</td>
            <td className="border px-4 py-2 text-center">{user.logins}</td>
            <td className="border px-4 py-2 text-center">{user.pdfDownloads}</td>
            <td className="border px-4 py-2 text-center">
              <button
                onClick={() => onEdit(user)}
                className="bg-blue-500 text-white text-sm px-3 py-2 border border-transparent rounded mr-2 hover:border hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white text-sm px-3 py-2  border border-transparent  rounded mr-2 hover:border hover:border-red-500 hover:bg-transparent hover:text-red-500"
              >
                Delete
              </button>
              <button
                onClick={() => onDownloadPDF(user.id)}
                className="bg-[#22c55e] text-white text-sm px-3 py-2  border border-transparent  rounded hover:border hover:border-[#22c55e] hover:bg-transparent hover:text-[#22c55e]"
              >
                Download PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
