import axios from 'axios';
import { mockEvents } from "./mock-events";


async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
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
  const token = await getAccessToken();
  if (token) {
    const url = `https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=${query}&access_token=${token}`;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
};


async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }
  //check offline status
  if(!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return JSON.parse(events);
  }

  const token = await getAccessToken();
  if (token) {
    let url = `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&access_token=${token}`;
    //optional params
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    if (lat && lon && page) {
      url += `&lat=${lat}&lon=${lon}&page=${page}`;
    }
    
    const result = await axios.get(url);
    const events = result.data.events;
    if(events.length) {
      localStorage.setItem('lastEvents', JSON.stringify(events));
    }
    return events
  }
  return [];
}


async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    //Lambda endpoint to get token by code
    url = 'https://cicwn5zwcg.execute-api.us-west-1.amazonaws.com/dev/api/token/' + key;
  } else if (type === 'renew') {
    //Lambda endpoint to get token by refresh_token
    url = 'https://cicwn5zwcg.execute-api.us-west-1.amazonaws.com/dev/api/refresh/' + key;
  }
  //use Axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);
  // Save tokens to localStorage together with a timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());
  //return the access_token
  return tokenInfo.data.access_token;
}


async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  //if no access token found in local storage
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=2qcpv2mnc7iv1ndsj5smev2qhd&response_type=code&redirect_uri=https://d00d1e.github.io/meetupApp';
        return null;
      }
      return getOrRenewAccessToken('get', code);
  }
  //if access token found in local storage, check validity
  const lastSavedTime = localStorage.getItem('last_saved_time');
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }
  //renew access token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}


export { getSuggestions, getEvents, getAccessToken }; 