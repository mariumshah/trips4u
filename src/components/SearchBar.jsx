// import { departure, arrival, calendar, person } from "../assets/icons";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { format } from "date-fns";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { cities } from "../data/constant";

// const AutoSuggest = (initialValue = "") => {
//     const [input, setInput] = useState(initialValue);
//     const [matchingSuggestions, setMatchingSuggestions] = useState(cities);
//     const [isOpen, setIsOpen] = useState(false);

//     const handleInputChange = (event) => {
//         const inputValue = event.target.value.toLowerCase();
//         setInput(inputValue);
//         setMatchingSuggestions(cities.filter((city) => city.toLowerCase().startsWith(inputValue)));
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setInput(suggestion);
//         setIsOpen(false);
//     };

//     return { input, matchingSuggestions, isOpen, setInput, setIsOpen, handleInputChange, handleSuggestionClick };
// };

// const SearchBar = ({ initialDeparture = "", initialArrival = "", initialDate = new Date() }) => {
//     const navigate = useNavigate();
//     const [date, setDate] = useState([{ startDate: new Date(initialDate), endDate: new Date(initialDate), key: "selection" }]);
//     const [openDate, setOpenDate] = useState(false);
//     const [options, setOptions] = useState({ adult: 1 });

//     const departureSuggest = AutoSuggest(initialDeparture);
//     const arrivalSuggest = AutoSuggest(initialArrival);

//     const handleSearch = () => {
//         navigate("/explore", {
//             state: {
//                 departure: departureSuggest.input,
//                 arrival: arrivalSuggest.input,
//                 date: date[0].startDate.toISOString().split("T")[0],
//                 returnDate: date[0].endDate.toISOString().split("T")[0],
//                 options,
//             },
//         });
//     };

//     return (
//         <div className="bg-white shadow-md rounded-md p-4 pb-12 flex flex-col w-full max-w-[700px] mx-auto relative">
//             {/* Top Section */}
//             <div className="flex justify-between items-center mb-3 text-gray-600 text-sm">
//                 <span>Round trip</span>
//                 <span><img src={person} alt="person" className="inline w-4 h-4 mr-1" /> {options.adult}</span>
//                 <span>Economy</span>
//             </div>

//             {/* Inputs in a Single Row */}
//             <div className="flex items-center gap-2">
//                 <div className="flex items-center border p-2 rounded-md w-1/3">
//                     <img src={departure} alt="departure" className="w-5 h-5 mr-2" />
//                     <input type="text" placeholder="Where from?" value={departureSuggest.input} onChange={departureSuggest.handleInputChange} className="outline-none text-sm w-full" />
//                 </div>
//                 <div className="flex items-center border p-2 rounded-md w-1/3">
//                     <img src={arrival} alt="arrival" className="w-5 h-5 mr-2" />
//                     <input type="text" placeholder="Where to?" value={arrivalSuggest.input} onChange={arrivalSuggest.handleInputChange} className="outline-none text-sm w-full" />
//                 </div>
//                 <div className="flex items-center border p-2 rounded-md w-1/3 cursor-pointer" onClick={() => setOpenDate(!openDate)}>
//                     <img src={calendar} alt="calendar" className="w-5 h-5 mr-2" />
//                     <span className="text-sm">{`${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
//                 </div>
//             </div>

//             {openDate && (
//                 <DateRange
//                     editableDateInputs={true}
//                     onChange={(item) => setDate([item.selection])}
//                     moveRangeOnFirstSelection={false}
//                     ranges={date}
//                     className="absolute top-16 z-10 bg-white shadow-md p-2"
//                 />
//             )}

//             {/* Search Button Positioned Below */}
//             {/* Floating Search Button */}
//             <button onClick={handleSearch} className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-[#605DEC] text-white px-6 py-2 rounded-full shadow-lg flex items-center">
//                 <span className="mr-2">Search</span>
//             </button>

//         </div>
//     );
// };

// export default SearchBar;
import { departure, arrival, calendar, person, doubleArrow } from "../assets/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cities, tripType, seatTypes } from "../data/constant";


const AutoSuggest = (initialValue = "") => {
    const [input, setInput] = useState(initialValue);
    const [matchingSuggestions, setMatchingSuggestions] = useState(cities);
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setInput(inputValue);
        setMatchingSuggestions(cities.filter((city) => city.toLowerCase().startsWith(inputValue)));
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setIsOpen(false);
    };

    return { input, matchingSuggestions, isOpen, setInput, setIsOpen, handleInputChange, handleSuggestionClick };
};

const SearchBar = ({
    initialDeparture = "",
    initialArrival = "",
    initialDate = null,
    variant = "home" }) => {

    const navigate = useNavigate();
    // const [date, setDate] = useState(initialDate ? [{ startDate: new Date(initialDate), endDate: new Date(initialDate), key: "selection" }] : [{ startDate: null, endDate: null, key: "selection" }]);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState({ adult: 1, minor: 0 });
    const [selectedTripType, setSelectedTripType] = useState("Round Trip");
    const [selectedSeatType, setSelectedSeatType] = useState("economy");
    const [openOptions, setOpenOptions] = useState(false); // To toggle the options for adults and minors

    const departureSuggest = AutoSuggest(initialDeparture);
    const arrivalSuggest = AutoSuggest(initialArrival);
    const calendarRef = useRef(null);
    const [date, setDate] = useState([{ startDate: null, endDate: null, key: "selection" }]);

    const handleDateChange = (item) => {
        setDate([{
            startDate: item.selection.startDate,
            endDate: selectedTripType === "One Way" ? null : item.selection.endDate, // Allow only start date for One Way trips
            key: "selection"
        }]);
    };

    const handleOptions = (type, action) => {
        if (action === "i") {
            setOptions(prev => ({ ...prev, [type]: prev[type] + 1 }));
        } else if (action === "d" && options[type] > 0) {
            setOptions(prev => ({ ...prev, [type]: prev[type] - 1 }));
        }
    };

    const handleSearch = () => {
        navigate("/explore", {
            state: {
                departure: departureSuggest.input,
                arrival: arrivalSuggest.input,
                date: date[0].startDate.toISOString().split("T")[0],
                returnDate: date[0].endDate ? date[0].endDate.toISOString().split("T")[0] : "",
                options,
                tripType: selectedTripType,
                seatType: selectedSeatType
            },
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setOpenDate(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${variant === "home" ? "bg-white shadow-md rounded-md p-6 pb-16" : "p-6"} flex flex-col w-full max-w-[1000px] mx-auto relative`}>

            {/* Top Section */}
            <div className="flex items-center">
                <img src={doubleArrow} alt="doubleArrow" className="inline w-10 h-10 mr-2" />

                <div className="flex gap-6 items-center text-[#3C4043]">
                    {/* Trip Type Dropdown */}
                    <select
                        value={selectedTripType}
                        onChange={(e) => setSelectedTripType(e.target.value)}
                        className="outline-none text-lg text-sm"
                    >
                        {tripType.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>


                    {/* Adults and Minors Dropdown */}
                    <div className="flex w-full h-full justify-start items-center cursor-pointer text-[#3C4043]" onClick={() => setOpenOptions(!openOptions)}>
                        <img src={person} alt="person" />
                        <span className="text-base leading-6 ml-2 text-sm">
                            {`${options.adult + options.minor}`}
                        </span>
                        {openOptions && (
                            <div className="w-52 h-fit flex flex-col gap-4 rounded-md bg-white shadowCard absolute lg:top-[70px] top-64 p-4 z-10">
                                {/* Adults Options */}
                                <div className="flex justify-between items-center">
                                    <span className="text-[#7C8DB0] text-base leading-6">Adults:</span>
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                                            onClick={() => handleOptions("adult", "d")}
                                            disabled={options.adult <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-[#7C8DB0]">{options.adult}</span>
                                        <button
                                            className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                                            onClick={() => handleOptions("adult", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Minors Options */}
                                <div className="flex justify-between items-center">
                                    <span className="text-[#7C8DB0] text-base leading-6">Minors:</span>
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] disabled:cursor-not-allowed"
                                            onClick={() => handleOptions("minor", "d")}
                                            disabled={options.minor <= 0}
                                        >
                                            -
                                        </button>
                                        <span className="text-[#7C8DB0]">{options.minor}</span>
                                        <button
                                            className="border-2 border-[#605DEC] px-2 text-[#7C8DB0]"
                                            onClick={() => handleOptions("minor", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Seat Type Dropdown */}
                    <div className="flex items-center text-[#3C4043]">
                        <select
                            value={selectedSeatType}
                            onChange={(e) => setSelectedSeatType(e.target.value)}
                            className="outline-none text-lg text-sm"
                        >
                            {Object.keys(seatTypes).map((key) => (
                                <option key={key} value={key}>
                                    {seatTypes[key]} {/* Display value */}
                                </option>
                            ))}
                        </select>
                    </div>


                </div>
            </div>

            {/* Inputs in a Single Row */}
            <div className="flex items-center gap-4">
                {/* Departure Dropdown */}
                <div className={`flex items-center border p-4 rounded-md w-1/4 text-base ${variant === "explore" ? "border-none" : ""}`}>
                    <img src={departure} alt="departure" className="w-6 h-6 mr-3" />
                    <select value={departureSuggest.input} onChange={(e) => departureSuggest.setInput(e.target.value)} className="outline-none text-lg w-full">
                        <option value="" disabled selected>{departureSuggest.input || "Where from?"}</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Arrival Dropdown */}
                <div className={`flex items-center border p-4 rounded-md w-1/4 ${variant === "explore" ? "border-none" : ""}`}>
                    <img src={arrival} alt="arrival" className="w-6 h-6 mr-3" />
                    <select value={arrivalSuggest.input} onChange={(e) => arrivalSuggest.setInput(e.target.value)} className="outline-none text-lg w-full">
                        <option value="" disabled selected>{arrivalSuggest.input || "Where to?"}</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Date Range Dropdown */}
                {/* <div className={`flex items-center border p-4 rounded-md w-1/2 cursor-pointer ${variant === "explore" ? "border-none" : ""}`} 
                onClick={() => setOpenDate(!openDate)}>
                    <img src={calendar} alt="calendar" className="w-6 h-6 mr-3" />
                    <span className="text-lg">
                        {date[0].startDate && date[0].endDate ?
                            `${format(date[0].startDate, "dd/MM/yyyy")} - ${format(date[0].endDate, "dd/MM/yyyy")}`
                            : "Departure | Return"
                        }
                    </span>
                </div> */}

                <div
                    className={`flex items-center border p-4 rounded-md w-1/2 cursor-pointer ${variant === "explore" ? "border-none" : ""}`}
                    onClick={() => setOpenDate(!openDate)}
                >
                    <img src={calendar} alt="calendar" className="w-6 h-6 mr-3" />
                    <span className="text-lg">
                        {date[0].startDate
                            ? selectedTripType === "One Way"
                                ? format(date[0].startDate, "dd/MM/yyyy") // Show only departure date
                                : `${format(date[0].startDate, "dd/MM/yyyy")} - ${date[0].endDate ? format(date[0].endDate, "dd/MM/yyyy") : ""}`
                            : selectedTripType === "One Way"
                                ? "Departure" // Placeholder for One Way
                                : "Departure | Return" // Placeholder for Round Trip
                        }
                    </span>
                </div>
            </div>

            {openDate && (
                <div ref={calendarRef} className="absolute top-16 left-0 right-0 z-10 bg-white shadow-md p-4 w-full mx-auto">
                    <DateRange
                        editableDateInputs={true}
                        // onChange={(item) => setDate([item.selection])}
                        onChange={handleDateChange}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        months={2}
                        direction="horizontal"
                        showMonthAndYearPickers={true}
                        minDate= {new Date()}
                        showMonthArrow={true}
                    />
                </div>
            )}

            {/* Floating Search Button */}
            <button
                onClick={handleSearch}
                className={`absolute 
        ${variant !== "home" ? "right-4 bottom-4 sm:right-8 sm:bottom-6 md:right-12 md:bottom-8 px-4 py-2 text-xs" : "bottom-[-24px] left-1/2 transform -translate-x-1/2 px-8 py-4 text-lg"} 
        bg-[#605DEC] text-white rounded-full shadow-lg flex items-center`}
            >
                <span className="mr-3">Search</span>
            </button>

        </div>
    );
};

export default SearchBar;
