import axios from 'axios';
import { mockEvents } from "./mock-events";

//API mock data
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

  //returns mock data if app hosted on localhost
  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}


async function getEvents(lat, lon) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }
  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + '&access_token=' + token;
    //lat, lon is optional
    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }
    const result = await axios.get(url);
    return result.data.events;
  }
}

//no access token found in local storage
const accessToken = localStorage.getItem('access_token');
if (!accessToken) {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  if (!code) {
    window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=2qcpv2mnc7iv1ndsj5smev2qhd&response_type=code&redirect_uri=https://d00d1e.github.io/meetupApp';
      return null;
    }
    return getOrRenewAccessToken('get', code);
}

//access token found in local storage, check validity
const lastSavedTime = localStorage.getItem('last_saved_time');
if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
  return accessToken;
}

//renew access token
const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    //Lambda endpoint to get token by code
    url = 'https://kadzv17gb7.execute-api.us-west-1.amazonaws.com/dev/api/token/'
      + key;
  } else if (type === 'renew') {
    //Lambda endpoint to get token by refresh_token
    url = 'https://kadzv17gb7.execute-api.us-west-1.amazonaws.com/dev/api/refresh/'
      + key;
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



export { getSuggestions, getEvents }; 