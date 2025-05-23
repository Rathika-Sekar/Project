# 📝 Todo List App

A full-stack Todo List application with **React.js** frontend and **Spring Boot** backend. Users can register, log in, and manage their personal todo items with a clean, responsive UI.

---

## 🚀 Features

- 🔐 User authentication (signup & login)
- ✅ Add, edit, delete personal todos
- 🌐 RESTful API integration using Axios
- 📂 Clean folder structure (Frontend + Backend)
- 💾 Persistent data storage in MySQL

---

## 🛠 Tech Stack

### 🔹 Frontend
- React.js
- Axios
- React Router
- CSS Modules

### 🔸 Backend
- Java 17+
- Spring Boot
- Spring Data JPA (Hibernate)
- MySQL

---

## 📁 Project Structure

Todo-List/
├── Frontend/ # React application
└── backend/ # Spring Boot project
---

## ⚙️ Setup Instructions

### 🖥 Backend (Spring Boot)

1. Open terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Make sure MySQL is running. Configure your database credentials in:
    ```
    src/main/resources/application.properties
    ```

3. Start the backend server:
    ```bash
    mvn spring-boot:run
    ```

> The backend runs at: `http://localhost:7071`

---

### 🌐 Frontend (React)

1. Open terminal and navigate to the frontend folder:
    ```bash
    cd Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the React app:
    ```bash
    npm start
    ```

> React frontend runs on: `http://localhost:3000`

> Axios connects to backend on `http://localhost:7071`

---

## 🔌 Sample API Endpoints

- `POST http://localhost:7071/signup` – Register a new user
- `POST http://localhost:7071/login` – Login user (returns JWT)
- `GET http://localhost:7071/todo/{username}` – Get all todos for the authenticated user
- `POST http://localhost:7071/todo/{username}` – Create a new todo for the authenticated user
- `PUT http://localhost:7071/todo/{id}` – Update an existing todo
- `DELETE http://localhost:7071/todo/{id}` – Delete a todo

---
