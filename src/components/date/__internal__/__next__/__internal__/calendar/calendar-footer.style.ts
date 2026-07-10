import styled from "styled-components";

import Button from "../../../../../button/__next__";

const CalendarFooter = styled(Button)`
  align-self: flex-end;

  @media (max-width: 480px) {
    align-self: stretch;
    width: 100%;
  }
`;

export default CalendarFooter;
