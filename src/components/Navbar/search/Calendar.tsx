import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CalendarProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (date: Date) => void;
  type: "checkin" | "checkout";
}

const Calendar = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  type,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [direction, setDirection] = useState(0);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (type === "checkout" && selectedStartDate) {
      return date < today || date <= selectedStartDate;
    }
    return date < today;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedStartDate && !selectedEndDate) return false;
    const compareDate = date.setHours(0, 0, 0, 0);
    return (
      selectedStartDate?.setHours(0, 0, 0, 0) === compareDate ||
      selectedEndDate?.setHours(0, 0, 0, 0) === compareDate
    );
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const compareDate = date.setHours(0, 0, 0, 0);
    const start = selectedStartDate.setHours(0, 0, 0, 0);
    const end = selectedEndDate.setHours(0, 0, 0, 0);
    return compareDate > start && compareDate < end;
  };

  const renderCalendarMonth = (monthOffset: number = 0) => {
    const monthDate = new Date(currentDate);
    monthDate.setMonth(currentDate.getMonth() + monthOffset);

    const daysInMonth = getDaysInMonth(monthDate);
    const firstDay = getFirstDayOfMonth(monthDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const inRange = isDateInRange(date);

      days.push(
        <motion.button
          key={date.toISOString()}
          whileHover={!disabled ? { scale: 1.1 } : {}}
          className={`h-10 w-10 rounded-full flex items-center justify-center
            ${
              disabled
                ? "text-gray-300 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-100"
            }
            ${selected ? "bg-black text-white hover:bg-black/90" : ""}
            ${inRange ? "bg-gray-100" : ""}`}
          disabled={disabled}
          onClick={() => !disabled && onDateSelect(date)}
        >
          {day}
        </motion.button>
      );
    }

    return (
      <div className="w-[314px]">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && showLeftArrow && (
            <button
              onClick={() => {
                setDirection(-1);
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                );
                if (currentDate <= new Date()) {
                  setShowLeftArrow(false);
                }
              }}
              className="rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {monthOffset === 0 && !showLeftArrow && <div className="w-5" />}
          <div className="flex-1 relative h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={monthDate.toISOString()}
                initial={{ x: direction * 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-base font-medium absolute w-full text-center"
              >
                {monthDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </motion.h3>
            </AnimatePresence>
          </div>
          {monthOffset === 1 && (
            <button
              onClick={() => {
                setDirection(1);
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                );
                setShowLeftArrow(true);
              }}
              className="rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          )}
          {monthOffset === 0 && <div className="w-5" />}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="h-10 flex items-center text-black/70 justify-center text-xs font-medium"
            >
              {day}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={monthDate.toISOString()}
            initial={{ x: direction * 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-7 gap-1 text-sm"
          >
            {days}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-20 bg-white rounded-3xl shadow-lg border border-black/10 p-6 z-10"
    >
      <div className="flex gap-6">
        {renderCalendarMonth(0)}
        {renderCalendarMonth(1)}
      </div>
    </motion.div>
  );
};

export default Calendar;
