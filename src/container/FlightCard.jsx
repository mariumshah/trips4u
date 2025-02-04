
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FlightCard = ({ img, duration, name, time, stop, trip, price, hnl, origin, destination }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white shadow-md p-4 border border-gray-300">
      {/* Main Flight Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between" onClick={() => setExpanded(!expanded)}>
        {/* Airline Info */}
        <div className="flex items-center gap-4">
          <img src={img} alt={name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>
        
        {/* Flight Time */}
        <div className="text-center sm:text-left px-4">
          <p className="text-gray-900 font-medium text-sm sm:text-base">{time}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{name}</p>
        </div>
  
        {/* Duration */}
        <div className="text-center sm:text-right px-4">
          <p className="text-gray-900 font-medium text-sm sm:text-base">{duration}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{origin} - {destination}</p>
        </div>
        
        {/* Stops and Layover */}
        <div className="text-center sm:text-right px-4">
          <p className={`text-sm sm:text-base ${stop > 0 ? 'text-red-500' : 'text-green-500'}`}>{stop} stop{stop !== 1 ? 's' : ''}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{hnl}</p>
        </div>
        
        {/* Price and Trip Type */}
        <div className="text-center sm:text-right px-4">
          <p className="text-gray-900 font-bold text-lg sm:text-xl">{price}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{trip}</p>
        </div>
  
        {/* Expand/Collapse Arrow */}
        <div className="px-4 cursor-pointer" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
          {expanded ? <FaChevronUp className="text-gray-700" /> : <FaChevronDown className="text-gray-700" />}
        </div>
      </div>
      
      {/* Expandable Section */}
      {expanded && (
        <div className="mt-4 p-4 border-t border-gray-300">
          <p className="text-gray-700 text-sm">Additional flight details will be displayed here...</p>
        </div>
      )}
    </div>
  );
  
};

export default FlightCard;
