# User Metrics Dashboard

This repository contains the implementation of a **User Metrics Dashboard** built with NextJS (frontend) and NestJS (backend). It allows you to manage users, generate activity reports in PDF format, and visualize user activity metrics.

---
## Features

### Frontend (NextJS + TypeScript)
- **User Management**:
  - Authentication for visit the site (Login)
  - Role based permission for add new user (Only Admin)
  - Display a table of users fetched from the backend.
  - Allow adding a new user with fields: name, email, and role (e.g., "Admin", "User"). Only admin can add other users
  - view, edit, and delete users.
- **PDF Download**:
  - Generate and download a personalized PDF report for each user.
  - Include user details and activity metrics in the report.
- **Activity Metrics Display**:
  - Show total logins and downloads for each user.
  - Visualize user activity metrics using bar charts.
- **Count Management**
   - The download and login counts will increase based on PDF downloads and login events. The counts will increment relative to each respective event.

### Backend (NestJS + PostgreSQL)
- **API Endpoints**:
  - Manage users: `GET`, `POST`, `PUT`, `DELETE`.
  - Fetch user activity logs: `GET`.
  - Generate downloadable PDF reports: `GET`.
- **Pre-seeded Data**:
  - Database populated with sample users and activity logs.
- **CORS Configuration**:
  - Backend configured to accept cross-origin requests from the React frontend.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   JWT_SECRET=mySecret
   ```
4. Start the backend server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:3000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `frontend` directory with the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
4. Start the React development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3001`.

---

## Usage

1. Open the React app at `http://localhost:3001`.
2. Manage users (add, edit, delete) via the user table.
3. Generate and download user activity PDF reports.
4. Visualize activity metrics through bar charts.

---

## Testing

### Frontend Tests
- Run unit tests for React components:
  ```bash
  cd frontend
  npm run test
  ```

---

## Technologies Used

### Frontend
- Next
- TypeScript
- Chart.js (for visualizations)

### Backend
- NestJS
- PostgreSQL
- TypeORM

---

