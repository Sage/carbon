import styled from 'styled-components';
import InputPresentationStyle from '../input/input-presentation.style';

const StyledDateInput = styled.div`
    & ${InputPresentationStyle} {
      box-sizing: content-box;
      flex: none;
      width: 120px;
    }
`;

export default StyledDateInput;
