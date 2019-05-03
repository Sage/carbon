import styled from 'styled-components';
import PropTypes from 'prop-types';
import classicStyledHeader from './table-header-classic.style';
import modernStyledHeader from './table-header-modern.style';
import { THEMES } from '../../../style/themes';

const StyledTableHeader = styled.th`
  ${styleTableHeader}
`;

function styleTableHeader(props) {
  return props.theme.name === THEMES.classic ? classicStyledHeader(props) : modernStyledHeader(props);
}

StyledTableHeader.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', ''])
};

export default StyledTableHeader;
