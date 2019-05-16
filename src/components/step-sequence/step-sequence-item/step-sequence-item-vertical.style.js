import { css } from 'styled-components';

const StepSequenceItemVerticalStyle = css`
  flex-direction: column;
  align-items: flex-start;

  &::before {
    flex-grow: 0;
    width: 1px;
    height: 25px;
    margin: 12px 8px;
  }
`;

export default StepSequenceItemVerticalStyle;
