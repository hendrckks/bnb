import { motion } from "framer-motion";

interface LocationMenuProps {
  onLocationSelect: (location: string) => void;
}

const LocationMenu = ({ onLocationSelect }: LocationMenuProps) => {
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
      <div
        className="w-full p-6 hover:bg-black/5 text-[#222222] text-[14px] rounded-lg cursor-pointer"
        onClick={() => onLocationSelect("Eldoret")}
      >
        Eldoret
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Nairobi")}
      >
        Nairobi
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Kitui")}
      >
        Kitui
      </div>
      <div className="text-[14px] font-semibold p-6 text-[#222222]">
        Suggested Locations
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Diani")}
      >
        Diani
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Nanyuki")}
      >
        Nanyuki
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Kilifi")}
      >
        Kilifi
      </div>
      <div
        className="w-full p-6 hover:bg-black/5 rounded-lg text-[#222222] text-[14px] cursor-pointer"
        onClick={() => onLocationSelect("Meru")}
      >
        Meru
      </div>
    </motion.div>
  );
};

export default LocationMenu;
