import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';


describe('<Event /> component', () => {
  let EventWrapper;
  
  beforeAll(() => {
    const event = {
        created: 1585135569000,
        duration: 7200000,
        id: "dskbrrybcjbnc",
        name: "Tuesday Night Street Skate RESUMES AFTER COVID-19",
        date_in_series_pattern: false,
        status: "upcoming",
        time: 1593558000000,
        local_date: "2020-06-30",
        local_time: "19:00",
        updated: 1585135569000,
        utc_offset: -14400000,
        waitlist_count: 0,
        yes_rsvp_count: 1,
        venue: {
          id: 931749,
          name: "Esplanade at the Hatch Shell",
          lat: 42.3526725769043,
          lon: -71.08594512939453,
          repinned: true,
          address_1: "Storrow Drive",
          city: "Boston",
          country: "us",
          localized_country_name: "USA",
          phone: "617.869.8786",
          zip: "02116",
          state: "MA"
        },
        is_online_event: false,
        group: {
          created: 1304565875000,
          name: "Skate Boston (former Inline Club of Boston)",
          id: 1825218,
          join_mode: "open",
          lat: 42.36000061035156,
          lon: -71.05999755859375,
          urlname: "skateboston",
          who: "Skaters",
          localized_location: "Boston, MA",
          state: "MA",
          country: "us",
          region: "en_US",
          timezone: "US/Eastern"
      },
        link: "https://www.meetup.com/skateboston/events/dskbrrybcjbnc/",
        description: '<p><img src="http://photos2.meetupstatic.com/photos/event/7/4/4/f/600_450449775.jpeg" /></p> <p>As we like to say “the best way to see the City of Boston is on your skates!”.</p> <p>Weather permitting, every Tuesday night, Skate Boston skaters enjoy an 11 to 12-mile skating adventure on the streets of Boston and the surrounding communities. Charlestown, South Boston, Brookline, Cambridge, and Somerville are all regular destinations as well as Downtown Boston, the Back Bay and Boston’s scenic Water Front. If you have never seen the city while on your skates, you are in for a treat.</p> <p>If you are wondering about your ability to participate in this event here are some important things to consider.</p> <p>Depending on the time of year some or most of this skate will be in the dark. Although many parts of the city are well lit some are not. A good helmet light can be a great help but it is still important to be comfortable with the darkness at times.</p> <p>We regularly skate in traffic which, at times, can be quite heavy. If you are not comfortable skating near moving automobiles this may not be for you.</p> <p>The skate does occasionally go down some rather large hills. Although we try to choose the safest descents available you still need to be comfortable going downhill.</p> <p>You will need to have excellent stopping skills. Sometimes it is hard to know when exactly you will have to stop so dependable stopping skills are really a must.</p> <p>You will need to be able to negotiate a large variety of road obstacles. Curbs, sand, hydrants, pedestrians and substandard pavement are all common.</p> <p>We highly recommend that you wear all protective gear.</p> <p>If you have any specific questions you can contact Neil Wetzler at [masked] and we will respond as quickly as possible.</p> <p>If you are an experienced skater with little or no experience skating in the streets you may want to consider first trying the Sunday Morning City Skate (<a href="http://icbskates.org/skate-with-us/sunday-morning-skate" class="linkified">http://icbskates.org/skate-with-us/sunday-morning-skate</a>) to get started in a more relaxed and low key environment. It’s a great skate and you will meet plenty of people that will be happy to tell you everything you want to know about the Tuesday night skate.</p> <p>We meet every Tuesday night (weather permitting) around 7:00 at the Hatch Shell. The skate departs at 7:30 and is usually between 1:45 and 2 hours. As previously stated the distance covered is between 11 and 12 miles. Post skate we retire to the Hill Tavern on Cambridge St. in Beacon Hill for food and drinks. Weekly announcements for the skate are broadcast on Monday and will appear on the Skate Boston mailing list, Facebook page (<a href="https://www.facebook.com/groups/6281411823/" class="linkified">https://www.facebook.com/groups/6281411823/</a>) and Meetup page (<a href="http://www.meetup.com/skateboston/" class="linkified">http://www.meetup.com/skateboston/</a>).</p> <p>Participants must wear helmets and wrist guards, and complete safety gear is encouraged. The skate will be cancelled due to rain or other bad weather. Cancellations may or may not be posted to our mailing list (<a href="https://groups.yahoo.com/neo/groups/icb_announce/info" class="linkified">https://groups.yahoo.com/neo/groups/icb_announce/info</a>).</p> <p>Check out the skills necessary for this event in our Skate Skills (<a href="http://icbskates.org/skate-with-us/skating-skills" class="linkified">http://icbskates.org/skate-with-us/skating-skills</a>) page.</p> <p>We hope to see you out some Tuesday soon!</p> ',
        visibility: "public",
        member_pay_fee: false
      }
    EventWrapper = shallow(<Event event={event}/>);
  });

  test('render event component', () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test('render event element', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });
  
  //event overview
  test('render event overview', () => {
    expect(EventWrapper.find('.eventOverview')).toHaveLength(1);
  });

  test('render event overview contents', () => {
    expect(EventWrapper.find('.eventOverview').children()).toHaveLength(3);
  });

  //event details
  test('render event details', () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.eventDetails')).toHaveLength(1);
  });

  test('render event details content', () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.eventDetails').children()).toHaveLength(2);
  });

  //show/hide details button
  test('render detailsButton', () => {
    expect(EventWrapper.find('.detailsButton')).toHaveLength(1);
  });

  test('click on detailsButton should show event details', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true)
  });

});
