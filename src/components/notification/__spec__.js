import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Notification from './notification';

describe('Notification', () => {
  let infoInstance, newInstance, warningInstance;
  let spy;

  beforeEach(() => {
    spy = jasmine.createSpy('click');

    infoInstance = TestUtils.renderIntoDocument(
      <Notification
        as='info'
        title='Info'
        className='customClass'
        message="Info Message."
        buttonAction={ spy } />
    );

    newInstance = TestUtils.renderIntoDocument(
      <Notification
        as='new'
        title="New"
        message="New Message."
        buttonAction={ spy } />
    );

    warningInstance = TestUtils.renderIntoDocument(
      <Notification
        as='warning'
        title="Warning"
        message="Warning Message."
        buttonText="Button Text"
        buttonAction={ spy } />
    );
  });

  describe('mainClasses', () => {
    it('returns the base notification class', () => {
      expect(newInstance.mainClasses).toEqual('ui-notification ui-notification--new');
    });

    describe('when passed extra classes via props', () => {
      it('appends the extra classes to the base class', () => {
        expect(infoInstance.mainClasses).toEqual('ui-notification ui-notification--info customClass');
      });
    });
  });

  describe('buttonClasses', () => {
    it('returns the class for the button depending on the as prop', () => {
      expect(infoInstance.buttonClasses).toEqual('ui-notification__action__button ui-notification__action__button--info');
      expect(newInstance.buttonClasses).toEqual('ui-notification__action__button ui-notification__action__button--new');
      expect(warningInstance.buttonClasses).toEqual('ui-notification__action__button ui-notification__action__button--warning');
    });
  });

  describe('render', () => {
    it('renders a content, information and a action', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-notification__content').length).toEqual(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-notification__info').length).toEqual(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(infoInstance, 'ui-notification__action').length).toEqual(1);
    });
  });
});
