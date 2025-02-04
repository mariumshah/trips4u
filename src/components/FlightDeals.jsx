import { useNavigate } from "react-router-dom";
import { right } from "../assets/icons";
import { msunrise, shangai, sunrise, sydney, temple } from "../assets/images";
import FlightDealsCard from "../container/FlightDealsCard";

const FlightDeals = () => {

  const navigate = useNavigate();

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/packages');
  };

  return (
    <>
      <div className="px-8 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Find your next adventure <br className=" block sm:hidden " /> with
            these <span className="text-[#605DEC]">flight deals</span>
          </p>
          <div
            className="flex items-start justify-center gap-1 cursor-pointer"
            onClick={handleSeeAllClick}
          >
            <p className="text-[#A1B0CC] text-sm md:text-lg">All</p>
            <img src={right} alt="arrow" className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        
        {/* Scrollable Image Cards */}
        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hidden">
        <FlightDealsCard
            image={temple}
            title="Kōdaiji Temple,"
            name="Kyoto"
            price="$633"
            des=" Step back in time in the Gion district"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={shangai}
            title="The Bund, "
            name="Shanghai"
            price="$598"
            des=" China’s most international city"
            className="flex-shrink-0 w-[300px]"  // Fixing width for each card
          />
          <FlightDealsCard
            image={sydney}
            title="Sydney Opera House, "
            name="Sydney"
            price="$981"
            des=" Take a stroll along the famous harbor"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={temple}
            title="Kōdaiji Temple,"
            name="Kyoto"
            price="$633"
            des=" Step back in time in the Gion district"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={sunrise}
            title="Sunrise,"
            name="Kyoto"
            price="$633"
            des=" Step back in time in the Gion district"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={msunrise}
            title="Sunrise,"
            name="Kyoto"
            price="$633"
            des=" Step back in time in the Gion district"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={sydney}
            title="Sydney Opera House, "
            name="Sydney"
            price="$981"
            des=" Take a stroll along the famous harbor"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={shangai}
            title="The Bund, "
            name="Shanghai"
            price="$598"
            des=" China’s most international city"
            className="flex-shrink-0 w-[300px]"
          />
          <FlightDealsCard
            image={temple}
            title="Kōdaiji Temple,"
            name="Kyoto"
            price="$633"
            des=" Step back in time in the Gion district"
            className="flex-shrink-0 w-[300px]"
          />
        </div>
      </div>
    </>
  );
};

export default FlightDeals;
