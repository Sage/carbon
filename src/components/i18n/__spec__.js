import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import i18n from 'i18n-js';
import I18n from './i18n.js';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('I18n', () => {

  describe('render', () => {

    describe('without markdown', () => {

      beforeEach(() => {
        spyOn(i18n, 't').and.returnValue('bar');
      });

      describe('when component is rendered with only a scope', () => {
        it('renders the value of that scope in a span', () => {
          let wrapper = shallow(<I18n scope='foo' />);
          expect(wrapper).toMatchSnapshot();
        });
      });

      describe('when component is rendered with inline set to false', () => {
        it('renders the value of the scope in a div', () => {
          let wrapper = shallow(<I18n scope='foo' inline={ false }/>);
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    describe('with markdown', () => {
      describe('when component is rendered inline', () => {
        it('renders the parsed markdown in a span', () => {
          spyOn(i18n, 't').and.returnValue('something __bold__');
          let wrapper = shallow(<I18n scope='foo' markdown={ true } />);
          expect(wrapper).toMatchSnapshot();
        });
      });

      describe('when component is rendered as a block', () => {
        it('renders the parsed markdown in a div', () => {
          spyOn(i18n, 't').and.returnValue('something __bold__');
          let wrapper = shallow(
            <I18n scope='foo' markdown={ true } inline={ false } />
          );
          expect(wrapper).toMatchSnapshot();
        });
      })

      describe('when component is rendered with html in the value', () => {
        it('parses the html correctly', () => {
          spyOn(i18n, 't').and.returnValue('some <span>html</span>');
          let wrapper = shallow(<I18n scope='foo' markdown={ true } />);
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<I18n data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'i18n', 'bar', 'baz');
    });
  });
});
