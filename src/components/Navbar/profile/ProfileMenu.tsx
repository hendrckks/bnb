import { useEffect, useState } from "react";
import { Menu01Icon } from "../../../assets/icons/Hamburger";
import { UserCircleIcon } from "../../../assets/icons/UserCircle";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase/clientApp";
import { signOut } from "firebase/auth";

interface ProfileDropDownProps {
  setIsOpen: (value: boolean) => void;
}

const ProfileDropDown = ({ setIsOpen }: ProfileDropDownProps) => {
  const { user, setShowAuthModal, setAuthFormType } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAuth = (formType: "signup" | "login") => {
    setAuthFormType(formType);
    setShowAuthModal(true);
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  return (
    <div className="mt-2 w-48 text-sm border font-semibold rounded-lg text-black/80 bg-white shadow-lg">
      {!user ? (
        <>
          <div
            className="rounded-md p-4 cursor-pointer hover:bg-black/5"
            onClick={() => handleAuth("signup")}
          >
            Sign up
          </div>
          <div
            className="rounded-md p-4 cursor-pointer hover:bg-black/5"
            onClick={() => handleAuth("login")}
          >
            Log in
          </div>
        </>
      ) : (
        <>
          <div
            className="rounded-md p-4 cursor-pointer hover:bg-black/5"
            onClick={handleProfileClick}
          >
            Profile
          </div>
          <div
            className="rounded-md p-4 cursor-pointer hover:bg-black/5"
            onClick={handleSignOut}
          >
            Sign out
          </div>
        </>
      )}
    </div>
  );
};

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (!target.closest(".profile-container")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="profile-container relative">
      <div className="py-2 px-2 rounded-full h-12 border border-black/20 hover:shadow-md ease-in-out duration-100 flex items-center gap-3">
        <Menu01Icon
          className="text-black cursor-pointer h-5 font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
        <Link to="/profile">
          <UserCircleIcon
            className={`cursor-pointer h-7 w-7 font-bold ${
              user ? "text-blue-600" : "text-black"
            }`}
          />
        </Link>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10">
          <ProfileDropDown setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
