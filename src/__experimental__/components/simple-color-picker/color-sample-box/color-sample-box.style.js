import styled from 'styled-components';
import PropTypes from 'prop-types';
import colorSampleBoxClassicStyle from './color-sample-box-classic.style';

const StyledColorSampleBox = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  background-color: ${({ color }) => color};

  ${colorSampleBoxClassicStyle}
`;

StyledColorSampleBox.propTypes = {
  color: PropTypes.string
};

export default StyledColorSampleBox;
