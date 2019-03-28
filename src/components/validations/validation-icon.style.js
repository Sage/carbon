import styled from 'styled-components';
import BaseTheme from '../../style/themes/base';

const ValidationIconStyle = styled.div`
  color: ${({ type, theme }) => theme.colors[type]};
  font-size: 13px;
`;

ValidationIconStyle.defaultProps = {
  type: 'error',
  theme: BaseTheme
};

export default ValidationIconStyle;
