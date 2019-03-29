import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CloseIcon from './close-icon.component';
import 'jest-styled-components';

import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import classicTheme from '../../style/themes/classic';
import classicConfig from './message-classic-config.style';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

function render(props) {
  return TestRenderer.create(<CloseIcon { ...props } />);
}

describe('CloseIcon', () => {
  describe('when rendered', () => {
    it('should match snapshot', () => {
      expect(render()).toMatchSnapshot();
    });

    it('should exist', () => {
      const wrapper = shallow(<CloseIcon />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe('when in classic mode', () => {
    OptionsHelper.colors.forEach((messageType) => {
      it('should render close icon in a proper color', () => {
        const wrapper = render({ theme: classicTheme, type: messageType });
        assertStyleMatch(
          {
            color: classicConfig[messageType].color
          },
          wrapper.toJSON()
        );
      });
    });
  });
});
