import styled from 'styled-components';
import StyledDateInput from '../date/date.style';

const StyledDateRange = styled.div`
  & ${StyledDateInput} {
     display: inline-block;
     vertical-align: ${({ labelsInline }) => (labelsInline ? 'top' : 'bottom')};
  }

  & ${StyledDateInput}:first-child {
    margin-right: 15px;
  }
`;

export default StyledDateRange;
