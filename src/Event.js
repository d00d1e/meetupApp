import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  }

  handleShowDetails = () => {
    if(this.state.showDetails === false) {
      this.setState({ showDetails: true });
    }
    else {
      this.setState({ showDetails: false })
    }
  }
  
  render() {
    const showDetails = this.state.showDetails;
    const { event } = this.props;


    return (
      <div className='event'>
        <div className='eventOverview'>
          <p className='eventDateTime'>{event.local_date} @{event.local_time}</p>
          <p className='eventName'>{event.name}</p>   
          {showDetails && <button className='detailsButton' onClick={this.handleShowDetails}>Hide Details</button>}
          {!showDetails && <button className='detailsButton' onClick={this.handleShowDetails}>Show Details</button>}
        </div>

        {showDetails && 
          <div className='eventDetails'>
            <p className='eventVenue'>{event.venue.name}</p>
            <p className='eventAddress'>{event.venue.address_1}&nbsp;{event.venue.city},{event.venue.state}&nbsp;{event.venue.zip}</p>
          </div>
        }
      </div>
    );
  }
}

export default Event;
