import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <div
        className={`antialiased min-h-screen font-satoshi mx-auto dark:bg-gray-950 dark:text-gray-200`}
      >
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
