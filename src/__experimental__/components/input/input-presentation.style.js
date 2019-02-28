import styled from 'styled-components';
import queryTheme from '../../../style/utils/query-theme';
import baseTheme from '../../../style/themes/base';

const InputPresentationStyle = styled.div`
  ${queryTheme('inputPresentation')}
`;

InputPresentationStyle.defaultProps = {
  theme: baseTheme,
  large: true
};

export default InputPresentationStyle;
