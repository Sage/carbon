import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledColorSampleBox = styled.div`
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px transparent;

  ${({ color }) => (color === 'transparent' || color === 'none')
    && css`
      border-color: #b3c2c8;
    `}
`;

StyledColorSampleBox.propTypes = {
  color: PropTypes.string
};

export default StyledColorSampleBox;
