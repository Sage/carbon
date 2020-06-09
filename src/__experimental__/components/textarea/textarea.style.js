import styled, { css } from 'styled-components';
import StyledInput from '../input/input.style';
import StyledLabel from '../label/label.style';
import InputIconToggleStyle from '../input-icon-toggle/input-icon-toggle.style';

const StyledTextarea = styled.div`
  ${StyledInput} {
    resize: none;
    min-height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  ${({ labelInline }) => labelInline && css`
    ${StyledLabel} {
      padding-top: 8px;
    }
  `}

  ${InputIconToggleStyle} {
    height: 40px;
  }
`;

export default StyledTextarea;
