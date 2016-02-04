import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Banner from './banner';

describe('Banner', () => {
  let infoInstance, newInstance, warningInstance;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('click');

    infoInstance = TestUtils.renderIntoDocument(
      <Banner
        as='info'
        title='Info'
        className='customClass'
        message="Info Message."
        buttonAction={ spy } />
    );

    newInstance = TestUtils.renderIntoDocument(
      <Banner
        as='new'
        title="New"
        message="New Message."
        buttonAction={ spy } />
    );

    warningInstance = TestUtils.renderIntoDocument(
      <Banner
        as='warning'
        title="Warning"
        message="Warning Message."
        buttonText="Button Text"
        buttonAction={ spy } />
    );
  });

  describe('mainClasses', () => {
    it('returns the base banner class', () => {
      expect(newInstance.mainClasses).toEqual('ui-banner ui-banner--new');
    });

    describe('when passed extra classes via props', () => {
      it('appends the extra classes to the base class', () => {
        expect(infoInstance.mainClasses).toEqual('ui-banner ui-banner--info customClass');
      });
    });
  });

  describe('buttonClasses', () => {
    it('returns the class for the button depending on the as prop', () => {
      expect(infoInstance.buttonClasses).toEqual('ui-banner__action ui-banner__action--info');
      expect(newInstance.buttonClasses).toEqual('ui-banner__action ui-banner__action--new');
      expect(warningInstance.buttonClasses).toEqual('ui-banner__action ui-banner__action--warning');
    });
  });

  describe('render', () => {
    it('renders a content, information and a action', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-banner__content').length).toEqual(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-banner__info').length).toEqual(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-banner__action').length).toEqual(1);
    });
  });
});
