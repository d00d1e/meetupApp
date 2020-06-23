import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

describe('<Event /> component', () => {
  test('render event component', () => {
    const EventWrapper = shallow(<Event />);
    expect(EventWrapper.find(Event)).toHaveLength(4);
  });
});