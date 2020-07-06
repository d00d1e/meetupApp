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
            <p className='eventGroup'>{event.group.name}</p>
            <p className='eventLink'>{event.link}</p>
            <p className='eventRsvp'>{event.yes_rsvp_count}&nbsp;attending</p>
          </div>
        }
      </div>
    );
  }
}

export default Event;
