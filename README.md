# Cleaning Service Management System

![Screenshot](./Screenshot%202025-07-13%20104555.png)


## Project Description
The Cleaning Service Management System is a full-stack web application designed to streamline the booking and management of cleaning services. It provides a user-friendly interface for customers to book services and a robust admin panel for managing services and bookings.

## Features
*   **User Authentication**: Secure registration and login for users and administrators.
*   **Service Management**: Admins can add, edit, and delete cleaning services.
*   **Booking System**: Users can book available cleaning services.
*   **Dashboard**:
    *   **User Dashboard**: View and manage personal bookings.
    *   **Admin Dashboard**: View all bookings and manage services.
*   **Responsive Design**: User interface adapts to various screen sizes.

## Technologies Used

### Backend
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **Sequelize**: ORM for Node.js, supporting PostgreSQL, MySQL, SQLite and MSSQL.
*   **JWT (JSON Web Tokens)**: For secure authentication.
*   **Bcrypt.js**: For password hashing.

### Frontend
*   **React**: JavaScript library for building user interfaces.
*   **Vite**: Fast build tool for modern web projects.
*   **React Router DOM**: For declarative routing in React applications.
*   **Axios**: Promise-based HTTP client for the browser and Node.js.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites
*   Node.js (LTS version recommended)
*   npm (Node Package Manager) or Yarn
*   A database (e.g., PostgreSQL, MySQL)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Cleaning-Service-Management-System.git
cd Cleaning-Service-Management-System
```

### 2. Backend Setup

Navigate to the `Backend` directory:
```bash
cd Backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `Backend` directory and add your database configuration and JWT secret:
```
PORT=5000
DB_DIALECT=mysql # or postgres, sqlite, mssql
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=cleaning_service_db
JWT_SECRET=your_jwt_secret_key
```



Start the backend server:
```bash
npm start
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal and navigate to the `Frontend` directory:
```bash
cd ../Frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Usage
1.  **Register**: Create a new user account.
2.  **Login**: Log in with your registered credentials.
3.  **User Dashboard**: As a regular user, you can view your bookings and add new ones.
4.  **Admin Panel**: If you log in with an admin account (you'll need to manually set a user's role to 'admin' in your database for testing purposes), you can access the admin dashboard to manage services and view all bookings.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

