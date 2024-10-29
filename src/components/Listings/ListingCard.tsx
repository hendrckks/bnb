import { useState } from "react";
import { motion } from "framer-motion";

interface ListingCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  dates: string;
  location?: string;
  isLoading?: boolean;
}

const ListingCard = ({
  imageUrl,
  title,
  description,
  price,
  dates,
  // location,
  isLoading,
}: ListingCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.025,
        transition: {
          duration: 0.2,
        },
      }}
      className="bg-transparent cursor-pointer rounded-lg h-[470px] overflow-hidden relative"
    >
      <div
        className={`relative h-[320px] ${
          isLoading ? "bg-gray-300 animate-pulse" : ""
        }`}
      >
        {isLoading ? (
          <div className="w-full h-full"></div>
        ) : (
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {!isLoading && (
          <button
            className={`absolute top-4 right-4 bg-transparent p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105`}
            onClick={handleLikeClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 transition-colors duration-300 ease-in-out ${
                isLiked
                  ? "fill-current text-red-500 stroke-white stroke-2"
                  : "text-white stroke-white stroke-2"
              }`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
      <motion.div
        className="p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {isLoading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
        ) : (
          <>
            <h3 className="text-base font-medium mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-1">{description}</p>
            <div className="items-center">
              <div className="text-sm mb-1">
                <p className="text-gray-600">{dates}</p>
                {/* <p className="text-gray-600">{location}</p> */}
              </div>
              <p className="text-base font-medium">KSh {price}/night</p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ListingCard;
