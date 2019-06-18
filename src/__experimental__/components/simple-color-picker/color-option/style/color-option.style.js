import styled from 'styled-components';
import StyledColorSampleBox from '../../color-sample-box/style/color-sample-box.style';
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

  &:hover {
    cursor: pointer;
    ${StyledColorSampleBox} {
      background-color: ${({ color }) => generateHoverColor(color)};
    }
  }

  ${colorOptionClassicStyles}
`;

StyledColorOption.defaultProps = {
  theme: baseTheme
};

export default StyledColorOption;
