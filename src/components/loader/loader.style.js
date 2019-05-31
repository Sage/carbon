import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledLoader = styled.div`
  padding: 0 3px 3px 0;
  text-align: center;
`;

StyledLoader.defaultProps = {
  theme: baseTheme
};

StyledLoader.propTypes = {
  theme: PropTypes.object
};

export default StyledLoader;
