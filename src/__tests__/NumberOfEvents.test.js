import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render NumberOfEvents element', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEventsInput')).toHaveLength(1);
  });

  test('set default number of events to 32', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
  
  test('render value of number input', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')).toBe(numberOfEvents);
  });

  test('change state when number input changes', () => {
    const eventNumber = { target: { value: 10 }};
    NumberOfEventsWrapper.find('.numberOfEventsInput').simulate('change', eventNumber);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);  
  });

});