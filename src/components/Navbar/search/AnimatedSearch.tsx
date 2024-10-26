import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search01Icon } from "../../../assets/icons/Search";
import { X } from "lucide-react";
import LocationMenu from "./LocationMenu";
import Calendar from "./Calendar";

interface AnimatedSearchProps {
  forceCollapsed?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

const AnimatedSearch = ({
  forceCollapsed = false,
  onExpandChange,
}: AnimatedSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState<
    "checkin" | "checkout" | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(!forceCollapsed);
    if (forceCollapsed) {
      setShowLocationMenu(false);
      setShowCalendar(null);
    }
  }, [forceCollapsed]);

  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowLocationMenu(false);
        setShowCalendar(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationMenu(false);
  };

  const clearDate = (type: "checkin" | "checkout", event: React.MouseEvent) => {
    event.stopPropagation();
    if (type === "checkin") {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(null);
    }
    setShowCalendar(type);
  };

  const expandSearch = () => {
    if (forceCollapsed) {
      setIsExpanded(true);
    }
  };

  const closeSearch = () => {
    if (forceCollapsed) {
      setIsExpanded(false);
    }
    setShowLocationMenu(false);
    setShowCalendar(null);
  };

  const handleGridClick = (section: string) => {
    if (section === "location") {
      setShowLocationMenu(true);
      setShowCalendar(null);
    } else if (section === "checkin") {
      setShowCalendar("checkin");
      setShowLocationMenu(false);
    } else if (section === "checkout") {
      setShowCalendar("checkout");
      setShowLocationMenu(false);
    } else {
      setShowLocationMenu(false);
      setShowCalendar(null);
    }
  };

  const handleDateSelect = (date: Date) => {
    if (showCalendar === "checkin") {
      setSelectedStartDate(date);
      setShowCalendar("checkout");
    } else if (showCalendar === "checkout") {
      setSelectedEndDate(date);
      setShowCalendar(null);
    }
  };

  const formatDisplayDate = (date: Date | null): string => {
    if (!date) return "Add dates";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const renderDateSection = (type: "checkin" | "checkout") => {
    const date = type === "checkin" ? selectedStartDate : selectedEndDate;
    const label = type === "checkin" ? "Check in" : "Check out";

    return (
      <div
        className="relative flex items-center justify-center"
        onClick={() => handleGridClick(type)}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-black/30"></div>
        <div className="text-sm font-medium cursor-pointer text-black/60 w-full">
          <div className="flex flex-col justify-center items-center p-2">
            <span className="text-black text-xs">{label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-normal">
                {formatDisplayDate(date)}
              </span>
              {date && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => clearDate(type, e)}
                >
                  <X size={14} />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={searchRef}>
      <AnimatePresence initial={false} mode="wait">
        {!isExpanded ? (
          <motion.div
            key="small"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-[400px] w-full h-12"
            onClick={expandSearch}
          >
            <div className="px-6 h-full rounded-full border border-black/20 shadow-sm hover:shadow-md transition-shadow duration-200 grid grid-cols-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-black/30"></div>
                <div className="cursor-pointer text-sm text-black/60">
                  <span className="text-black/90">
                    {selectedLocation || "Location"}
                  </span>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-black/30"></div>
                <div className="text-sm cursor-pointer text-black/60">
                  <span className="text-black/90">Anytime</span>
                </div>
              </div>
              <div className="flex items-center justify-center cursor-pointer">
                <div className="flex items-center gap-2 justify-center ml-4 rounded-full">
                  <div className="rounded-full bg-black/90 p-2">
                    <Search01Icon className="text-white w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold group-hover:text-white/90 transition-colors ease-linear duration-200 pr-2 cursor-pointer text-black/60">
                    Search
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -20, width: "400px" }}
            animate={{ opacity: 1, y: 0, width: "700px" }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="h-16"
          >
            <div className="px-6 h-full rounded-full border border-black/20 shadow-md grid grid-cols-4">
              <div
                className="relative flex items-center justify-center"
                onClick={() => handleGridClick("location")}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-black/30"></div>
                <div className="cursor-pointer text-sm font-semibold text-black/60 w-full">
                  <div className="flex flex-col justify-center items-start p-2">
                    <span className="text-black/80 font-medium text-xs">
                      Where
                    </span>
                    <div className="relative w-full flex items-center">
                      {" "}
                      {/* Added flex and items-center */}
                      <input
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        placeholder="Search Locations"
                        className="text-start w-full cursor-auto placeholder:text-black/60 placeholder:text-[14px] placeholder:font-normal focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowLocationMenu(true);
                          setShowCalendar(null);
                        }}
                      />
                      {selectedLocation && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-0 flex items-center justify-center p-1 hover:bg-gray-100 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLocation("");
                          }}
                        >
                          <X size={14} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {renderDateSection("checkin")}
              {renderDateSection("checkout")}
              <div className="flex items-center justify-center">
                <div
                  onClick={closeSearch}
                  className="flex items-center gap-2 justify-center hover:bg-black group transition-colors rounded-full p-3 cursor-pointer"
                >
                  <div className="rounded-full bg-black/90 p-2">
                    <Search01Icon className="text-white w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold group-hover:text-white/90 transition-colors pr-2 text-black/60">
                    Search
                  </span>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {showLocationMenu && (
                <LocationMenu onLocationSelect={handleLocationSelect} />
              )}
              {showCalendar && (
                <Calendar
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onDateSelect={handleDateSelect}
                  type={showCalendar}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSearch;
