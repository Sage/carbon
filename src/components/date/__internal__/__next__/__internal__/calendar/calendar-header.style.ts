import styled, { css } from "styled-components";

import SubtleSelect from "../subtle-select";
import type { DatePickerSize } from "../date-picker/date-picker.types";

const heightBySize: Record<DatePickerSize, string> = {
  small: "var(--global-size-s)",
  medium: "var(--global-size-m)",
  large: "var(--global-size-l)",
};

const CalendarHeader = styled.div<{ $size: DatePickerSize }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  max-width: 100%;
  min-height: ${({ $size }) => heightBySize[$size]};
  margin: 0 auto;
`;

const selectorStyles = css`
  width: max-content;
  min-width: var(--global-size-4-xl);
  min-height: var(--global-size-s);
`;

const Month = styled(SubtleSelect)`
  ${selectorStyles}
`;

const Year = styled(SubtleSelect)`
  ${selectorStyles}
`;

export { CalendarHeader, Month, Year };
