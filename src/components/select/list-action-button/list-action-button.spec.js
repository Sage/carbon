import React, { useRef } from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import ListActionButton from "./list-action-button.component";
import Button from "../../button";
import I18next from "../../../__spec_helper__/I18next";

const RenderWrapper = React.forwardRef(({ ...props }, ref) => {
  return (
    <I18next>
      <ListActionButton {...props} ref={ref} />
    </I18next>
  );
});

describe("Option", () => {
  it("renders properly", () => {
    expect(renderListActionButton({}, TestRenderer.create)).toMatchSnapshot();
  });

  it("the button ref should be forwarded", () => {
    let mockRef;
    const defaultAction = () => {};

    const WrapperComponent = () => {
      mockRef = useRef();

      return (
        <RenderWrapper
          listActionButton
          onListAction={defaultAction}
          ref={mockRef}
        />
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef.current).toBe(wrapper.find("button").getDOMNode());
  });

  describe("when a custom button is provided in the listActionButton prop", () => {
    let wrapper;
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
        wrapper.find('[data-element="test-button"]').at(0).simulate("click");
        expect(onListActionFn).toHaveBeenCalled();
      });
    });
  });
});

function renderListActionButton(props, renderer = mount) {
  let { onListAction } = props;
  const defaultAction = () => {};

  if (!onListAction) {
    onListAction = defaultAction;
  }

  return renderer(<RenderWrapper onListAction={onListAction} {...props} />);
}
