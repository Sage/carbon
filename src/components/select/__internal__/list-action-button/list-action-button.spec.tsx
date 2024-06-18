import React, { useRef } from "react";
import TestRenderer from "react-test-renderer";
import { shallow, mount, ShallowWrapper } from "enzyme";
import ListActionButton, { ListActionButtonProps } from ".";
import Button from "../../../button";

function renderListActionButton(
  props: Partial<ListActionButtonProps>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any = shallow
) {
  const componentProps = { ...props };
  if (!componentProps.onListAction) {
    componentProps.onListAction = () => {};
  }

  return renderer(
    <ListActionButton {...(componentProps as ListActionButtonProps)} />
  );
}

describe("Option", () => {
  it("renders properly", () => {
    expect(renderListActionButton({}, TestRenderer.create)).toMatchSnapshot();
  });

  it("the button ref should be forwarded", () => {
    let mockRef: React.RefObject<HTMLButtonElement> | undefined;
    const defaultAction = () => {};

    const WrapperComponent = () => {
      mockRef = useRef(null);

      return (
        <ListActionButton
          listActionButton
          onListAction={defaultAction}
          ref={mockRef}
        />
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef?.current).toBe(wrapper.find("button").getDOMNode());
  });

  describe("when a custom button is provided in the listActionButton prop", () => {
    let wrapper: ShallowWrapper;
    const onListActionFn = jest.fn();

    beforeEach(() => {
      wrapper = renderListActionButton({
        listActionButton: (
          <Button data-element="test-button">Test Button</Button>
        ),
        onListAction: onListActionFn,
      });
    });

    it("then that button should be rendered", () => {
      expect(wrapper.find('[data-element="test-button"]').exists()).toBe(true);
    });

    describe("and that button has been clicked", () => {
      it("then the onListAction prop should have been called", () => {
        onListActionFn.mockClear();
        wrapper.find('[data-element="test-button"]').simulate("click");
        expect(onListActionFn).toHaveBeenCalled();
      });
    });
  });
});
