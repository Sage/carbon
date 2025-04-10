import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useDraggable, { UseDraggableHandle, UseDraggableOptions } from './useDraggable';
import guid from '../../__internal__/utils/helpers/guid';

// Added to avoid TypeError: Cannot read properties of undefined (reading 'pageX') due to the use of a drag-event polyfill via pragmatic-drag-and-drop
Object.defineProperties(MouseEvent.prototype, {
    pageX: { 
      configurable: true,
      writable: true,
      value: 0
    },
    pageY: {
      configurable: true,
      writable: true,
      value: 0
    }
  });

let guidCounter = 0;
const mockedGuid = "guid-12345";
jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => {
  return `${mockedGuid}-${guidCounter++}`;
});

afterEach(() => {
  guidCounter = 0;
  
  fireEvent.dragEnd(window);

  fireEvent.pointerMove(window);

  jest.clearAllTimers();
jest.clearAllMocks();
});

const TestComponent = ({ 
draggableItems, 
  dragType, 
  containerId, 
  stylingOptOut,
  containerNode,
  itemsNode,
  getOrder
}: UseDraggableOptions) => {
  const handleRef = React.useRef<UseDraggableHandle>(null);
  const { draggableElement, draggedNode } = useDraggable({
    draggableItems,
    ref: handleRef,
    dragType,
    containerId,
    stylingOptOut,
    containerNode,
    itemsNode,
    containerRole: "draggable-container",
    itemsRole: "draggable-item",
    getOrder
  });
  
  return draggableElement;
};

test("renders a container", () => {
    render(
        <TestComponent
        draggableItems={<span>Item 1</span>}
        />
    );
    
    const container = screen.getByTestId("draggable-container");
    expect(container).toBeVisible();

})

test("accepts a node and wraps it in a draggable item", () => {
    render(
        <TestComponent
        draggableItems={<span>Item 1</span>}
        />
    );
    
    const container = screen.getByTestId("draggable-container");
    const draggableItem= screen.getByTestId("draggable-item");

    expect (container).toContainElement(draggableItem);
    expect(draggableItem).toBeVisible();
})

test("accepts an array of nodes and wraps each node in a a draggable item", () => {
    render(
        <TestComponent
        draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
        />
    );
    
    const container = screen.getByTestId("draggable-container");
    const draggableItems = screen.getAllByTestId("draggable-item");

    draggableItems.forEach((item) => {
        expect(container).toContainElement(item);
        expect(item).toBeVisible();
    })
})

test("renders a container with a custom id attribute via the `containerId`", () => {
    render(
        <TestComponent
        containerId="custom-id"
        draggableItems={<span>Item 1</span>}
        />
    );
    
    const container = screen.getByTestId("draggable-container");
    expect(container).toHaveAttribute("id", "custom-id");
})

test("renders a container with a node via `containerNode`", () => {

})

test("renders a container with a custom data-role attribute node via `containerRole`", () => {

})


test('changes the dragging behavior to be continuous when `dragType` is `"continuous"`', () => {

})

test("opts out of default styling when `stylingOptOut` is true", () => {

})

test('verifies the getOrder callback is called once after a complete drag and drop operation', () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    
    render(
      <TestComponent
        draggableItems={[<span>Item 1</span>, <span>Item 2</span>]}
        getOrder={mockGetOrder}
      />
    );
    
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    const item1DraggableWrapper = item1.parentElement as HTMLElement;
    const item2DraggableWrapper = item2.parentElement as HTMLElement;
    
   act(() => {
    fireEvent.dragStart(item1DraggableWrapper);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.dragEnter(item2DraggableWrapper);
  });
  
  act(() => {
    fireEvent.dragOver(item2DraggableWrapper);
  });
  
  act(() => {
    jest.runAllTimers();
  });
  
  act(() => {
    fireEvent.drop(item2DraggableWrapper);
  });
  
  act(() => {
    fireEvent.dragEnd(item1DraggableWrapper);
  });
  
  expect(mockGetOrder).toHaveBeenCalledTimes(1);
  });
  
  test('verifies the getOrder callback receives the correct reordered array of ids and the dragged item id', () => {
    jest.useFakeTimers();
    const mockGetOrder = jest.fn();
    
    render(
      <TestComponent
        containerId="containerid"
        draggableItems={[
          <span id="foo" key="1">Item 1</span>, 
          <span id="bar" key="2">Item 2</span>
        ]}
        getOrder={mockGetOrder}
      />
    );
    
    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    const item1DraggableWrapper = item1.parentElement as HTMLElement;
    const item2DraggableWrapper = item2.parentElement as HTMLElement;
    
    act(() => {
        fireEvent.dragStart(item1DraggableWrapper);
      });
      
      act(() => {
        jest.runAllTimers();
      });
      
      act(() => {
        fireEvent.dragEnter(item2DraggableWrapper);
      });
      
      act(() => {
        fireEvent.dragOver(item2DraggableWrapper);
      });
      
      act(() => {
        jest.runAllTimers();
      });
      
      act(() => {
        fireEvent.drop(item2DraggableWrapper);
      });
      
      act(() => {
        fireEvent.dragEnd(item1DraggableWrapper);
      });

    expect(mockGetOrder).toHaveBeenCalledWith(["bar", "foo"], "foo");
  });

  test("renders a draggable item with a custom data-role attribute node via `itemRole`", () => {

  })

  test("accepts a ref", () => {

  })