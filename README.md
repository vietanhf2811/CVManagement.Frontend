# CVManagement Frontend (React.js + Vite + TypeScript)

This is the frontend client for **CVManagement**, converted from Angular to **React.js + TypeScript + Vite**.

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 & Bootstrap 5

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
# Or
npm start
```
The application will start at `http://localhost:4200`.

### 3. Production Build
```bash
npm run build
```

## Features Migrated
- **Auth Layout:** Split-screen responsive layout with brand banner & features showcase
- **Login Page:** Sign-in form with validation, remember me, forgot password
- **Register Page:** Candidate/HR registration form with client validation and API integration (`POST /api/auth/register`)
- **Dashboard Layout:** Top navigation header, responsive sidebar with active links, logout handler
- **API Service:** Axios instance with base URL configuration (`https://localhost:7081/api`) and JWT interceptor support
