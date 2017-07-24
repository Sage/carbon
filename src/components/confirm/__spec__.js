import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Dialog from './../dialog'
import Confirm from './confirm';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Confirm', () => {
  let instance, onCancel, onConfirm;

  beforeEach(() => {
    onCancel = jasmine.createSpy('cancel');
    onConfirm = jasmine.createSpy('confirm');

    instance = TestUtils.renderIntoDocument(
      <Confirm
        onCancel={ onCancel }
        onConfirm={ onConfirm }
        open={ true }
        title="Confirm title"
      />
    );
  });

  describe('dialogClasses', () => {
    it('returns the dialog class along with the  class', () => {
      expect(instance.dialogClasses).toEqual('carbon-dialog__dialog carbon-dialog__dialog--extra-small carbon-confirm__confirm');
    });
  });

  describe('confirmButtons', () => {
    let yes, no, yesButton, noButton;

    it('renders with the buttons and clearfix classes', () => {
      let buttons = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-confirm__buttons');
      expect(buttons.classList).toMatch('clearfix');
    });

    describe('yes button', () => {
      beforeEach(() => {
        yes = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-confirm__button')[1]
        yesButton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[1];
      });

      it('returns a yes confirm button', () => {
        expect(yes.className).toEqual('carbon-confirm__button carbon-confirm__yes');
      });

      it('returns a default Yes label', () => {
        let node = ReactDOM.findDOMNode(yesButton);
        expect(node.innerHTML).toEqual('Yes');
      });

      it('triggers the onConfirm when the yes button is clicked', () => {
        TestUtils.Simulate.click(yesButton);
        expect(onConfirm).toHaveBeenCalled();
      });
    });

    describe('no button', () => {
      beforeEach(() => {
        no = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-confirm__button')[0]
        noButton = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')[0];
      });

      it('returns a no cancel button', () => {
        expect(no.className).toEqual('carbon-confirm__button carbon-confirm__no');
      });

      it('returns a default No label', () => {
        let node = ReactDOM.findDOMNode(noButton);
        expect(node.innerHTML).toEqual('No');
      });

      it('triggers the onCancel when the no button is clicked', () => {
        TestUtils.Simulate.click(noButton);
        expect(onCancel).toHaveBeenCalled();
      });
    });

    describe('when custom labels are defined', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Confirm
            onCancel={ onCancel }
            onConfirm={ onConfirm }
            open={ true }
            confirmLabel='Delete'
            cancelLabel='Cancel'
          />
        );
        yesButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-confirm__yes')[0];
        noButton = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-confirm__no')[0];
      });

      it('returns a custom confirm label', () => {
        let node = ReactDOM.findDOMNode(yesButton);
        expect(node.textContent).toEqual('Delete');
      });

      it('returns a custom cancel label', () => {
        let node = ReactDOM.findDOMNode(noButton);
        expect(node.textContent).toEqual('Cancel');
      });
    });
  });

  describe('dialogHTML', () => {
    it('appends the two buttons to the dialogHTML', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button').length).toEqual(2);
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <Confirm
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'confirm', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = mount(
        <Confirm
          onCancel={ () => {} }
          onConfirm={ () => {} }
          open={ true }
          showCloseIcon={ true }
          subtitle='Test'
          title='Test'
        />
      );

      elementsTagTest(wrapper, [
        'cancel',
        'close',
        'confirm',
        'subtitle',
        'title'
      ]);
    });
  });
});
