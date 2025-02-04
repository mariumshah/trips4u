import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { SearchBar } from "../components";

const Hero = () => {
  return (
    <>
      <header className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
        <div className="flex justify-center items-center">
          <h1 className="font-extrabold text-4xl sm:text-7xl md:text-7xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] text-[#605DEC]">
             Flights <br />
          </h1>
        </div>
        <SearchBar variant="home" />
      </header>
    </>
  );
};

export default Hero;

