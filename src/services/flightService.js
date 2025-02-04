import axios from "axios";
import flightdata from "../data/sample-flight-data.json";
import { API_ENDPOINTS } from "../config/api";


const API_HEADERS = {
    'x-rapidapi-key': 'ba4be2c092msh0ab56b220e0b0bfp1d0262jsn0ed79e3c0763',
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
};

export const fetchFlightDeals = async (params) => {
  try {
    
    const response = await axios.get(API_ENDPOINTS.FLIGHT_SEARCH, {
      headers: API_HEADERS,
      params,
    });
    return response.data;
    // return flightdata;
  } catch (error) {
    console.error("Error fetching flight deals:", error);
    return null;
  }
};

export const fetchAirportDetails = async (params) => {
  try {
    const response = await axios.get(API_ENDPOINTS.AIRPORT_SEARCH, {
      headers: API_HEADERS,
      params,
    });
    // console.log(response.data.data[0]);
    return {
      skyId: response.data.data[0].skyId, 
      entityId: response.data.data[0].entityId
    };
  } catch (error) {
    console.error("Error fetching airport details:", error);
    return null;
  }
};




// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails',
//   params: {
//     legs: '"[{"destination":"LOND","origin":"LAXA","date":"2024-04-11"}]"',
//     adults: '1',
//     currency: 'USD',
//     locale: 'en-US',
//     market: 'en-US',
//     cabinClass: 'economy',
//     countryCode: 'US'
//   },
//   headers: {
//     'x-rapidapi-key': 'b9200725famsh94b6fa9c1e3f001p11abc4jsn8aa047baf56c',
//     'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }