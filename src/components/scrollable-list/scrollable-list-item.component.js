import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledListItem = styled.li`
  width: 100%;
  padding: 5px 6px;
  ${({ isSelected }) => isSelected && css`background-color: #E6E9E7;`}
  height: 15px;
`;

StyledListItem.propTypes = {
  id: propTypes.number,
  isSelected: propTypes.bool
};

StyledListItem.defaultProps = {
  isSelectable: true
};

export default StyledListItem;
