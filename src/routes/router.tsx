import { createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "../app/MainLayout";
import Home from "../app/pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../app/pages/ProfilePage";
import Faq from "../app/pages/Faq";
import ContactPage from "../app/pages/Contact";
// import ProfilePage from "../app/pages/ProfilePage";
// import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AnimatePresence mode="sync">
        <MainLayout />
      </AnimatePresence>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/contact-us",
        element: <ContactPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
