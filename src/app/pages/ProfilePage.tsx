// import React from 'react';
import { clearSessionTimeout, signOut } from "../../lib/firebase/auth"; // Import the signOut function
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      clearSessionTimeout(); // Clean edxhr the session timeout on sign out
      await signOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, user!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
