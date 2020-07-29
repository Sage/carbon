import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledHr = styled.hr`
  width: inherit;
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.hr.background};
  margin-top: ${({ marginTop, theme }) => marginTop * theme.spacing}px;
  margin-bottom: ${({ marginBottom, theme }) => marginBottom * theme.spacing}px;
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
`;

StyledHr.propTypes = {
  marginTop: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  marginBottom: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string
};

StyledHr.defaultProps = {
  theme: baseTheme
};

export default StyledHr;
