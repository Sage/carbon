import styled, { css } from 'styled-components';
import tabsClassicStyle from './tabs-classic.style';

const StyledTabs = styled.div`
${({ position }) => position === 'top'
  && css`
    margin-top: 15px;
  `}

${({ position }) => position === 'left'
  && css`
    display: flex;
    width: 100%;
  `}
  ${tabsClassicStyle}
`;

export default StyledTabs;
