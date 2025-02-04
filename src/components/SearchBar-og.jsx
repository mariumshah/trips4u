import { departure, arrival, calendar, person } from "../assets/icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../data/constant";

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
    initialDate = new Date(),
    variant = "home"
}) => {
    const navigate = useNavigate();
    const [date, setDate] = useState([{ startDate: new Date(initialDate), endDate: new Date(initialDate), key: "selection" }]);
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        minor: 0,
    }); 
    const departureSuggest = AutoSuggest(initialDeparture);
    const arrivalSuggest = AutoSuggest(initialArrival);

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
                returnDate: date[0].endDate.toISOString().split("T")[0],
                options,
            },
        });
    };


    return (
        <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-10 mx-auto mb-4 relative">
            {/* <div className={`flex w-full max-w-[1024px] items-center mx-auto relative
        ${variant === "home" ? "lg:flex-row flex-col mt-20" : "flex-row h-[65px] mt-4 mb-4"}`}> */}

            {/* Departure Input */}
            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
                <img src={departure} alt="departure" />
                <input
                    type="text"
                    placeholder="From where?"
                    value={departureSuggest.input}
                    onChange={departureSuggest.handleInputChange}
                    onFocus={() => departureSuggest.setIsOpen(true)}
                    className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
                />
                {departureSuggest.isOpen && (
                    <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
                        {departureSuggest.matchingSuggestions.map((suggestion) => (
                            <li
                                key={suggestion}
                                onClick={() => departureSuggest.handleSuggestionClick(suggestion)}
                                className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE] mt-1"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Arrival Input */}
            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
                <img src={arrival} alt="arrival" />
                <input
                    type="text"
                    placeholder="Where to?"
                    value={arrivalSuggest.input}
                    onChange={arrivalSuggest.handleInputChange}
                    onFocus={() => arrivalSuggest.setIsOpen(true)}
                    className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] placeholder:text-[#7C8DB0] placeholder:text-base placeholder:leading-6"
                />
                {arrivalSuggest.isOpen && (
                    <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
                        {arrivalSuggest.matchingSuggestions.map((suggestion) => (
                            <li
                                key={suggestion}
                                onClick={() => arrivalSuggest.handleSuggestionClick(suggestion)}
                                className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE] mt-1"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Calendar Input */}
            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6] p-2">
                <img src={calendar} alt="calendar" />
                <span
                    className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
                    onClick={() => setOpenDate(!openDate)}
                >
                    {openDate
                        ? `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                            date[0].endDate,
                            "dd/MM/yyyy"
                        )}`
                        : "Departure to Return"}
                </span>
                {openDate && (
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="absolute top-64 lg:top-20 z-10"
                    />
                )}
            </div>

            {/* Options Input */}
            <div className="flex w-full h-full justify-start items-center border-[1px] border-[#CBD4E6]  p-2">
                <img src={person} alt="person" />
                <span
                    className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
                    onClick={() => setOpenOptions(!openOptions)}
                >
                    {`${options.adult} Adult - ${options.minor} Minor `}
                </span>
                {openOptions && (
                    <div className="w-52 h-fit flex flex-col gap-4 rounded-md bg-white shadowCard absolute lg:top-[70px] top-64 p-4 z-10">
                        <div className="flex justify-between items-center">
                            <span className="text-[#7C8DB0] text-base leading-6">
                                Adults:
                            </span>
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
                        <div className="flex justify-between items-center">
                            <span className="text-[#7C8DB0] text-base leading-6">
                                Minors:
                            </span>
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

            {/* Search Button */}
            {/* <Link to="/explore" className="w-full "> */}
            {/* <button onClick={handleSearch} className={`w-full bg-[#605DEC] text-[#FAFAFA] text-lg h-[45px] px-5 lg:rounded-r-[4px]
        ${variant === "home" ? "leading-6 lg:h-[65px] mt-4 rounded-md" : "h-[65px] "}`}>
                Search
            </button> */}
            <button
                onClick={handleSearch}
                className={`w-full bg-[#605DEC] text-[#FAFAFA] text-lg h-[45px] px-5 lg:h-[65px] 
    ${variant === "home" ? "leading-6 rounded-r-[4px] lg:" : "h-[65px] rounded-r-[4px]"}`}>
                Search
            </button>

            {/* </Link> */}
        </div>

    );
};

export default SearchBar;
