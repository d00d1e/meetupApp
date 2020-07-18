import React, { Component } from 'react';
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
    window.addEventListenter('online', this.offLineAlert())
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
      this.setState({ alertText: 'You are offline, please connect to internet for an updated list' });
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
  };

  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <OfflineAlert text={this.state.alertText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}
         
export default App;