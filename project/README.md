# Transport Management System

A modern web application for managing transport operations, including drivers, trucks, and billing, with a secure authentication system and a user-friendly dashboard.

## Features

- **Landing Page:** Professional introduction, service highlights, and contact form.
- **Authentication:** Secure login for authorized users (email/password, Firebase-based).
- **Dashboard:** Overview of key stats (drivers, trucks, pending bills, maintenance alerts).
- **Drivers Management:** Add, edit, delete, and list drivers with details like license, experience, and status.
- **Trucks Management:** Manage truck fleet, including registration, insurance, maintenance, and status.
- **Billing Management:** Create, edit, delete, and mark bills as paid; manage client billing and export to PDF.
- **Responsive UI:** Clean, modern design using Tailwind CSS.
- **Protected Routes:** Only authenticated users can access management and dashboard pages.

## Screenshots

### Landing Page
![Landing Page](./screenshots/landing.png)

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Drivers Management
![Drivers Management](./screenshots/drivers.png)

### Trucks Management
![Trucks Management](./screenshots/trucks.png)

### Billing Management
![Billing Management](./screenshots/billing.png)

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State/Context:** React Context API
- **Backend/Database:** Firebase Firestore (cloud database and authentication)
- **PDF Export:** react-to-pdf
- **Icons:** lucide-react

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd project-bolt-sb1-NEW/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password) and Firestore Database.
   - Copy your Firebase config and add it to `src/lib/firebase.ts` (create this file if it doesn't exist).

   ```ts
   // src/lib/firebase.ts
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";
   import { getAuth } from "firebase/auth";

   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
project/
├── src/
│   ├── components/      # Reusable UI components (forms, lists, navbar, etc.)
│   ├── contexts/        # React context for authentication
│   ├── lib/             # Firebase configuration
│   ├── pages/           # Main app pages (Dashboard, Drivers, Trucks, Billing, Login, Landing)
│   ├── App.tsx          # Main app and routing
│   └── main.tsx         # App entry point
├── public/              # Static assets
├── package.json         # Project metadata and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── ...                  # Other config files
```

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase

## Customization

- **Styling:** Modify Tailwind classes or the config file for custom themes.
- **Database:** Adjust Firestore collections/fields as needed for your business logic.
- **Authentication:** Extend with more providers (Google, etc.) via Firebase.

## License

This project is licensed under the MIT License. 