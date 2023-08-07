import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import Accordion from "./accordion.component";
import useResizeObserver from "../../../../hooks/__internal__/useResizeObserver";
import { StyledContentContainer, StyledContent } from "./accordion.style";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";

jest.mock("../../../../hooks/__internal__/useResizeObserver");

describe("Accordion", () => {
  it("matches the expected styles", () => {
    const wrapper = mount(<Accordion>Content</Accordion>);

    assertStyleMatch(
      {
        backgroundColor: "var(--colorsActionMinor050)",
      },
      wrapper.find(StyledContentContainer)
    );

    assertStyleMatch(
      {
        padding: "24px",
        position: "relative",
        zIndex: "200",
      },
      wrapper.find(StyledContent)
    );
  });

  describe("resize observer", () => {
    it("recalculates the content height", () => {
      const wrapper = mount(<Accordion expanded>Content</Accordion>);

      act(() => {
        jest
          .spyOn(
            wrapper.find(StyledContent).getDOMNode(),
            "scrollHeight",
            "get"
          )
          .mockImplementation(() => 200);
      });

      jest
        .spyOn(wrapper.find(StyledContent).getDOMNode(), "scrollHeight", "get")
        .mockImplementation(() => 400);

      act(() => {
        global.innerWidth = 500;
        global.innerHeight = 500;

        const useResizeObserverMock = useResizeObserver as jest.Mock;
        useResizeObserverMock.mock.calls[
          useResizeObserverMock.mock.calls.length - 1
        ][1]();
      });
      wrapper.update();

      assertStyleMatch(
        {
          maxHeight: `400px`,
        },
        wrapper.find(StyledContentContainer)
      );
    });
  });
});
