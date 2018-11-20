import React from 'react';
import { shallow } from 'enzyme';
import PlayArea from './play-area';

describe('<PlayArea />', () => {
  let playArea;

  beforeAll(() => {
    playArea = shallow(
      <PlayArea />
    );
  });

  test('basic render', () => {
    expect(playArea).toMatchSnapshot();
  });
});
