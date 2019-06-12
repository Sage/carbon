import styled from 'styled-components';
import StyledColorSampleBox from './color-sample-box.style';
import colorOptionClassicStyles from './color-option-classic.style';
import baseTheme from '../../../../../style/themes/base';
import generatePalette from '../../../../../style/palette';

const generateHoverColor = (color) => {
  const palette = generatePalette({ color });
  return palette.colorShade(20);
};

const StyledColorOption = styled.li`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  margin-bottom: 2px;
  list-style: none;

  .common-input__field {
    width: 100%;
    height: 100%;
  }

  .common-input__input {
    &:active,
    &:focus {
      border-color: transparent;
    }
  }

  &.common-input + &.common-input {
    margin-top: 0;
  }

  &:hover {
    cursor: pointer;

    ${StyledColorSampleBox} {
      background-color: ${({ color }) => generateHoverColor(color)};
    }
  }

  .carbon-color-option__radio-button-input {
    &:checked + ${StyledColorSampleBox} {
      box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }

    &:focus + ${StyledColorSampleBox} {
      box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
      border: 2px solid ${({ theme }) => theme.colors.focus};
    }

    position: absolute;
    opacity: 0;
    height: 56px;
    width: 56px;
  }

  ${colorOptionClassicStyles}
`;

StyledColorOption.defaultProps = {
  theme: baseTheme
};

export default StyledColorOption;
