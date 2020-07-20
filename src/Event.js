import React, { Component } from 'react';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts';


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
  
  //pie chart data for rsvp
  getData = () => {
    const rsvp = this.props.event.yes_rsvp_count;
    const limit = this.props.event.rsvp_limit;
    const open = limit - rsvp;
    return [{ name: 'Spots Taken', value: rsvp, fill: '#F64060' }, { name: 'Spots Remaining', value: open, fill: '#1F24CC' }]
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
            
            {event.yes_rsvp_count && event.rsvp_limit ? 
              <ResponsiveContainer height={250}>
                <PieChart>
                  <Pie data={this.getData()} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} paddingAngle={3} label />
                    { this.getData().map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                      ))
                    }
                  <Legend iconType="star" verticalAlign="top" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              : null}
            
          </div>
        }
      </div>
    );
  }
}

export default Event;
