import styled from 'styled-components';
import queryTheme from '../../../style/utils/query-theme';
import BaseTheme from '../../../style/themes/base';

const InputIconToggleStyle = styled.label`
  ${queryTheme('inputIconToggle')}
`;

InputIconToggleStyle.defaultProps = {
  theme: BaseTheme,
  large: true
};

export default InputIconToggleStyle;
