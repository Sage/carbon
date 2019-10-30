import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { css } from 'styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import Icon from '../../../components/icon';
import Loader from '../../../components/loader/loader.component';
import SwitchSlider from './switch-slider.component';
import SwitchSliderPanel from './switch-slider-panel.style';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import mediumTheme from '../../../style/themes/medium';

function render(props) {
  return TestRenderer.create(<SwitchSlider { ...props } />);
}

describe('SwitchSlider', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    describe('Panel content', () => {
      describe('default', () => {
        const panels = render().root.findAllByType(SwitchSliderPanel);

        it('renders the text "OFF" in the panel', () => {
          expect(panels[0].props.children).toBe('OFF');
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });

      describe('when checked=true', () => {
        const panels = render({ checked: true }).root.findAllByType(SwitchSliderPanel);

        it('renders the text "ON" in the panel', () => {
          expect(panels[0].props.children).toBe('ON');
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });

      describe('when loading=true', () => {
        const panels = render({ loading: true }).root.findAllByType(SwitchSliderPanel);

        it('renders a Loader in the first panel', () => {
          expect(panels[0].props.children.type).toBe(Loader);
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });
    });

    describe('when checked=true', () => {
      const wrapper = render({ checked: true }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: baseTheme.colors.primary
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          transform: 'translateX(36px)'
        }, wrapper, { modifier: '::before' });
      });
    });

    describe('when disabled=true', () => {
      const wrapper = render({ disabled: true }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: baseTheme.disabled.background
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          opacity: '0.8'
        }, wrapper, { modifier: '::before' });
      });

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: baseTheme.disabled.disabled
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });

    describe('when checked=true && disabled=true', () => {
      const wrapper = render({ checked: true, disabled: true }).toJSON();

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: baseTheme.colors.white
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });

    describe('when size=large', () => {
      describe('default', () => {
        const wrapper = render({ size: 'large' }).toJSON();

        it('applies the correct ::before styles', () => {
          assertStyleMatch({
            height: '36px',
            width: '36px'
          }, wrapper, { modifier: '::before' });
        });
      });

      describe('and checked=true', () => {
        const wrapper = render({ checked: true, size: 'large' }).toJSON();

        it('applies the correct ::before styles', () => {
          assertStyleMatch({
            transform: 'translateX(38px)'
          }, wrapper, { modifier: '::before' });
        });
      });
    });
  });

  describe('Classic theme', () => {
    const opts = { theme: classicTheme };

    describe('Panel content', () => {
      describe('default', () => {
        const panels = render(opts).root.findAllByType(SwitchSliderPanel);

        it('renders a cross Icon in the panel', () => {
          expect(panels[0].props.children.type).toBe(Icon);
          expect(panels[0].props.children.props.type).toBe('cross');
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });

      describe('when checked=true', () => {
        const panels = render({ checked: true, ...opts }).root.findAllByType(SwitchSliderPanel);

        it('renders a tick Icon in the panel', () => {
          expect(panels[0].props.children.type).toBe(Icon);
          expect(panels[0].props.children.props.type).toBe('tick');
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });

      describe('when loading=true', () => {
        const panels = render({ loading: true, ...opts }).root.findAllByType(SwitchSliderPanel);

        it('renders a Loader in the panel', () => {
          expect(panels[0].props.children.type).toBe(Loader);
        });

        it('renders only one panel', () => {
          expect(panels.length).toBe(1);
        });
      });
    });

    describe('default', () => {
      const wrapper = render(opts).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: '#003349',
          borderRadius: '24px',
          height: '28px',
          width: '55px'
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          borderRadius: '50%',
          boxShadow: '0 2px 3px 0 rgba(0,0,0,.3)',
          height: '23px',
          top: '2px',
          transition: 'transform .25s ease',
          width: '23px'
        }, wrapper, { modifier: '::before' });
      });
    });

    describe('and checked=true', () => {
      const wrapper = render({ checked: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: classicTheme.colors.baseBlue
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          transform: 'translateX(28px)'
        }, wrapper, { modifier: '::before' });
      });
    });

    describe('and loading=true', () => {
      const wrapper = render({ loading: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          opacity: '0.6'
        }, wrapper);
      });
    });
  });

  describe('Small theme', () => {
    const opts = { theme: smallTheme };

    describe('default', () => {
      const wrapper = render(opts).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.switch.off
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.colors.white
        }, wrapper, { modifier: '::before' });
      });
    });

    describe('and checked=true', () => {
      const wrapper = render({ checked: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.colors.primary
        }, wrapper);
      });
    });

    describe('and disabled=true', () => {
      const wrapper = render({ disabled: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.disabled.background
        }, wrapper);
      });

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: smallTheme.disabled.disabled
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });

    describe('when checked=true && disabled=true', () => {
      const wrapper = render({ checked: true, disabled: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: smallTheme.colors.disabled
        }, wrapper);
      });

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: smallTheme.colors.white
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });
  });

  describe('Medium theme', () => {
    const opts = { theme: mediumTheme };

    describe('default', () => {
      const wrapper = render(opts).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.switch.off
        }, wrapper);
      });

      it('applies the correct ::before styles', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.colors.white
        }, wrapper, { modifier: '::before' });
      });
    });

    describe('and checked=true', () => {
      const wrapper = render({ checked: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.colors.primary
        }, wrapper);
      });
    });

    describe('and disabled=true', () => {
      const wrapper = render({ disabled: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.disabled.background
        }, wrapper);
      });

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: mediumTheme.disabled.disabled
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });

    describe('when checked=true && disabled=true', () => {
      const wrapper = render({ checked: true, disabled: true, ...opts }).toJSON();

      it('applies the correct base styles', () => {
        assertStyleMatch({
          backgroundColor: mediumTheme.colors.disabled
        }, wrapper);
      });

      it('applies the correct SwitchSliderPanel styles', () => {
        assertStyleMatch({
          color: mediumTheme.colors.white
        }, wrapper, { modifier: css`${SwitchSliderPanel}` });
      });
    });
  });
});
