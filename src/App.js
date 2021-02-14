import React, { Component } from 'react';
import moment from 'moment';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { OfflineAlert } from './Alert';


class App extends Component {
  //load a list of events by default
  componentDidMount() {
    getEvents().then(response => this.setState({ events: response }));
    window.addEventListener('online', this.offlineAlert());
  }

  state = {
    events: [],
    lat: null,
    lon: null,
    page: null,
    alertText: ''
  }

  offlineAlert = () => {
    if(navigator.onLine === false) {
      this.setState({ alertText: 'You are currently offline, please connect to internet for an updated list' });
    } else {
      this.setState({ alertText: '' });
    }
  }

  updateEvents = (lat, lon, page) => {
    if (lat && lon) {
      getEvents(lat, lon, this.state.page).then(events => this.setState({ events, lat, lon }));
    } else if (page) {
      getEvents(this.state.lat, this.state.lon, page).then(events => this.setState({ events, page }));
    } else {
      getEvents(this.state.lat, this.state.lon, this.state.page).then(events => this.setState({ events }));
    }
  }

  countEventsOnADate = (date) => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
    }
    return count;
  }

  //get correctly formatted date for upcomimng 7 days
  getData = () => {
    const next7Days = [];
    const currentDate = moment();
    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, 'days');
      const dateString = currentDate.format('MM-DD-YYYY');
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count });
    }
    return next7Days;
  }

  render() {
    return (
      <div className="App">
        <div className="app__header">
          <img
            src="https://secure.meetupstatic.com/s/img/5455565085016210254/logo/svg/logo--script.svg"
            alt="logo"
          />
          <sup>too!</sup>
        </div>
        <div className="divider-container">
          <div className="divider-header">
            <h1>Find your next event</h1>
          </div>
          <div className="divider-content">
            <CitySearch updateEvents={this.updateEvents} />
            <NumberOfEvents updateEvents={this.updateEvents} />
          </div>
        </div>
        <div className="offline-alert">
          <OfflineAlert text={this.state.alertText} />
        </div>
        <ResponsiveContainer className="scatter-chart" height={350} >
          <ScatterChart margin={{ top: 20, right: 200, bottom: 20, left: 180 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#F96969" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;