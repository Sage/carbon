import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import DropdownSuggest from './index'
import Request from 'superagent';
import Immutable from 'immutable';

describe("DropdownSuggest", () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DropdownSuggest
        name="bla"
        path="/foo"
        resource_key="key"
      />);
  });

  describe("render", () => {
    it("renders a hidden input", () => {
      let input = instance.refs.input;
      expect(input.tagName).toEqual("INPUT");
      expect(input.type).toEqual('hidden');
    });

    it("renders a visible input", () => {
      let input = instance.refs.filter;
      expect(input.tagName).toEqual("INPUT");
    });

    it("renders a ul", () => {
      let ul = instance.refs.list;
      expect(ul.tagName).toEqual("UL");
      expect(ul.classList[1]).toEqual("hidden");
    });

    it("renders a li with no results", () => {
      let ul = instance.refs.list;
      let listItems = ul.childNodes;
      expect(listItems.length).toEqual(1);
      expect(listItems[0].tagName).toEqual("LI");
      expect(listItems[0].textContent).toEqual("No results");
    });

    describe("render with options", () => {
      let ul, listItems;

      beforeEach(() => {
        instance.setState({
          options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }],
          highlighted: 25
        });
        ul = instance.refs.list;
        listItems = ul.childNodes;
      });

      it("renders a li with results", () => {
        expect(listItems.length).toEqual(2);
        expect(listItems[0].value).toEqual(1);
        expect(listItems[0].textContent).toEqual("Foo");
        expect(listItems[1].value).toEqual(25);
        expect(listItems[1].textContent).toEqual("Bar");
      });

      it("sets the highlighted class on the relevant option", () => {
        expect(listItems[0].className).toEqual("ui-dropdown-suggest__item");
        expect(listItems[1].classList[1]).toEqual("ui-dropdown-suggest__item--highlighted");
      });
    });
  });

  describe("resetScroll", () => {
    it("sets the scrollTop to 0 on the list", () => {
      let obj = { scrollTop: 100 };
      instance.refs.list = obj;
      instance.resetScroll();
      expect(obj.scrollTop).toEqual(0);
    });
  });

  describe("on key down of the filter", () => {
    let filter;

    beforeEach(() => {
      filter = instance.refs.filter;
    });

    describe("on return key", () => {
      describe("if no item is highlighted", () => {
        it("does not update the value and open state", () => {
          spyOn(instance, 'setState');
          spyOn(instance, 'emitOnChangeCallback');

          TestUtils.Simulate.keyDown(filter, { which: 13 });
          expect(instance.setState).not.toHaveBeenCalled();
          expect(instance.emitOnChangeCallback).not.toHaveBeenCalled();
        });
      });

      describe("if an item is highlighted", () => {
        it("emits on change callback and closes the results list", () => {
          instance.setState({
            options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }],
            highlighted: 25
          });
          spyOn(instance, 'setState');
          spyOn(instance, 'emitOnChangeCallback');

          let element = instance.props.value.set(instance.props.resource_key, "Bar");
          element = element.set('id', 25);

          TestUtils.Simulate.keyDown(filter, { which: 13 });
          expect(instance.setState).toHaveBeenCalledWith({ open: false });
          expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(element);
        });
      });
    });

    describe("up arrow", () => {
      beforeEach(() => {
        instance.setState({
          options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }]
        });
      });

      describe("when there is a previous sibling", () => {
        it("sets highlighted to the previous value", () => {
          instance.setState({ highlighted: 25 });
          spyOn(instance, 'setState');
          TestUtils.Simulate.keyDown(filter, { which: 38 });
          expect(instance.setState).toHaveBeenCalledWith({ highlighted: 1 });
        });
      });

      describe("when there is no previous sibling", () => {
        it("sets highlighted to the last value", () => {
          instance.setState({ highlighted: 1 });
          spyOn(instance, 'setState');
          TestUtils.Simulate.keyDown(filter, { which: 38 });
          expect(instance.setState).toHaveBeenCalledWith({ highlighted: 25 });
        });
      });
    });

    describe("down arrow", () => {
      beforeEach(() => {
        instance.setState({
          options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }]
        });
      });

      describe("when there is a next sibling", () => {
        it("sets highlighted to the next value", () => {
          instance.setState({ highlighted: 1 });
          spyOn(instance, 'setState');
          TestUtils.Simulate.keyDown(filter, { which: 40 });
          expect(instance.setState).toHaveBeenCalledWith({ highlighted: 25 });
        });
      });

      describe("when there is no next sibling", () => {
        it("sets highlighted to the first value", () => {
          instance.setState({ highlighted: 25 });
          spyOn(instance, 'setState');
          TestUtils.Simulate.keyDown(filter, { which: 40 });
          expect(instance.setState).toHaveBeenCalledWith({ highlighted: 1 });
        });
      });
    });
  });

  describe("on mouse over of a list item", () => {
    it("sets state to highlight the list item", () => {
      instance.setState({
        options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }]
      });
      spyOn(instance, 'setState');
      let listItem = instance.refs.list.childNodes[1];
      TestUtils.Simulate.mouseOver(listItem);
      expect(instance.setState).toHaveBeenCalledWith({ highlighted: 25 });
    });
  });

  describe("on mouse down of a list item", () => {
    it("sets state for the value", () => {
      instance.setState({
        options: [{ id: 1, name: "Foo" }, { id: 25, name: "Bar" }]
      });
      spyOn(instance, 'emitOnChangeCallback');
      let listItem = instance.refs.list.childNodes[1];

      let element = instance.props.value.set(instance.props.resource_key, "Bar");
      element = element.set('id', 25);

      TestUtils.Simulate.mouseDown(listItem);
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(element);
    });
  });

  describe("when the filter changes", () => {
    let filter;
    let element;

    beforeEach(() => {
      jasmine.clock().install();
      filter = instance.refs.filter;
      filter.value = "qux";

      element = instance.props.value.set(instance.props.resource_key, filter.value);
      element = element.set('id', null);

      spyOn(instance, 'emitOnChangeCallback');
      spyOn(instance, 'getData');
      TestUtils.Simulate.change(filter);
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it("calls emitOnChangeCallback", () => {
      expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(element);
    });

    it("calls getData after a delay of 200ms", () => {
      expect(instance.getData).not.toHaveBeenCalled();
      jasmine.clock().tick(200);
      expect(instance.getData).toHaveBeenCalledWith(1);
    });

    it("clears the timeout if already set", () => {
      TestUtils.Simulate.change(filter);
      expect(instance.timeout).toEqual(2);
    });
  });

  describe("when the list scrolls", () => {

    beforeEach(() => {
      spyOn(instance, "getNextPage");
    });

    describe("when not listening to scroll", () => {
      it("does not get the next page", () => {
        instance.listeningToScroll = false;
        instance.handleScroll();
        expect(instance.getNextPage).not.toHaveBeenCalled();
      });
    });

    describe("when listening to scroll", () => {
      beforeEach(() => {
        instance.listeningToScroll = true;
      });

      describe("when there are no more pages left to get", () => {
        it("does not get the next page", () => {
          instance.handleScroll();
          expect(instance.getNextPage).not.toHaveBeenCalled();
        });
      });

      describe("when there are pages left to get", () => {
        beforeEach(() => {
          instance.setState({ page: 1, pages: 2 });
        });

        describe("when not scrolled into position", () => {
          beforeEach(() => {
            let obj = {
              scrollTop: 30,
              scrollHeight: 200,
              offsetHeight: 150
            };
            instance.refs.list = obj;
            instance.handleScroll();
          });

          it("does not get the next page", () => {
            expect(instance.getNextPage).not.toHaveBeenCalled();
          });
        });

        describe("when scrolled into position", () => {
          beforeEach(() => {
            let obj = {
              scrollTop: 31,
              scrollHeight: 200,
              offsetHeight: 150
            };
            instance.refs.list = obj;
            instance.handleScroll();
          });

          it("gets the next page", () => {
            expect(instance.getNextPage).toHaveBeenCalled();
          });

          it("sets listeningToScroll to false", () => {
            expect(instance.listeningToScroll).toBeFalsy();
          });
        });
      });
    });
  });

  describe("on focus of the input", () => {
    let filter;

    beforeEach(() => {
      jasmine.clock().install();
      filter = instance.refs.filter;
      spyOn(filter, 'setSelectionRange');
      spyOn(instance, 'getData');
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it("calls setSelectionRange on the filter", () => {
      TestUtils.Simulate.focus(filter);
      jasmine.clock().tick(0);
      expect(filter.setSelectionRange).toHaveBeenCalledWith(0, 9999);
    });

    describe("when there is NO options", () => {
      describe("and an id has been set", () => {
        it("calls getData", () => {
          spyOn(instance.props.value, 'get').and.returnValue(1);
          TestUtils.Simulate.focus(filter);
          jasmine.clock().tick(0);
          expect(instance.getData).toHaveBeenCalled();
        });
      });

      describe("and an id has NOT been set", () => {
        it("calls getData", () => {
          spyOn(instance.props.value, 'get').and.returnValue(null);
          TestUtils.Simulate.focus(filter);
          jasmine.clock().tick(0);
          expect(instance.getData).toHaveBeenCalled();
        });
      });
    });

    describe("when there are options", () => {
      describe("and an id has been set", () => {
        it("calls getData", () => {
          instance.setState({ options: [{}]});
          spyOn(instance.props.value, 'get').and.returnValue(1);

          TestUtils.Simulate.focus(filter);
          jasmine.clock().tick(0);
          expect(instance.getData).toHaveBeenCalled();
        });
      });

      describe("and an id has NOT been set", () => {
        it("calls setState to open the list", () => {
          instance.setState({ options: [{}]});
          spyOn(instance.props.value, 'get').and.returnValue(null);
          spyOn(instance, 'setState');

          TestUtils.Simulate.focus(filter);
          jasmine.clock().tick(0);
          expect(instance.setState).toHaveBeenCalledWith({ open: true });
          expect(instance.getData).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("on blur of the input", () => {
    beforeEach(() => {
      spyOn(instance, 'resetScroll');
      spyOn(instance, 'setState');
      let filter = instance.refs.filter;
      TestUtils.Simulate.blur(filter);
    });

    it("calls resetScroll", () => {
      expect(instance.resetScroll).toHaveBeenCalled();
    });

    it("calls setState to close the list", () => {
      expect(instance.setState).toHaveBeenCalledWith({ open: false });
    });
  });

  describe("getNextPage", () => {
    beforeEach(() => {
      spyOn(instance, 'getData');
    });

    describe("if there are pages left to get", () => {
      it("calls getData with the next page number", () => {
        instance.setState({ page: 1, pages: 2 });
        instance.getNextPage();
        expect(instance.getData).toHaveBeenCalledWith(2);
      });
    });

    describe("if there are no pages left to get", () => {
      it("does not call getData", () => {
        instance.setState({ page: 2, pages: 2 });
        instance.getNextPage();
        expect(instance.getData).not.toHaveBeenCalled();
      });
    });
  });

  describe("updateList", () => {
    beforeEach(() => {
      instance.listeningToScroll = false;
      spyOn(instance, 'resetScroll');
    });

    it("sets listeningToScroll to true", () => {
      instance.updateList({
        records: 0,
        items: []
      });
      expect(instance.listeningToScroll).toBeTruthy;
    });

    describe("if page is greater than 1", () => {
      beforeEach(() => {
        instance.setState({
          options: [{id: 1}]
        });
        spyOn(instance, 'setState');
        instance.updateList({
          page: 2,
          records: 15,
          items: [2, 3, 4]
        });
      });

      it("does not call resetScroll", () => {
        expect(instance.resetScroll).not.toHaveBeenCalled();
      });

      it("calls setState with concatenated data", () => {
        expect(instance.setState).toHaveBeenCalledWith({
          options: [{id: 1}, 2, 3, 4],
          open: true,
          pages: 2,
          page: 2,
          highlighted: 1
        });
      });
    });

    describe("if page is 1", () => {
      beforeEach(() => {
        spyOn(instance, 'setState');
        instance.updateList({
          page: 1,
          records: 2,
          items: [{id: 1}, 2]
        });
      });

      it("calls resetScroll", () => {
        expect(instance.resetScroll).toHaveBeenCalled();
      });

      it("calls setState with relevant data", () => {
        expect(instance.setState).toHaveBeenCalledWith({
          options: [{id: 1}, 2],
          open: true,
          pages: 1,
          page: 1,
          highlighted: 1
        });
      });
    });
  });

  describe("emitOnChangeCallback", () => {
    describe("when a onChange event has taken place", () => {

      beforeEach(() => {
        spyOn(instance, '_handleOnChange');
        instance.emitOnChangeCallback({});
      });

      it("Trigger the handleOnChangeFunction", () => {
        expect(instance._handleOnChange).toHaveBeenCalledWith({ target: { value: {} }});
      });
    });
  });

  describe("getData", () => {
    beforeEach(() => {
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    describe("with no page value or input value", () => {
      it("requests data to the correct path and query", () => {
        instance.getData();
        let request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toEqual("/foo?page=1&rows=10")
      });
    });

    describe("with page value and input value but no id", () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownSuggest
            name="bla"
            path="/foo"
            resource_key="customkey"
            value={ Immutable.Map({ id: '', customkey: 'my value' }) }
          />);
      });

      it("requests data to the correct path and query", () => {
        instance.getData(3);
        let request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toEqual("/foo?page=3&rows=10&value=my%20value")
      });
    });

    describe("with page value and input value and id", () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <DropdownSuggest
            name="bla"
            path="/foo"
            resource_key="customkey"
            value={ Immutable.Map({ id: '1', customkey: 'my value' }) }
          />);
      });

      it("requests data to the correct path and query", () => {
        instance.getData(3);
        let request = jasmine.Ajax.requests.mostRecent();
        expect(request.url).toEqual("/foo?page=3&rows=10&value=")
      });
    });

    describe("on successful ajax response", () => {
      it("updates the list with the data", () => {
        spyOn(instance, 'updateList');
        instance.getData();
        let request = jasmine.Ajax.requests.mostRecent();
        request.respondWith({
          "status": 200,
          "contentType": 'application/json',
          "responseText": "{\"data\": [\"foo\"]}"
        });
        expect(instance.updateList).toHaveBeenCalledWith('foo');
      });
    });
  });
});
