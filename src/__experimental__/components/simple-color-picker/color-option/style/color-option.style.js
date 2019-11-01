import styled, { css } from 'styled-components';
import { isClassic } from '../../../../../utils/helpers/style-helper';

const StyledColorOption = styled.li`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  margin-bottom: 2px;
  list-style: none;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => isClassic(theme) && css`
    margin-right: 1px;
    margin-bottom: 1px;
  `};
`;

export default StyledColorOption;
