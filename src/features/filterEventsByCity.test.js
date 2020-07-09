import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow, mount } from 'enzyme';

import App from '../App';
import CitySearch from '../CitySearch';
import { mockEvents } from '../mock-events';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
  test('When user hasnt searched for a city, show upcoming events based on the users location by default.', ({ given, when, then }) => {
    given('user had not searched for a city', () => {});

    let AppWrapper;
    when('user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('user should see the list of upcoming events from their location', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    let CitySearchWrapper;
    given('main page is opened', () => {
      CitySearchWrapper = shallow(<CitySearch />);
    });

    when('user starts typing in the city text box', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Boston' } });
    });

    then('user should receive a list of cities (suggestions) that match what they\'ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let AppWrapper;
    given('user is typing their city in the city text box', () => {
      AppWrapper = mount(<App />);
      AppWrapper.find('.city').simulate('change', { target: { value: 'Boston '} })
    });

    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('user selects a city from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });

    then('their city should be changed to that city', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Boston, Massachusetts');
    });

    and('user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.event')).toHaveLength(mockEvents.events.length);
    });
  });

});