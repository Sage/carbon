import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import TabHeader from './tab-header.component';
import { elementsTagTest } from '../../../utils/helpers/tags/tags-specs/tags-specs';

function render(props) {
  return TestRenderer.create(
    <TabHeader title='Tab Title 1' id='uniqueid1' {...props}/>
  );
}

describe('TabHeader', () => {
  let wrapper;
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
});

describe('tabHeaderClasses', () => {
  it('adds a carbon-tabs__header class to the tab', () => {
    let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
    expect(secondTab.classList.contains('carbon-tabs__headers__header')).toBeTruthy();
  });

  it('adds the className included in the props to the tab', () => {
    let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
    expect(secondTab.classList.contains('headerClass2')).toBeTruthy();
  });

  it('adds the className included in the props as an array to the tab', () => {
    let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[2];
    expect(secondTab.classList.contains('headerClass3')).toBeTruthy();
    expect(secondTab.classList.contains('headerClass4')).toBeTruthy();
  });

  it('does not add a selected class to the header', () => {
    let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
    expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeFalsy();
  });

  describe('when tab is selected tab', () => {
    it('adds a selected class to the header', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[0];
      expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeTruthy();
    });
  });

  describe('when tab is inValid', () => {
    it('adds a error class to the header', () => {
      instance.setState({ tabValidity: Immutable.fromJS({ 'uniqueid2': false })});
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.className).toEqual('carbon-tabs__headers__header headerClass2 carbon-tabs__headers__header--error');
    });
  });

  describe('when tab has a warning', () => {
    it('adds a warning class to the header', () => {
      instance.setState({ tabWarning: Immutable.fromJS({ 'uniqueid2': true })});
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.className).toEqual('carbon-tabs__headers__header headerClass2 carbon-tabs__headers__header--warning');
    });

    describe('when tab has an error as well', () => {
      it('does not add a warning class', () => {
        instance.setState({ tabWarning: Immutable.fromJS({ 'uniqueid2': true }), tabValidity: Immutable.fromJS({ 'uniqueid2': false }) });
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
        expect(secondTab.classList.contains('carbon-tabs__headers__header--warning')).toBeFalsy();
      });
    });
  });
});