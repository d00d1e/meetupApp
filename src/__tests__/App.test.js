import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockEvents } from '../mock-events';


describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render EventList component', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});


describe('<App /> integration', () => {
  test('get list of events after user selects a city', async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClicked('value', 42.36, -71.07);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(42.36, -71.07);
    // AppWrapper.unmount();
  });

  test('update list of events after user changes target number of events to view', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.instance().handleNumberChanged({ target: { value: 1 } });
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(null, null, 1);
    // AppWrapper.unmount();
  });

  test('change state with the updated list of events', async () => {
    const AppWrapper = shallow(<App />);
    AppWrapper.instance().updateEvents(1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state('events')).toEqual(mockEvents.events);
    // AppWrapper.unmount();
  });

  test('render correct list of events', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ events: [{ id: 1 }, { id: 2 }, { id: 3 }, {id: 4} ]});
    expect(AppWrapper.find('.event')).toHaveLength(4);
    // AppWrapper.unmount();
  });
});