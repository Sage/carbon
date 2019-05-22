import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import DismissButton from './dismiss-button.component';
import { DismissButtonStyle, LinkStyle } from './dismiss-button.style';
import 'jest-styled-components';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import classicTheme from '../../style/themes/classic';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

function render(props) {
  return TestRenderer.create(<DismissButtonStyle { ...props } />);
}

describe('DismissButton', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      expect(shallow(<DismissButton />)).toHaveLength(1);
    });
  });

  describe('when render with no additional props', () => {
    OptionsHelper.messages.forEach((variant) => {
      it(`should match snapshot for ${variant}`, () => {
        const wrapper = render({ variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

describe('when in classic mode', () => {
  OptionsHelper.colors.forEach((variant) => {
    describe(`when rendered as ${variant}`, () => {
      it('should match the snapshot', () => {
        const wrapper = render({ variant, theme: classicTheme });
        expect(wrapper).toMatchSnapshot();
      });

      describe('when transparent prop is set to true', () => {
        it('should apply transparent background', () => {
          const wrapper = render({
            transparent: true,
            theme: classicTheme,
            variant
          });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });
});

describe('LinkStyle', () => {
  it('applies peoper styling when focused', () => {
    const wrapper = TestRenderer.create(<LinkStyle />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('DismissButtonStyle', () => {
  it('should render correct style based on classic theme', () => {
    assertStyleMatch({
      backgroundColor: 'transparent'
    }, mount(<DismissButtonStyle transparent theme={ classicTheme } />));
  });
});
