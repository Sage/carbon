import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Icon from './icon';
import Tooltip from 'components/tooltip'

describe('Icon', () => {
  let instance, span, svg;

  describe('renderIcon', () => {
    it('calls the render warning icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='warning' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--warning");
    });

    it('calls the render new icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='new' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--new");
    });

    it('calls the render maintenance icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='maintenance' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--maintenance");
    });

    it('calls the render sort down icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='sort-down' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--sort-down");
    });

    it('calls the render sort up icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='sort-up' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--sort-up");
    });

    it('calls the render refresh icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='refresh' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--refresh");
    });

    it('calls the render bin icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='bin' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--bin");
    });

    it('calls the render basket icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='basket' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--basket");
    });

    it('calls the render processing icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='processing' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--processing");
    });

    it('calls the render phone icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='phone' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--phone");
    });

    it('calls the render mobile icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='mobile' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--mobile");
    });

    it('calls the render location icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='location' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--location");
    });

    it('calls the render email icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='email' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--email");
    });

    it('calls the render minus icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='minus' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--minus");
    });

    it('calls the render minus icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='plus' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--plus");
    });

    it('calls the render business icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='business' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--business");
    });

    it('calls the render individual icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='individual' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--individual");
    });

    it('calls the render external link icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='external-link' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--external-link");
    });

    it('calls the render edit icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='edit' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--edit");
    });

    it('calls the render white tick method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='white-tick' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--white-tick");
    });

    it('calls the render peperclip icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='paperclip' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--paperclip");
    });

    it('calls the render help icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='help' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--help");
    });

    it('calls the render chevron icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='chevron' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--chevron");
    });

    it('calls the render information icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='information' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--information");
    });

    it('calls the render sync icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='sync' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--sync");
    });

    it('calls the render progress icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='progress' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--progress");
    });

    it('calls the render submitted icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='submitted' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--submitted");
    });

    it('calls the render completed icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='completed' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--completed");
    });

    it('calls the render pdf icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='pdf' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--pdf");
    });

    it('calls the render csv icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='csv' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--csv");
    });

    it('calls the render print icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='print' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--print");
    });

    it('calls the render message icon method', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='message' />);
      instance.renderIcon;
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[1];
      svg = span.children[0];
      expect(svg.getAttribute('class')).toEqual("ui-icon__svg ui-icon__svg--message");
    });
  });

  describe('success', () => {
    it('renders with an icon of tick', () => {
      instance = TestUtils.renderIntoDocument(<Icon type='success' />);
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
      expect(span.className).toEqual('ui-icon icon-tick');
    });
  });

  describe('with no additional options', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(<Icon type='foo' />);
      span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
    });

    it('renders with a class of icon-settings', () => {
      expect(span.className).toEqual('ui-icon icon-foo');
    });
  });

  describe ('mainClasses', () => {
    describe('with custom class name', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(<Icon type='foo' className='custom' />);
        span = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0];
      });

      it('renders with a class of icon-settings and test', () => {
        expect(span.className).toEqual('ui-icon custom icon-foo');
      });
    });
  });

  describe('when passed a tooltipMessage', () => {
    it('renders a tooltip', () => {
      let helpInstance = TestUtils.renderIntoDocument(<Icon type='info' tooltipMessage='Helpful content' />);
      let tooltip = TestUtils.findRenderedComponentWithType(helpInstance, Tooltip);
      expect(tooltip).toBeDefined();
    });
  });
});
