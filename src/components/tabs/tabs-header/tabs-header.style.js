import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import tabsHeaderClassicStyle from './tabs-header-classic.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTabHeaders = styled.ul`
box-shadow: inset 0px -2px 0px 0px #e5eaec; // TODO: zmienic na kolor z palety
cursor: pointer;
list-style: none;
margin: 0 0 10px;
padding: 0;

${({ align }) => align === 'right'
  && css`
    text-align: right;
  `}

${({ position }) => position === 'vertical'
  && css`
    box-shadow: inset -2px 0px 0px 0px #e5eaec; // TODO: zmienic na kolor z palety
    display: inline-block;
    width: 20%;
    margin: 0 10px 0;
  `}
  ${tabsHeaderClassicStyle}
`;

StyledTabHeaders.defaultProps = {
  align: 'left',
  position: 'horizontal'
};

StyledTabHeaders.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  position: PropTypes.oneOf(OptionsHelper.orientation)
};

export default StyledTabHeaders;
