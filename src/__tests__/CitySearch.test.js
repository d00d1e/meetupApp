import React from 'react';
import { shallow } from 'enzyme';

import CitySearch from '../CitySearch';


describe('<CitySearch /> component', () => {
  let CitySearchWrapper;

  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}}/>);
  });
  
  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    const eventObject = { target: { value: 'Berlin' }};
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
    }
  });

  test('click on suggestion should change query state', () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: 'Boston',
          country: 'us',
          localized_country_name: 'USA',
          state: 'MA',
          name_string: 'Boston, Massachusetts',
          zip: '02108',
          lat: 42.36,
          lon: -71.07
        },
        {
          city: 'Boston',
          country: 'gb',
          localized_country_name: 'United Kingdom',
          name_string: 'Boston, Lincolnshire, United Kingdom',
          zip: 'PE21 9DG',
          lat: 52.99,
          lon: -0.02
        }
      ]
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe('Boston, Massachusetts');
  });

});


describe('<CitySearch /> integration', () => {
  test('get a list of cities when user types in a query', async() => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Boston' } });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.state('suggestions')).toEqual([
      {
        city: 'Boston',
        country: 'us',
        localized_country_name: 'USA',
        state: 'MA',
        name_string: 'Boston, Massachusetts',
        zip: '02108',
        lat: 42.36,
        lon: -71.07
      },
      {
        city: 'Boston',
        country: 'gb',
        localized_country_name: 'United Kingdom',
        name_string: 'Boston, Lincolnshire, United Kingdom',
        zip: 'PE21 9DG',
        lat: 52.99,
        lon: -0.02
      }
    ]);
  });

});