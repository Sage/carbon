import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';
import TestUtils from 'react/lib/ReactTestUtils';

import Icon from './../icon';
import Link from './link';
import Event from 'utils/helpers/events';

describe('Link', () => {
  let basicLink, disabledLink, customLink, actionLink, spy;

  beforeEach(() => {
    basicLink = TestUtils.renderIntoDocument(
      <Link href='http://app.com/home'>My Link</Link>
    )

    disabledLink = TestUtils.renderIntoDocument(
      <Link href='http://app.com/edit' disabled>My Link</Link>
    )

    customLink = TestUtils.renderIntoDocument(
      <Link className='fancy' href='http://app.com/home'>My Link</Link>
    )

    spy = jasmine.createSpy('click');
    actionLink = TestUtils.renderIntoDocument(
      <Link onClick={ spy }>My Link</Link>
    );
  });

  describe('A basic link', () => {
    it('renders a link with defaults', () => {
      expect(basicLink.props.disabled).toBeUndefined();
    });

    it('renders a link with the provided path', () => {
      expect(basicLink.props.href).toEqual('http://app.com/home');
    });

    it('renders children passed to it', () => {
      expect(basicLink.props.children).toEqual('My Link');
    });
  });

  describe('A disabled link', () => {
    it('renders a link with the disabled attribute', () => {
      expect(disabledLink.props.disabled).toBeTruthy();
    });
  });

  describe("tabbable", () => {
    it("has tabindex by default", () => {
      let wrapper = shallow(<Link href='#'>My Link</Link>);
      expect(wrapper.props()['tabIndex']).toEqual('0');
    });
    it("disabled over-rides tab index setting", () => {
      let wrapper = shallow(<Link href='#' tabbable={ true } disabled={ true }>My Link</Link>);
      expect(wrapper.props()['tabIndex']).toEqual('-1');
    });
    it("doesn't have tab index if it is set to not be tabbable", () => {
      let wrapper = shallow(<Link href='#' tabbable={ false }>My Link</Link>);
      expect(wrapper.props()['tabIndex']).toEqual('-1');
    });
  });

  describe('with an icon', () => {
    it('renders an icon', () => {
      let instance = TestUtils.renderIntoDocument(
        <Link icon="foo">My Link</Link>
      );
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      expect(icon.props.className).toEqual('carbon-link__icon carbon-link__icon--align-left');
      expect(icon.props.type).toEqual('foo');
    });

    it('passes on any tooltip props', () => {
      let instance = TestUtils.renderIntoDocument(
        <Link icon="foo" tooltipMessage='Hi Everybody' tooltipAlign='center'>My Link</Link>
      );
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      expect(icon.props.tooltipMessage).toEqual('Hi Everybody');
      expect(icon.props.tooltipAlign).toEqual('center');
    });

    describe('right aligned link', () => {
      it('renders a right aligned icon', () => {
        let instance = TestUtils.renderIntoDocument(
          <Link icon="foo" iconAlign="right">My Link</Link>
        );
        let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
        expect(icon.props.className).toEqual('carbon-link__icon carbon-link__icon--align-right');
      });
    });
  });

  describe('class names', () => {
    let basicDOM, disabledDOM, customDOM;

    beforeEach(() => {
      basicDOM    = ReactDOM.findDOMNode(basicLink);
      disabledDOM = ReactDOM.findDOMNode(disabledLink);
      customDOM   = ReactDOM.findDOMNode(customLink);
    });

    it('adds a className of carbon-link to all links', () => {
      expect(basicDOM.classList[0]).toEqual('carbon-link__anchor');
      expect(disabledDOM.classList[0]).toEqual('carbon-link__anchor');
    });

    it('adds a disabled class name to a disabled link', () => {
      expect(disabledDOM.classList[1]).toEqual('carbon-link__anchor--disabled');
    });

    it('adds any additional classes passed', () => {
      expect(customDOM.classList[1]).toEqual('fancy');
    });
  });

  describe('additonal props', () => {
    it('consumes additional props', () => {
      let link = ReactDOM.findDOMNode(actionLink);
      TestUtils.Simulate.click(link);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('linkType', () => {
    let instance;

    describe('no url', () => {
      it('returns href type set', () => {
        instance = TestUtils.renderIntoDocument(<Link />);
        expect(instance.linkType).toEqual(instance.linkTypes.href);
      });
    });

    describe('with href and prefix', () => {
      it('returns to type set', () => {
        instance = TestUtils.renderIntoDocument(<Link href="to:/foo" />);
        expect(instance.linkType).toEqual(instance.linkTypes.to);
      });
    });

    describe('with href and no prefix', () => {
      it('returns href type set', () => {
        instance = TestUtils.renderIntoDocument(<Link href="/foo" />);
        expect(instance.linkType).toEqual(instance.linkTypes.href);
      });
    });

    describe('with to and prefix', () => {
      it('returns href type set', () => {
        instance = TestUtils.renderIntoDocument(<Link to="href:/foo" />);
        expect(instance.linkType).toEqual(instance.linkTypes.href);
      });
    });

    describe('with to and no prefix', () => {
      it('returns to type set', () => {
        instance = TestUtils.renderIntoDocument(<Link to="/foo" />);
        expect(instance.linkType).toEqual(instance.linkTypes.to);
      });
    });
  });

  describe('url', () => {
    let instance;

    describe('no url', () => {
      it('returns null', () => {
        instance = TestUtils.renderIntoDocument(<Link />);
        expect(instance.url).toBe(null);
      });
    });

    describe('with a href', () => {
      it('it replaces the prefix', () => {
        instance = TestUtils.renderIntoDocument(<Link href="to:/foo" />);
        expect(instance.url).toBe("/foo");
      });
    });

    describe('with a to', () => {
      it('it replaces the prefix', () => {
        instance = TestUtils.renderIntoDocument(<Link to="href:/foo" />);
        expect(instance.url).toBe("/foo");
      });
    });
  });

  describe('onKeyDown', () => {
    let instance, spy;

    beforeEach(() => {
      spy = jasmine.createSpy('link event');
      instance = TestUtils.renderIntoDocument(<Link />);
    });

    it('calls onKeyDown class method', () => {
      spyOn(instance, 'onKeyDown');
      instance.componentProps.onKeyDown('foo');
      expect(instance.onKeyDown).toHaveBeenCalledWith('foo');
    });

    it('calls original onKeyDown if one is provided', () => {
      instance = TestUtils.renderIntoDocument(<Link onKeyDown={ spy } />);
      instance.onKeyDown('foo');
      expect(spy).toHaveBeenCalledWith('foo');
    });

    describe('an onClick is provided', () => {
      describe('a href if provided', () => {
        it('does not call onClick', () => {
          instance = TestUtils.renderIntoDocument(<Link onClick={ spy } href="#" />);
          spyOn(Event, 'isEnterKey').and.returnValue(true);
          instance.onKeyDown('foo');
          expect(spy).not.toHaveBeenCalled();
        });
      });

      describe('a href is not provided', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(<Link onClick={ spy } />);
        });

        describe('it is not the enter key', () => {
          it('does not call onClick', () => {
            spyOn(Event, 'isEnterKey').and.returnValue(false);
            instance.onKeyDown('foo');
            expect(spy).not.toHaveBeenCalled();
          });
        });

        describe('it is the enter key', () => {
          it('does calls the onClick', () => {
            spyOn(Event, 'isEnterKey').and.returnValue(true);
            instance.onKeyDown('foo');
            expect(spy).toHaveBeenCalledWith("foo");
          });
        });
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<Link to='test' data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'link', 'bar', 'baz');
    });
  });
});
