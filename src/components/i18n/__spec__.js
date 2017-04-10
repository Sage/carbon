import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import i18n from 'i18n-js';
import I18n from './i18n.js';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';

describe('I18n', () => {

  describe('render', () => {
    let shallowRenderer;

    beforeEach(() => {
      shallowRenderer = TestUtils.createRenderer();
    });

    describe('without markdown', () => {

      beforeEach(() => {
        spyOn(i18n, 't').and.returnValue('bar');
      });

      it('when component is rendered with only a key', () => {

        shallowRenderer.render(
          <I18n scope='foo' />
        );

        const output = shallowRenderer.getRenderOutput();
        expect(output.type).toEqual('span');
        expect(output.props.children).toEqual('bar');
      });

      it('when component is rendered with inline set to false', () => {

        shallowRenderer.render(
          <I18n scope='foo' inline={ false } />
        );

        const output = shallowRenderer.getRenderOutput();
        expect(output.type).toEqual('div');
        expect(output.props.children).toEqual('bar');
      });
    });

    describe('with markdown', () => {

      it('when component is rendered inline', () => {

        spyOn(i18n, 't').and.returnValue('something __bold__');

        shallowRenderer.render(
          <I18n scope='foo' markdown={ true }/>
        );

        const output = shallowRenderer.getRenderOutput();
        expect(output.type).toEqual('span');
        expect(output.props.dangerouslySetInnerHTML).toEqual({
          __html: 'something <strong>bold</strong>'
        });
      });

      it('when component is rendered as a block', () => {

        spyOn(i18n, 't').and.returnValue('something __bold__');

        shallowRenderer.render(
          <I18n scope='foo' markdown={ true } inline={ false } />
        );

        const output = shallowRenderer.getRenderOutput();
        expect(output.type).toEqual('div');
        expect(output.props.dangerouslySetInnerHTML).toEqual({
          __html: '<p>something <strong>bold</strong></p>\n'
        });
      })

      it('when component is rendered with html in the value', () => {

        spyOn(i18n, 't').and.returnValue('some <span>html</span>');

        shallowRenderer.render(
          <I18n scope='foo' markdown={ true } />
        );

        const output = shallowRenderer.getRenderOutput();
        expect(output.type).toEqual('span');
        expect(output.props.dangerouslySetInnerHTML).toEqual({
          __html: 'some &lt;span&gt;html&lt;/span&gt;'
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
