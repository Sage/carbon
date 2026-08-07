import styled from "styled-components";

import { propsForSize as buttonSizeConfig } from "../../../button/__next__/button.config";
import type { DatePickerSize } from "../date-picker";

const CalendarNavigation = styled.div<{ $size: DatePickerSize }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--date-picker-grid-width);
  max-width: 100%;
  min-height: ${({ $size }) => buttonSizeConfig[$size].height};
  margin: 0 auto;
`;

export default CalendarNavigation;
