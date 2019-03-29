import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import TypeIcon from './type-icon.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import classicConfig from './message-classic-config.style';
import OptionsHelper from '../../utils/helpers/options-helper';

function render(props) {
  return shallow(<TypeIcon { ...props } />);
}

function renderStyle(props) {
  return TestRenderer.create(<TypeIcon { ...props } />);
}

describe('TypeIcon', () => {
  describe('when rendered', () => {
    it('should match snapshot', () => {
      expect(render()).toMatchSnapshot();
    });
  });
});
