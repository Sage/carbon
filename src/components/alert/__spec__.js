import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dialog from 'components/dialog'
import Alert from './alert';
import { shallow } from 'enzyme';

describe('Alert', () => {
  let instance;
  let onCancel = jasmine.createSpy('cancel');

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Alert
        onCancel={ onCancel }
        open={ true }
        title="Alert title" />
    );
  });

  describe('dialogTitleClasses', () => {
    it('return the dialog title class along with the alert title class', () => {
      expect(instance.dialogTitleClasses).toEqual('carbon-dialog__title carbon-alert__title');
    });
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the alert class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog__dialog carbon-dialog__dialog--extra-small carbon-alert__alert');
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Alert open={ true } element='bar' role='baz' />);

      it('include correct component, element and role data tags', () => {
        window.RootTagTest.run(wrapper, 'alert', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Alert open={ true } title='Test' subtitle='Test' showCloseIcon={ true } />);

      window.ElementsTagTest.run(wrapper, [
        'close',
        'subtitle',
        'title'
      ]);
    });
  });
});
