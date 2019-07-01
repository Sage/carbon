import styled, { css } from 'styled-components';
import { THEMES } from '../../../../../style/themes';

const StyledColorOption = styled.li`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  margin-bottom: 2px;
  list-style: none;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.name === THEMES.classic && css`
    margin-right: 1px;
    margin-bottom: 1px;
  `};
`;

export default StyledColorOption;
