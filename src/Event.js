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

    const { event } = this.props;

    return (
      <div className='event'>
        <div className='eventOverview'>
          <p>{event.name}</p>
          <p>{event.local_date} @{event.local_time}</p>  
          <p>{event.local_time}</p> 
          <button className='showDetailsButton' onClick={this.handleShowDetails}>Details</button>
        </div>

        <div className='eventDetails'>
          <p>{event.description}</p>
          <button className='hideDetailsButton' onClick={this.handleShowDetails}>Details</button>
        </div>
        
      </div>
    );
  }
}

export default Event;