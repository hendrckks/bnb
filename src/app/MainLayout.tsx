import { Outlet } from "react-router-dom";
import AuthPopup from "../components/authmodals/AuthModal";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  const { showAuthModal } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      {showAuthModal && <AuthPopup />}
      <Footer />
    </div>
  );
};

export default MainLayout;
