import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Help from './help.js';
import Icon from 'components/icon';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Help', () => {
  let basicInstance, positionedInstance, alignedInstance, customStyleInstance, linkInstance;

  beforeEach(() => {
    basicInstance = TestUtils.renderIntoDocument(
      <Help>Helpful Content</Help>
    );

    positionedInstance = TestUtils.renderIntoDocument(
      <Help tooltipPosition='right'>Helpful Content</Help>
    );

    alignedInstance = TestUtils.renderIntoDocument(
      <Help pointerAlign='left'>Helpful Content</Help>
    );

    customStyleInstance = TestUtils.renderIntoDocument(
      <Help className='fancy-pants'>Helpful Content</Help>
    );

    linkInstance = TestUtils.renderIntoDocument(
      <Help href='www.foo.com'>Helpful Content</Help>
    );
  });

  describe('mainClasses', () => {
    describe('default classes', () => {
      it('returns the default classes', () => {
        expect(basicInstance.mainClasses).toEqual('carbon-help');
      });

      describe('when an href is passed', () => {
        it('adds the relevant class', () => {
          expect(linkInstance.mainClasses).toEqual('carbon-help carbon-help__href');
        });
      });
    });

    describe('when custom classes are passed', () => {
      it('adds the custom classes', () => {
        expect(customStyleInstance.mainClasses).toEqual('carbon-help fancy-pants');
      });
    });
  });

  describe('render', () => {
      let icon, positionedIcon, alignedIcon, hrefAnchor;

    beforeEach(() => {
      icon = TestUtils.findRenderedComponentWithType(basicInstance, Icon);
      positionedIcon = TestUtils.findRenderedComponentWithType(positionedInstance, Icon);
      alignedIcon = TestUtils.findRenderedComponentWithType(alignedInstance, Icon);
      hrefAnchor = TestUtils.findRenderedDOMComponentWithTag(linkInstance, 'a');
    });

    it('renders an icon', () => {
      expect(icon.props.type).toEqual('help');
    });

    it('passes the children as a prop', () => {
      expect(icon.props.tooltipMessage).toEqual('Helpful Content');
    });

    it('passes the tooltipPosition if provided', () => {
      expect(positionedIcon.props.tooltipPosition).toEqual('right');
    });

    it('passes the pointerAlign if provided', () => {
      expect(alignedInstance.props.pointerAlign).toEqual('left');
    });

    it('passes the href if provided', () => {
      expect(hrefAnchor.attributes.href.value).toEqual('www.foo.com');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Help data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'help', 'bar', 'baz');
      });
    });
  });
});
