import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import NumberComponent from './../number';
import Pager from './pager';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Pager', () => {
  let instance, instance2, spy1, spy2;

  beforeEach(() => {
    spy1 = jasmine.createSpy('instance 1 pagination');
    spy2 = jasmine.createSpy('instance 2 pagination');

    instance = TestUtils.renderIntoDocument(
      <Pager
        currentPage='1'
        pageSize='10'
        showPageSizeSelection={ true }
        totalRecords={  100  }
        onPagination={ spy1 }
      />
    );

    instance2 = TestUtils.renderIntoDocument(
      <Pager
        currentPage='2'
        pageSize='10'
        totalRecords={  20  }
        onPagination={ spy2 }
      />
    );
  });

  describe('onInitialise', () => {
    it('sets the currentPage within the state', () => {
      expect(instance.state.currentPage).toEqual('1');
    });
  });

  describe('componentWillReceiveProps', () => {
    it('updates the internal state currentPage with the props currentPage', () => {
      instance.setState({ currentPage: '2' });
      instance.componentWillReceiveProps({ currentPage: '1' });

      expect(instance.state.currentPage).toEqual('1');
    });
  });

  describe('handleCurrentPageKeyUp', () => {

    beforeEach(() => {
      spyOn(instance, 'emitChangeCallback')
    });

    describe('when the event is a enter key', () => {
      it('calls emitChangeCallback', () => {
        let ev = { which: 13 };
        instance.handleCurrentPageKeyUp(ev);
        expect(instance.emitChangeCallback).toHaveBeenCalledWith('input', ev);
      });
    });

    describe('when the the event is any other key', () => {
      it('does not emit the change', () => {
        let ev = { which: 8 };
        instance.handleCurrentPageKeyUp(ev);
        expect(instance.emitChangeCallback).not.toHaveBeenCalled()
      });
    });
  });

  describe('emitChangeCallback', () => {
    describe('when element is next', () => {
      it('emits onPagination increasing currentPage by 1', () => {
        instance.emitChangeCallback('next', {});
        expect(spy1).toHaveBeenCalledWith('2', '10', 'next');
      });
    });

    describe('when element is input', () => {
      describe('when the value is NaN', () => {
        it('emit 1 as the new current page', () => {
          let event = { target: { value: '-' } };
          instance.emitChangeCallback('input', event);
          expect(spy1).toHaveBeenCalledWith('1', '10', 'input');
        });
      });

      it('emit a new page from the input field', () => {
        let event = { target: { value: '5' } };
        instance.emitChangeCallback('input', event);
        expect(spy1).toHaveBeenCalledWith('5', '10', 'input');
      });

      describe('when input is greater than the max page number', () => {
        it('emit a max page as the new current page', () => {
          let event = { target: { value: '100' } };
          instance.emitChangeCallback('input', event);
          expect(spy1).toHaveBeenCalledWith('10', '10', 'input');
        });
      });

      describe('when input value is negative', () => {
        it('emit the absolute value as the new current page', () => {
          let event = { target: { value: '-3' } };
          instance.emitChangeCallback('input', event);
          expect(spy1).toHaveBeenCalledWith('3', '10', 'input');
        });
      });

      describe('when input is blank', () => {
        it('resets currentPage to the currentPage is state', () => {
          spyOn(instance, 'setState');
          let event = { target: { value: '' } };
          instance.emitChangeCallback('input', event);

          expect(instance.setState).toHaveBeenCalledWith({
            currentPage: instance.state.currentPage
          });
        });
      });
    });

    describe('when element type is not passed', () => {
      it('does not call onPagination', () => {
        instance.emitChangeCallback('', {});
        expect(spy1).not.toHaveBeenCalled();
      });
    });

    describe('when element is previous', () => {
      it('emits onPagination decreasing currentPage by 1', () => {
        instance2.emitChangeCallback('previous', {});
        expect(spy2).toHaveBeenCalledWith('1', '10', 'previous');
      });
    });

    describe('when element is size', () => {
      it('emits the new page size', () => {
        let event = { target: { value: '50' } };
        instance.emitChangeCallback('size', event);
        expect(spy1).toHaveBeenCalledWith('1', '50', 'size');
      });

      describe('when page size is not a correct option', () => {
        it('does not emit a callback', () => {
          let event = { target: { value: '13' } };
          instance.emitChangeCallback('size', event);
          expect(spy1).not.toHaveBeenCalled();
        });
      });

      describe('when not on the first page', () => {
        // TODO: see page.js 155
      });
    });
  });

  describe('maxPage', () => {
    it('returns the max page depending on totalRecords and pageSize', () => {
      expect(instance.maxPage).toEqual(10);
    });

    describe('when total records is 0', () => {
      it('defaults the maxPage to 1', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ 0 }
            onPagination={ spy1 }
          />
        );
        expect(instance.maxPage).toEqual(1);
      });
    });

    describe('when total records is negative', () => {
      it('defaults the maxPage to 1', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ -10 }
            onPagination={ spy1 }
          />
        );
        expect(instance.maxPage).toEqual(1);
      });
    });

    describe('when pageSize is undefined', () => {
      it('returns 1', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize={ null }
            showPageSizeSelection={ true }
            totalRecords={ 100 }
            onPagination={ spy1 }
          />
        );

        expect(instance.maxPage).toEqual(1);
      });
    });

    describe('when pageSize is 0', () => {
      it('returns 1', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='0'
            showPageSizeSelection={ true }
            totalRecords={ 100 }
            onPagination={ spy1 }
          />
        );

        expect(instance.maxPage).toEqual(1);
      });
    });
  });

  describe('disablePrevious', () => {
    describe('when currentPage is 1', () => {
      it('returns true', () => {
        expect(instance.disablePrevious).toBeTruthy();
      });
    });

    describe('when currentPage is not 1', () => {
      it('returns false', () => {
        expect(instance2.disablePrevious).toBeFalsy();
      });
    });
  });

  describe('disableNext', () => {
    describe('showing the last record', () => {
      it('returns true', () => {
        expect(instance2.disableNext).toBeTruthy();
      });
    });

    describe('when currentPage is not 1', () => {
      it('returns false', () => {
        expect(instance.disableNext).toBeFalsy();
      });
    });
  });

  describe('previousArrow', () => {
    let previous;

    it('returns an arrow icon', () => {
      previous = instance.previousArrow;
      expect(previous.props.type).toEqual('dropdown');
    });

    describe('when disabled', () => {
      it('adds a disabled class', () => {
        previous = instance.previousArrow;
        expect(previous.props.className).toEqual('carbon-pager__previous carbon-pager__previous--disabled');
      });
    });

    describe('when enabled', () => {
      it('adds a onClick handler', () => {
        let input = TestUtils.findRenderedDOMComponentWithClass(instance2, 'carbon-pager__previous');
        TestUtils.Simulate.click(input);
        expect(spy2).toHaveBeenCalled();
      });
    });
  });

  describe('currentPageInput', () => {
    let input;

    it('returns a number component', () => {
      expect(TestUtils.findRenderedComponentWithType(instance, NumberComponent)).toBeTruthy();
    });

    it('sets the current page to this.state.currentPage', () => {
      input = instance.currentPageInput;
      expect(input.props.value).toEqual(instance.props.currentPage);
    });

    it('adds a onChange handler', () => {
      spyOn(instance, 'setState');
      let input = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-number__input');
      TestUtils.Simulate.change(input);
      expect(instance.setState).toHaveBeenCalled();
    });

    it('adds a onBlur handler', () => {
      let input = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-number__input');
      TestUtils.Simulate.blur(input);
      expect(spy1).toHaveBeenCalled();
    });
  });

  describe('nextArrow', () => {
    let next;

    it('returns a arrow icon', () => {
      next = instance.nextArrow;
      expect(next.props.type).toEqual('dropdown');
    });

    describe('when disabled', () => {
      it('adds a disabled class', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ 1 }
            onPagination={ spy1 }
          />
        );

        next = instance.nextArrow;
        expect(next.props.className).toEqual('carbon-pager__next carbon-pager__next--disabled');
      });
    });

    describe('when enabled', () => {
      it('adds a onClick handler', () => {
        let input = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-pager__next');
        TestUtils.Simulate.click(input);
        expect(spy1).toHaveBeenCalled();
      });
    });
  });

  describe('sizeSelectionDropdown', () => {
    describe('when showPageSizeSelection is true', () => {
      let dropdown;

      it('returns size dropdown', () => {
        let size = instance.sizeSelectionDropdown;
        dropdown = size.props.children[1];
        expect(dropdown.props.value).toEqual(instance.props.pageSize);
      });

      it('adds a onChange event to the dropdown', () => {
        dropdown = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-dropdown__input');
        TestUtils.Simulate.change(dropdown);
        expect(spy1).toHaveBeenCalled();
      });
    });

    describe('when showPageSizeSelection is false', () => {
      it('does not return the dropdown', () => {
        expect(instance2.sizeSelectionDropdown).toBeFalsy();
      });
    });

    it('adds a class of unselectable', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'unselectable').length).toBeTruthy();
    });
  });

  describe('totalRecordsCount', () => {
    describe('when totalRecords is positive', () => {
      it('returns totalRecords', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ 1 }
            onPagination={ spy1 }
          />
        );

        expect(instance.totalRecordsCount).toEqual(1);
      });
    });

    describe('when totalRecords is zero', () => {
      it('returns zero', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ 0 }
            onPagination={ spy1 }
          />
        );

        expect(instance.totalRecordsCount).toEqual(0);
      });
    });

    describe('when totalRecords is negative', () => {
      it('returns zero', () => {
        instance = TestUtils.renderIntoDocument(
          <Pager
            currentPage='1'
            pageSize='10'
            totalRecords={ -1 }
            onPagination={ spy1 }
          />
        );

        expect(instance.totalRecordsCount).toEqual(0);
      });
    });
  });

  describe('tags on component', () => {
    let wrapper = shallow(
      <Pager
        currentPage='1'
        data-element='bar'
        data-role='baz'
        onPagination={ ()=>{} }
        totalRecords={ 100 }
      />
    );

    it('includes correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'pager', 'bar', 'baz');
    });

    describe('on internal elements', () => {
      let wrapper = shallow(
        <Pager
          currentPage='1'
          onPagination={ ()=>{} }
          pageSize='10'
          showPageSizeSelection={ true }
          totalRecords={ 100 }
        />
      );
      elementsTagTest(wrapper, [
        'current-page',
        'next-page',
        'page-select',
        'previous-page'
      ]);
    });
  });
});
