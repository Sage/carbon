import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Dropdown from './index';
import ImmutableHelper from './../../utils/helpers/immutable'

fdescribe("Dropdown", () => {
  let instance;

  let data = ImmutableHelper.parseJSON({ 'items':
                     [{'id' : 1,  'name': 'foo'
                     },
                     {'id' : 2,  'name': 'foof'
                     },
                     {'id' : 3,  'name': 'dfdf'
                     },
                     {'id' : 4,  'name': 'fdfd'
                     },
                     {'id' : 5,  'name': 'gfhg'
                     },
                     {'id' : 6,  'name': 'gfgf'
                     },
                     {'id' : 7,  'name': 'asdg'
                     },
                     {'id' : 8,  'name': 'asdas'
                   }],
                      selected: undefined
                   });

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Dropdown name="bla" options={ data } value='foo' onChange={ function(){} } />);
    debugger
  });


    describe ('componentWillReceiveProps', () => {
      debugger
    })
  // describe("render", () => {
  //   it("renders a hidden input", () => {
  //       debugger
  //   });

    // it("renders a visible input", () => {
    //
    // });

    // it("renders a ul", () => {
    //
    // });
    //
    // it("renders a li with no results", () => {
    //
    // });
    //
    // describe("render with options", () => {
    //
    //   it("renders a li with results", () => {
    //
    //   });
    //
    //   it("sets the highlighted class on the relevant option", () => {
    //
    //   });
    // });
  // });

  // describe("on mouse over of a list item", () => {
  //   it("sets state to highlight the list item", () => {
  //
  //   });
  // });
  //
  // describe("on mouse down of a list item", () => {
  //   it("sets state for the value", () => {
  //
  //   });
  // });
  //
  // describe("on focus of the input", () => {
  //
  //   describe("when there are options", () => {
  //     describe("and an id has been set", () => {
  //
  //     });
  //
  //     describe("and an id has NOT been set", () => {
  //       it("calls setState to open the list", () => {
  //
  //       });
  //     });
  //   });
  // });
  //
  // describe("on blur of the input", () => {
  //
  //
  //
  //   it("calls setState to close the list", () => {
  //
  //   });
  // });
  //
  // describe("emitOnChangeCallback", () => {
  //   describe("when a onChange event has taken place", () => {
  //
  //     it("triggers the handleOnChangeFunction", () => {
  //
  //     });
  //   });
  // });

});
// });
