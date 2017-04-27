import React from 'react';
import Content from './content';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

fdescribe('Content', () => {
  it('renders the title, body and custom classes', () => {
    const wrapper = shallow(<Content title="bar" className="foobar">bar</Content>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('with no children renders nothing', () => {
    const wrapper = shallow(<Content title="foo">{ null }</Content>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('inline', () => {
    it('renders with an inline class', () => {
      const wrapper = shallow(<Content inline={ true }>foo</Content>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('center', () => {
    it('renders with an inline and center class', () => {
      const wrapper = shallow(<Content align="center">foo</Content>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('titleWidth', () => {
    it('renders custom styling for the title', () => {
      const wrapper = shallow(<Content titleWidth="40">foo</Content>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe("over-ride body width", () => {
    it("will set body width to 100% if over-ride set", () => {
      const wrapper = shallow(<Content titleWidth="40" bodyFullWidth={ true }>foo</Content>);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
