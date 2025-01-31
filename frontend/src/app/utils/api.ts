const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  fetchUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },
  addUser: async (data: { name: string; email: string; role: string }) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
       },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add user");
    return response.json();
  },
  editUser: async (
    id: string,
    data: { name: string; email: string; role: string }
  ) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to edit user");
    return response.json();
  },
  deleteUser: async (id: string) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return true;
  },
};
