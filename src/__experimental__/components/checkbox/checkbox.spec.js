import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import Checkbox from './checkbox.component';
import classicTheme from '../../../style/themes/classic';


function render(props) {
  return TestRenderer.create(<Checkbox { ...props } />);
}

describe('Checkbox', () => {
  describe('base theme', () => {
    it('renders as expected', () => {
      expect(render()).toMatchSnapshot();
    });

    it('renders the appropriate styles when size=large', () => {
      expect(render({ size: 'large' })).toMatchSnapshot();
    });

    it('renders the appropriate styles when checked=true', () => {
      describe('default', () => {
        expect(render({ checked: true })).toMatchSnapshot();
      });

      describe('and disabled=true', () => {
        expect(render({ checked: true, disabled: true })).toMatchSnapshot();
      });
    });

    it('renders the appropriate styles when disabled=true', () => {
      expect(render({ disabled: true })).toMatchSnapshot();
    });

    it('renders the appropriate styles when error=true', () => {
      expect(render({ error: true })).toMatchSnapshot();
    });

    it('renders the appropriate styles when fieldHelpInline=true', () => {
      describe('default', () => {
        expect(render({ fieldHelpInline: true })).toMatchSnapshot();
      });

      describe('and size=large', () => {
        expect(render({ fieldHelpInline: true, size: 'large' })).toMatchSnapshot();
      });
    });

    it('renders the appropriate styles when setting a custom inputWidth', () => {
      describe('default', () => {
        expect(render({ inputWidth: 50 })).toMatchSnapshot();
      });

      describe('reversed', () => {
        expect(render({ inputWidth: 50, reverse: true })).toMatchSnapshot();
      });
    });

    it('renders the appropriate styles when setting a custom labelWidth', () => {
      expect(render({ labelWidth: 50 })).toMatchSnapshot();
    });

    it('renders the appropriate styles when reverse=true', () => {
      describe('default', () => {
        expect(render({ reverse: true })).toMatchSnapshot();
      });

      describe('and fieldHelpInline=true', () => {
        expect(render({ fieldHelpInline: true, reverse: true })).toMatchSnapshot();
      });
    });
  });

  describe('Classic theme', () => {
    const opts = { theme: classicTheme };

    it('renders as expected', () => {
      expect(render(opts)).toMatchSnapshot();
    });

    it('renders the appropriate styles when checked=true', () => {
      describe('default', () => {
        expect(render({ checked: true, ...opts })).toMatchSnapshot();
      });

      describe('and disabled=true', () => {
        expect(render({ checked: true, disabled: true, ...opts })).toMatchSnapshot();
      });
    });

    it('renders the appropriate styles when disabled=true', () => {
      expect(render({ disabled: true, ...opts })).toMatchSnapshot();
    });

    it('renders the appropriate styles when fieldHelpInline=true and reverse=true', () => {
      expect(render({ fieldHelpInline: true, reverse: true, ...opts })).toMatchSnapshot();
    });
  });
});
