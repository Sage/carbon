import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: ${props => (props.width ? props.width : 'auto')};
  height: ${props => (props.height ? props.height : 'auto')};
  font-size: ${({ size, theme }) => getFontSize(size, theme.field.text.size)};
  padding: ${({ size, theme }) => getPadding(size, theme.field.padding)}
  border: none;
`;

function getFontSize(size, sizes) {
  switch (size) {
    case 'large':
      return sizes.secondary;
    case 'medium':
    case 'small':
      return sizes.primary;
    default:
      return 'inherit';
  }
}

function getPadding(size, paddings) {
  switch (size) {
    case 'large':
      return paddings.tertiary;
    case 'medium':
      return paddings.secondary;
    case 'small':
      return paddings.primary;
    default:
      return 'auto';
  }
}

export default StyledTextarea;
