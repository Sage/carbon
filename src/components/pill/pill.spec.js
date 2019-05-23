import React from 'react';
import 'jest-styled-components';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs/tags-specs';
import Pill from './pill.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

const styleTypes = [
  'default',
  'disabled',
  'error',
  'help',
  'info',
  'maintenance',
  'new',
  'success',
  'warning'
];

const styleConfig = {
  disabled: {
    color: '#CCD6DA',
    bgColor: '#CCD6DA'
  },
  default: {
    color: '#335B6D',
    bgColor: '#335B6D',
    hoverBgColor: '#004b87',
    hoverColor: '#FFFFFF'
  },
  error: {
    color: '#C7384F',
    bgColor: '#C7384F',
    hoverBgColor: '#C11E20',
    hoverColor: '#FFFFFF'
  },
  help: {
    color: '#FFAB00',
    bgColor: '#FFAB00',
    hoverBgColor: '#FFDA7F',
    hoverColor: '#FFFFFF'
  },
  info: {
    color: '#1573E6',
    bgColor: '#1573E6',
    hoverBgColor: '#1573E6',
    hoverColor: '#FFFFFF'
  },
  maintenance: {
    color: '#FF7D00',
    bgColor: '#FF7D00',
    hoverBgColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  warning: {
    color: '#FF7D00',
    bgColor: '#FF7D00',
    hoverBgColor: '#FF5400',
    hoverColor: '#FFFFFF'
  },
  new: {
    color: '#663399',
    bgColor: '#663399',
    hoverBgColor: '#E0D6EB',
    hoverColor: '#FFFFFF'
  },
  success: {
    color: '#50B848',
    bgColor: '#50B848',
    hoverBgColor: '#4782F7',
    hoverColor: '#FFFFFF'
  }
};

const render = (props, renderer = mount) => {
  return renderer(
    <Pill { ...props } />
  );
};
describe('Pill', () => {
  describe('when the children prop is passed to the component', () => {
    let instance, pill;
    beforeEach(() => {
      instance = render({
        children: 'My Text'
      });
      pill = instance.find('span').hostNodes();
    });
    it('renders a span tag with the given children', () => {
      expect(pill.length).toEqual(1);
      expect(pill.props().children[0]).toEqual('My Text');
    });

    it('does not render a close icon', () => {
      expect(pill.props().onClick).toEqual(null);
    });

    it('matches the expected styles for a default pill', () => {
      const wrapper = render({ children: 'My Text' }, TestRenderer.create).toJSON();
      assertStyleMatch({
        borderRadius: '10px',
        display: 'inline-block',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.7px',
        lineHeight: '15px',
        padding: '2px 7px',
        position: 'relative',
        textAlign: 'center'
      }, wrapper);
    });
  });

  describe('when the component is deletable', () => {
    describe('onDelete adds "close" icon to component', () => {
      let wrapper, icon;
      const spy = jest.fn();

      beforeEach(() => {
        wrapper = shallow(
          <Pill
            onDelete={ spy }
          >
            My Text
          </Pill>
        );
      });

      it('includes "close" icon when onDelete prop passed', () => {
        icon = wrapper.find('[data-element="close"]');
        expect(icon.exists()).toBeTruthy();
        expect(icon.length).toEqual(1);
      });

      it('triggers the click when the icon is clicked', () => {
        wrapper.find('[data-element="close"]').simulate('click');
        expect(spy).toHaveBeenCalled();
      });

      it('does not include "close" icon when onDelete prop not passed', () => {
        wrapper = shallow(
          <Pill>
            My Text
          </Pill>
        );
        icon = wrapper.find('[data-element="close"]');
        expect(icon.exists()).toBeFalsy();
        expect(icon.length).toEqual(0);
      });
    });
    it('adds adds a click handler to the component', () => {
      const spy = jest.fn();
      const instance = render({
        children: 'My Text',
        onClick: spy
      });
      const pill = instance.find('span').hostNodes();

      pill.simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('matches the expected styles for a deletable pill', () => {
      const wrapper = render({ children: 'My Text', onDelete: jest.fn() }, TestRenderer.create).toJSON();
      assertStyleMatch({
        padding: '2px 19px 2px 7px'
      }, wrapper);
    });
  });

  describe.each(styleTypes)(
    'when the pill style is set as "%s"',
    (style) => {
      const wrapper = render({
        children: 'My Text',
        as: style
      });

      const colourSet = styleConfig[style];

      it(`matches the expected styling for ${style}`, () => {
        assertStyleMatch({
          border: `1px solid ${colourSet.color}`,
          color: colourSet.color
        }, wrapper);
      });

      describe('when the component is in a filled state', () => {
        const fillWrapper = render({
          children: 'My Text',
          as: style,
          fill: true
        });
        it(`matches the expected filled styling for ${style}`, () => {
          assertStyleMatch({
            backgroundColor: colourSet.color
          }, fillWrapper);
        });
      });
    }
  );

  describe('when there are custom tags on the component', () => {
    const wrapper = shallow(
      <Pill
        data-element='bar'
        data-role='baz'
      >
        My Text
      </Pill>
    );

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'pill', 'bar', 'baz');
    });
  });
});
