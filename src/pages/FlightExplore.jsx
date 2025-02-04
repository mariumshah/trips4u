
import { useEffect, useState } from "react";
import { SearchBar } from "../components";
import { fetchFlightDeals, fetchAirportDetails } from "../services/flightService";
import { FlightCard } from "../container";
import { useLocation } from "react-router-dom";


const FlightExplore = () => {
  const location = useLocation();
  const { departure, arrival, date, returnDate, options, tripType, seatType } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [originSkyId, setOriginSkyId] = useState(null);  
  const [originEntityId, setOriginEntityId] = useState(null);
  const [destinationSkyId, setDestinationSkyId] = useState(null);
  const [destinationEntityId, setDestinationEntityId] = useState(null);
  const [error, setError] = useState(null);


  const [flights, setFlights] = useState([]);

  const fetchFlights = async (origin, destination) => {
    const
      params = {
        originSkyId: origin.skyId, // Fetch this from SearchAirport API
        destinationSkyId: destination.skyId,
        originEntityId: origin.entityId,
        destinationEntityId: destination.entityId,
        date: date,
        returnDate: returnDate || undefined, //optional
        cabinClass: seatType, //optional
        adults: options.adult, //optional
        childrens: options.minor,  //optional
        // infants  //optional
        sortBy: 'best', //optional ENUM: best, price_high, fastest, outbound_take_off_time, return_take_off_time, return_landing_time
        limit: 10, //optional (sets limit on no of records fetched)
        currency: 'USD',  //optional
        market: 'en-US', //optional
        countryCode: 'US' //optional
      };

    try {
      const flightData = await fetchFlightDeals(params);
      setFlights(flightData.data.itineraries);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flight details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAirportDetails = async () => {
      try {
        const [origin, destination] = await Promise.all([
          fetchAirportDetails({query : departure} ),
          fetchAirportDetails({query: arrival})
        ]);

        if (!signal.aborted) {
          setOriginSkyId(origin.skyId);
          setOriginEntityId(origin.entityId);
          setDestinationSkyId(destination.skyId);
          setDestinationEntityId(destination.entityId);

          await fetchFlights(origin, destination)
        }
      } catch (error) {
        if (!signal.aborted) {
          setError("Sorry, there was an error fetching flight deals. Please try again later.");
          console.error("Error fetching airport details:", error);
        }
      }
    };

    getAirportDetails();

    return () => controller.abort();
  }, [departure, arrival, date]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-blue-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <SearchBar variant="explore" initialDeparture={departure} initialArrival={arrival} initialDate={date} />
  
      {flights.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-gray-600 text-lg font-semibold">No flights found. Please try different date(s).</p>
        </div>
      ) : (
        flights.map((flight, index) => (
          <div key={index}>
            <FlightCard
              img={flight.legs[0].carriers.marketing[0].logoUrl}  // Airline logo URL
              duration={`${Math.floor(flight.legs[0].durationInMinutes / 60)} hr ${flight.legs[0].durationInMinutes % 60} min`}  // Flight duration
              name={flight.legs[0].carriers.marketing[0].name}  // Airline name
              time={`${new Date(flight.legs[0].departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - 
                   ${new Date(flight.legs[0].arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}
              stop={flight.legs[0].stopCount}
              hnl={flight.legs[0].timeDeltaInDays ? `${flight.legs[0].timeDeltaInDays} day(s) layover` : 'No layover'}
              price={`$${flight.price.formatted.replace('$', '')}`}  // Price formatted
              trip={tripType}  
              origin={originSkyId}
              destination={destinationSkyId}
            />
          </div>
        ))
      )}
    </div>
  );
  
  // return (
  //   <div>
  //       <SearchBar variant="explore" initialDeparture={departure} initialArrival={arrival} initialDate={date} />
      
  //     {flights.map((flight, index) => (
  //       <div key={index}>
  //         <FlightCard
  //           img={flight.legs[0].carriers.marketing[0].logoUrl}  // Airline logo URL

  //           duration={`${Math.floor(flight.legs[0].durationInMinutes / 60)} hr ${flight.legs[0].durationInMinutes % 60} min`}  // Flight duration formatted in hours and minutes

  //           name={flight.legs[0].carriers.marketing[0].name}  // Airline name

  //           time={`${new Date(flight.legs[0].departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - 
  //                ${new Date(flight.legs[0].arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`}

  //           stop={flight.legs[0].stopCount}

  //           hnl={flight.legs[0].timeDeltaInDays ? `${flight.legs[0].timeDeltaInDays} day(s) layover` : 'No layover'}

  //           price={`$${flight.price.formatted.replace('$', '')}`}  // Price, formatted without dollar sign

  //           trip={tripType}  

  //           origin= {originSkyId }

  //           destination = {destinationSkyId}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );

};

export default FlightExplore;

