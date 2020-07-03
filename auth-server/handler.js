// 'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=2qcpv2mnc7iv1ndsj5smev2qhd'
    + '&client_secret=lq1mh125711rojai0rtpl276oe'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://d00d1e.github.io/meetupApp'
    + '&code=' + event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    })
  };
};

module.exports.getRefreshToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=2qcpv2mnc7iv1ndsj5smev2qhd'
    + '&client_secret=lq1mh125711rojai0rtpl276oe'
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.code;
  
  const info = await axios.post(MEETUP_OAUTH_URL);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    })
  };
}