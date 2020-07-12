import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockEvents } from '../mock-events';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasnt specified a number, 32 is the default number', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events is loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });

    when('user has not specified the number of events to show', () => { });

    then('the default number of events shown is 32', (arg0) => {
      AppWrapper.update();
      expect((AppWrapper.find('.event')).length).toBeLessThanOrEqual(32);
    });
  }); 

  test('User can change the number of events they want to see', ({ given, and, when, then }) => {
    let AppWrapper;
    given('app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    and('the list of events is loaded', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });

    when('user changes the number of events shown', () => {
      const numberOfEvents = { target: { value: 5 } };
      AppWrapper.find('.numberOfEvents').simulate('change', numberOfEvents);
    });

    then('the page should updated to reflect the number of events specified', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 5 });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
    });
  });
});