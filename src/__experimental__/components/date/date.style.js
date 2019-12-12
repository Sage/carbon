import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import InputPresentationStyle from '../input/input-presentation.style';
import dateClassicStyle from './date-classic.style';
import OptionsHelper from '../../../utils/helpers/options-helper';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';

const datePickerWidth = {
  large: '140px',
  medium: '135px',
  small: '120px'
};

const StyledDateInput = styled.div`
  width: 100%;
  display: inline-block;
  ${ValidationIconStyle}{
      margin-left: 0;
    }
  & ${InputPresentationStyle} {
    flex: none;
    width: ${({ size }) => (size ? datePickerWidth[size] : '135px')};
  }

  ${dateClassicStyle}
`;

StyledDateInput.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted)
};

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
