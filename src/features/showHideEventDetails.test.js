import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockEvents } from '../mock-events';


const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events had been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });

    when('user did not click show details button', () => { });

    then('event elements will be collapsed', () => {
      expect(AppWrapper.find('showDetails')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events had been loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });

    when('user clicks show details button', () => {
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
    });

    then('the event element should expand and show details of that event', () => {
      expect(AppWrapper.find('.event .eventDetails')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the event element is expanded', () => {
      AppWrapper.update();
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
      expect(AppWrapper.find('.event .eventDetails')).toHaveLength(1);
    });

    when('user clicks hide details button', () => {
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
    });

    then('the event element should collapse', () => {
      expect(AppWrapper.find('.event .eventDetails')).toHaveLength(0);
    });
  });  
});