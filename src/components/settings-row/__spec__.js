import React from 'react';
import { shallow } from 'enzyme';
import SettingsRow from './settings-row';
import Heading from './../heading';

describe('SettingsRow', () => {
  describe('render', () => {
    let name = 'foobar-row',
        title = 'Some Title',
        child_id = 'my_child',
        children = <span id={ child_id } />,
        wrapper = shallow(<SettingsRow className={ name } title={ title }>{ children }</SettingsRow>);

    it('has three class names', () => {
      expect(wrapper.hasClass('carbon-settings-row')).toBeTruthy();
      expect(wrapper.hasClass('carbon-settings-row--has-divider')).toBeTruthy();
      expect(wrapper.hasClass(name)).toBeTruthy();
    });

    it('renders a header column', () => {
      expect(wrapper.find('.carbon-settings-row__header').length).toEqual(1);
    });

    it('renders an input column', () => {
      expect(wrapper.find('.carbon-settings-row__input').length).toEqual(1);
    });

    it('renders a Heading with a title and separator but no divider', () => {
      let head = wrapper.find(Heading);

      expect(head.length).toEqual(1);
      expect(head.prop('title')).toEqual(title);
      expect(head.prop('separator')).toBeTruthy();
      expect(head.prop('divider')).toBeFalsy();
    });

    it('renders children in the input column', () => {
      expect(wrapper.find('.carbon-settings-row__input').contains(children)).toBeTruthy();
    });

    describe('when divider property is false', () => {
      it('excludes the has-divider class', () => {
        wrapper = shallow(<SettingsRow title={ title } divider={ false } />);

        expect(wrapper.hasClass('carbon-settings-row--has-divider')).toBeFalsy();
      });
    });

    describe('when description is provided', () => {
      let description = <span>Some descriptive text</span>;

      it('passes description as subheader', () => {
        wrapper = shallow(<SettingsRow title={ title } description={ description } />);

        let head = wrapper.find(Heading);
        
        expect(head.prop('subheader')).toEqual(description);
      });
    });

    describe('when title is not provided', () => {
      it('does not render a header', () => {
        wrapper = shallow(<SettingsRow className={ name }>{ children }</SettingsRow>);

        expect(wrapper.find(Heading).length).toEqual(0);
      });
    });
  });
});
