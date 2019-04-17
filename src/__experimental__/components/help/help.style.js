import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';

const StyledHelp = styled.a`
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-left: 8px;
  text-decoration: none;
  top: -1px;

  &:hover {
    color: $blue;
    text-decoration: underline;
  }
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

StyledHelp.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  size: PropTypes.string
};

export default StyledHelp;
