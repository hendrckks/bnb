import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LocationMenuProps {
  onLocationSelect: (location: string) => void;
}

interface RecentSearch {
  location: string;
  timestamp: number;
}

const EXPIRATION_TIME = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const MAX_RECENT_SEARCHES = 5;

const LocationMenu = ({ onLocationSelect }: LocationMenuProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = () => {
    const searches = localStorage.getItem("recentLocationSearches");
    if (searches) {
      const parsedSearches: RecentSearch[] = JSON.parse(searches);
      const currentTime = Date.now();

      // Filter out expired searches
      const validSearches = parsedSearches.filter(
        (search) => currentTime - search.timestamp < EXPIRATION_TIME
      );

      setRecentSearches(validSearches.map((search) => search.location));

      // If any searches were expired, update localStorage
      if (validSearches.length !== parsedSearches.length) {
        localStorage.setItem(
          "recentLocationSearches",
          JSON.stringify(validSearches)
        );
      }
    }
  };

  const handleLocationSelect = (location: string) => {
    const currentTime = Date.now();
    const searches = localStorage.getItem("recentLocationSearches");
    let recentSearches: RecentSearch[] = searches ? JSON.parse(searches) : [];

    // Filter out expired searches and the selected location if it exists
    recentSearches = recentSearches.filter(
      (search) =>
        currentTime - search.timestamp < EXPIRATION_TIME &&
        search.location !== location
    );

    // Add the new search to the beginning
    recentSearches.unshift({
      location,
      timestamp: currentTime,
    });

    // Keep only the most recent MAX_RECENT_SEARCHES
    recentSearches = recentSearches.slice(0, MAX_RECENT_SEARCHES);

    // Update localStorage and state
    localStorage.setItem(
      "recentLocationSearches",
      JSON.stringify(recentSearches)
    );
    setRecentSearches(recentSearches.map((search) => search.location));

    // Call the original onLocationSelect
    onLocationSelect(location);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="max-w-[400px] h-[400px] w-full rounded-3xl bg-white absolute border border-black/10 shadow-lg top-20 overflow-auto scroll-smooth p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
      style={{
        scrollbarWidth: "thin",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF;
        }
        .scrollbar-thin::-webkit-scrollbar-button {
          display: none;
        }
      `}</style>

      {recentSearches.length > 0 && (
        <>
          <div className="text-sm font-semibold p-5 text-[#222222]">
            Recent searches
          </div>
          {recentSearches.map((location, index) => (
            <div
              key={`recent-${location}-${index}`}
              className="w-full p-5 hover:bg-black/5 text-[#222222] text-[14px] rounded-lg cursor-pointer"
              onClick={() => handleLocationSelect(location)}
            >
              {location}
            </div>
          ))}
        </>
      )}

      <div className="text-sm font-semibold p-5 text-[#222222]">
        Suggested Locations
      </div>
      {["Diani", "Nanyuki", "Kilifi", "Meru"].map((location) => (
        <div
          key={location}
          className="w-full p-5 hover:bg-black/5 rounded-lg text-[#222222] text-sm cursor-pointer"
          onClick={() => handleLocationSelect(location)}
        >
          {location}
        </div>
      ))}
    </motion.div>
  );
};

export default LocationMenu;
