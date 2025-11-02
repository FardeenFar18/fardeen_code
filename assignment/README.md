# MERN Stack Assignment — Globcyber Technologies

A full-stack MERN (MongoDB, Express, React, Node.js) web application built as part of the technical assignment for the **MERN Stack Developer position at Globcyber Technologies**.

The app includes secure authentication, a protected dashboard, and dynamic charts fetched from the backend.

---

##Features

### Authentication
- User **Registration** and **Login** using MongoDB and Express.
- **JWT-based Authentication** for secure API access.
- **Session Storage** for managing logged-in state on the frontend.
- Protected routes for authenticated users only.

### Dashboard
- Displays logged-in user’s **profile data**.
- Includes **Bar** and **Line Charts** (using [Recharts](https://recharts.org)).
- Simple and responsive UI (Bootstrap + Material UI).
- User Registration & Login
- WT Authentication (stored in session storage)
- Protected Routes
-  Dashboard with User Details
-  it Profile (Name, Phone, Age, Address)
-  Auto Logout after 10 Minutes of Inactivity
-  Responsive Frontend (React.js)
-  RESTful Backend API (Express + MongoDB)
-  Chart Page Integration Example

### Charts
- Interactive **Bar and Line Charts** built with [Recharts](https://recharts.org)
- Displays **real-time data** fetched from the backend API (`/charts/summary`)
- Includes a **data entry form** to add new chart points dynamically
- Automatically **updates charts** after adding new data (no page refresh needed)
- **Bar Chart** – represents performance metrics visually
- **Line Chart** – shows growth trends over time
- Fetches and submits data securely with **JWT authorization headers**
- **Error handling** for failed API calls and invalid form entries
- **Responsive design** — adapts perfectly across desktop, tablet, and mobile
- Integrated into the **protected dashboard** (only visible after login)
- Includes **10-minute auto logout timer** for session security while viewing charts


### Technologies Used
#### Frontend
- React.js  
- React Router DOM  
- Axios  
- Recharts  
- Bootstrap / Material UI  
- React Toastify  

#### Backend
- Node.js  
- Express.js  
- MongoDB / Mongoose  
- JWT (JSON Web Token)  
- Bcrypt.js  
- CORS / Dotenv  

---


