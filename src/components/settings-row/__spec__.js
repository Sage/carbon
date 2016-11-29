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

    it('renders a div with two class names', () => {
      expect(wrapper.is('div')).toBeTruthy();
      expect(wrapper.hasClass('settings-row')).toBeTruthy();
      expect(wrapper.hasClass(name)).toBeTruthy();
    });

    it('renders a header column', () => {
      expect(wrapper.find('.settings-row__header').length).toEqual(1);
    });

    it('renders an input column', () => {
      expect(wrapper.find('.settings-row__input').length).toEqual(1);
    });

    it('renders a Heading with a title and subheader', () => {
      let head = wrapper.find(Heading);

      expect(head.length).toEqual(1);
      expect(head.prop('title')).toEqual(title);
      expect(head.prop('subheader')).toBeDefined();
    });

    it('renders a divider inside the Heading', () => {
      let head = wrapper.find(Heading),
          subhead = shallow(head.prop('subheader'));

      expect(subhead.contains(<hr className='settings-row__divider' />)).toBeTruthy();
    });

    it('renders children in the input column', () => {
      expect(wrapper.find('.settings-row__input').contains(children)).toBeTruthy();
    });

    describe('when description is provided', () => {
      let description = 'Some descriptive text';

      it('renders description in subheader', () => {
        wrapper = shallow(<SettingsRow title={ title } description={ description }>{ children }</SettingsRow>);

        let head = wrapper.find(Heading),
            subhead = shallow(head.prop('subheader'));
        
        expect(subhead.contains(description)).toBeTruthy();
      });
    });

    describe('when details are provided', () => {
      let detail_id = 'my_details',
          details = <p id={ detail_id }>Details</p>;

      it('renders details in the header column', () => {
        wrapper = shallow(<SettingsRow title={ title } details={ details }>{ children }</SettingsRow>);

        expect(wrapper.find('.settings-row__header').contains(details)).toBeTruthy();
      });
    });

    describe('when no children are provided', () => {
      it('renders nothing', () => {
        wrapper = shallow(<SettingsRow title={ title } />);
        expect(wrapper.html()).toBeNull();
      });
    });
  });
});
