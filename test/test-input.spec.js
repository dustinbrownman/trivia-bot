import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import TextInput from '../src/components/text-input';

describe('Component: TextInput', () => {
  it('renders a contenteditable span', () => {
    const wrapper = shallow(
      <TextInput  />
    );

    expect(wrapper.find('span[contenteditable="true"]')).toExist();
  });
});
