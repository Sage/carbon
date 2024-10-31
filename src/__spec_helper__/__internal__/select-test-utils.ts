import { act } from "react-dom/test-utils";
import type { ReactWrapper } from "enzyme";
import { mockResizeObserver } from "jsdom-testing-mocks";

import { StyledSelectListContainer } from "../../components/select/__internal__/select-list/select-list.style";

const resizeObserver = mockResizeObserver();

export function simulateSelectTextboxEvent(
  container: ReactWrapper,
  eventType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...eventArgs: any[]
) {
  const selectText = container.find('input[type="text"]').first();

  selectText.simulate(eventType, ...eventArgs);
  const selectList = container
    .find(StyledSelectListContainer)
    .getDOMNode() as HTMLElement;
  // need to manually trigger a resize to make react-virtual realise that child options should be rendered
  act(() => {
    resizeObserver.mockElementSize(selectList, {
      contentBoxSize: { inlineSize: 500, blockSize: 180 },
    });
    resizeObserver.resize();
  });
  if (eventType === "focus") act(() => jest.runOnlyPendingTimers());
  container.update();
}

export function simulateDropdownEvent(
  container: ReactWrapper,
  eventType: string,
) {
  const dropdown = container.find('[type="dropdown"]').first();

  dropdown.simulate(eventType);
  const selectList = container
    .find(StyledSelectListContainer)
    .getDOMNode() as HTMLElement;
  // need to manually trigger a resize to make react-virtual realise that child options should be rendered
  act(() => {
    resizeObserver.mockElementSize(selectList, {
      contentBoxSize: { inlineSize: 500, blockSize: 180 },
    });
    resizeObserver.resize();
  });
  container.update();
}
