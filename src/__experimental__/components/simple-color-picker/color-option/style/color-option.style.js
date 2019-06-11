import styled from 'styled-components';
import StyledColorSampleBox from './color-sample-box.style';
import StyledTickIcon from './tick-icon.style';

const StyledColorOption = styled.li`
  float: left;
  margin-right: 1px;
  margin-bottom: 1px;
  list-style: none;

  &.common-input + &.common-input {
    margin-top: 0;
  }

  .carbon-color-option__radio-button-input {
    &:checked + ${StyledColorSampleBox} {
      ${StyledTickIcon} {
        display: block;
      }
    }

    &:hover {
      cursor: pointer;
    }

    &:focus + ${StyledColorSampleBox} {
      border-color: #003349;
    }

    position: absolute;
    opacity: 0;
    height: 56px;
    width: 56px;
  }
`;

export default StyledColorOption;
