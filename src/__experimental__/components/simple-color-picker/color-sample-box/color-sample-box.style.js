import styled, { css } from 'styled-components';
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

  ${({ color }) => color === 'transparent' && css`
    background: conic-gradient(#fff 0deg ,#fff 90deg,
                grey 90deg,grey 180deg,
                #fff 180deg,#fff 270deg,
                grey 270deg,grey 360deg)
                0 0/25% 25%;
  `}

  ${colorSampleBoxClassicStyle}
`;

StyledColorSampleBox.propTypes = {
  color: PropTypes.string
};

export default StyledColorSampleBox;
