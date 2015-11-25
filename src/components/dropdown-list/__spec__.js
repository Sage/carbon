import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import DropdownList from './index'
import Immutable from 'immutable';

describe("DropdownList", () => {
  var instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <DropdownList
        name="bla"
      />);
  });

  describe("render", () => {
    it("renders a hidden input", () => {

    });

    it("renders a visible input", () => {

    });

    it("renders a ul", () => {

    });

    it("renders a li with no results", () => {

    });

    describe("render with options", () => {

      it("renders a li with results", () => {

      });

      it("sets the highlighted class on the relevant option", () => {

      });
    });
  });

  describe("on mouse over of a list item", () => {
    it("sets state to highlight the list item", () => {

    });
  });

  describe("on mouse down of a list item", () => {
    it("sets state for the value", () => {

    });
  });

  describe("on focus of the input", () => {

    describe("when there are options", () => {
      describe("and an id has been set", () => {

      });

      describe("and an id has NOT been set", () => {
        it("calls setState to open the list", () => {

        });
      });
    });
  });

  describe("on blur of the input", () => {



    it("calls setState to close the list", () => {

    });
  });

  describe("emitOnChangeCallback", () => {
    describe("when a onChange event has taken place", () => {

      it("triggers the handleOnChangeFunction", () => {

      });
    });
  });

  });
// });
