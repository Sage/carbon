// __spec__.js
import React from 'react';
import { shallow } from 'enzyme';

import { WithDragAndDrop } from './../drag-and-drop';

describe('WithDragAndDrop', () => {
  let OriginalComponent;

  beforeEach(() => {
    OriginalComponent = WithDragAndDrop.DecoratedComponent;
  });

  it('has a DragDropContainer', () => {
    expect(WithDragAndDrop.name).toBe('DragDropContainer');
  });

  it('calls connectDragSource and connectDropTarget', () => {
    // Stub the React DnD connector functions with an identity function
    //
    // Track calls using count.
    // Return el, otherwise React complains that WithDragAndDrop.render()
    // doesn't return a valid React element.
    let count = 0;
    const identity = (el) => {
      count += 1;
      return el;
    };

    let wrapper = shallow(
      <OriginalComponent
          connectDragSource={ identity }
          connectDropTarget={ identity }>
        <div>
          Draggable
        </div>
      </OriginalComponent>
    );

    expect(count).toEqual(2);
  });

  describe('when validating child props', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    it('throws an error if no child props are passed', () => {
      // Prop validation doesn't need to use a call to shallow, etc.
      // -- see https://gist.github.com/scmx/d98cc058a7c3dfef7890#gistcomment-1854075
      <OriginalComponent connectDragSource={ () => {} } connectDropTarget={ () => {} } />

      expect(console.error.calls.count()).toBe(1);
      expect(console.error.calls.argsFor(0)[0]).toEqual('Warning: Failed propType: Required prop `children` was not specified in `WithDragAndDrop`.')
    });

    it('throws an error if multiple root nodes are passed as child props', () => {
      <OriginalComponent>
        <div>One</div>
        <div>Two</div>
      </OriginalComponent>

      expect(console.error.calls.count()).toBe(1);
      expect(console.error.calls.argsFor(0)[0]).toEqual('Warning: Failed propType: Invalid prop `children` supplied to `WithDragAndDrop`, expected a single ReactElement.')
    });
  });
});
