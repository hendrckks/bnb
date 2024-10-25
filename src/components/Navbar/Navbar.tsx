// Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileMenu from "./profile/ProfileMenu";
import LargeContainer from "../LargeContainer";
import AnimatedSearch from "./search/AnimatedSearch";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      layout
      initial={{ height: 100 }}
      animate={{ height: isScrolled ? (searchExpanded ? 96 : 80) : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 backdrop-blur-sm bg-white/90"
    >
      <LargeContainer className="h-full mx-auto px-6 flex items-center justify-between">
        <motion.div layout className="flex-shrink-0">
          <Link to="/" className="block">
            <img src="/ventos.png" className="h-6 w-auto" alt="Ventos Logo" />
          </Link>
        </motion.div>

        <motion.div layout className="flex-1 flex justify-center px-4">
          <AnimatedSearch
            forceCollapsed={isScrolled}
            onExpandChange={setSearchExpanded}
          />
        </motion.div>

        <motion.div layout className="flex-shrink-0">
          <ProfileMenu />
        </motion.div>
      </LargeContainer>
    </motion.div>
  );
};

export default Navbar;
