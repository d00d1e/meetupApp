import { mockEvents } from "./mock-events";

//API mock data
async function getSuggestions(query) {
  return [
    {
      city: 'Boston',
      country: 'us',
      localized_country_name: 'USA',
      state: 'MA',
      name_string: 'Boston, Massachusetts',
      zip: '02108',
      lat: 42.36,
      lon: -71.07
    },
    {
      city: 'Boston',
      country: 'gb',
      localized_country_name: 'United Kingdom',
      name_string: 'Boston, Lincolnshire, United Kingdom',
      zip: 'PE21 9DG',
      lat: 52.99,
      lon: -0.02
    }
  ];
}

async function getEvents(lat, lon) {
  return mockEvents.events;
}

export { getSuggestions, getEvents }; 