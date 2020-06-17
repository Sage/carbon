import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledCounter = styled.div`
  ${({ theme }) => `
    color: ${theme.editor.counter};
    margin-top: 10px;
    min-width: 40px;
    height: 21px;
    float: right;
    font-size: 14px;
  `}
`;

StyledCounter.defaultProps = {
  theme: baseTheme
};

export default StyledCounter;
