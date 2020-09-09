import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledHr = styled.hr`
  width: inherit;
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.hr.background};
  margin-top: ${({ mt, theme }) => mt * theme.spacing}px;
  margin-bottom: ${({ mb, theme }) => mb * theme.spacing}px;
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
`;

StyledHr.propTypes = {
  mt: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  ml: PropTypes.string,
  mr: PropTypes.string
};

StyledHr.defaultProps = {
  theme: baseTheme
};

export default StyledHr;
