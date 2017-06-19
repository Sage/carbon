import React from 'react';
import {mount} from 'enzyme';
import AppSwitcher from './app-switcher';

fdescribe('AppSwitcher', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AppSwitcher applicationJson='{"items":[{"title":"CLIENT APPS","items":[{"name":"Accounting","href":"#accounting"},{"name":"Payroll","href":"#payroll"}]},{"title":"ACCOUNTANT APPS","items":[{"name":"Accountants Cloud","href":"#accountantCloud"},{"name":"Corporation Tax","href":"#corporateTax"},{"name":"Final Accounts","href":"#finalAccounts"}]}]}'/>);
  });

  it('renders the menu item class', () => {
    expect(wrapper.hasClass(wrapper.node.styles().menu)).toBeTruthy();
  });

  it('starts with an inactive state', () => {
    expect(wrapper.node.state.active).toBeFalsy();
  });

  it('does not show the app drawer when not click', () => {
    expect(wrapper.contains(wrapper.find("."+ wrapper.node.styles().drawer).first().node)).toBeFalsy();
  });

  it('shows the app drawer when clicked ', () => {
    wrapper.simulate("click");
    expect(wrapper.contains(wrapper.find("."+ wrapper.node.styles().drawer).first().node)).toBeTruthy();
  });

  it('shows the correct number of app items ', () => {
    wrapper.simulate("click");
    expect(wrapper.find("."+ wrapper.node.styles().appItem).length).toBe(5);
  });

  it('closes the app drawer after clicking on the window', () => {
    wrapper.simulate("click");
    wrapper.node.handleCloseWindow();
    expect(wrapper.contains(wrapper.find("."+ wrapper.node.styles().drawer).first().node)).toBeFalsy();
  });

});
