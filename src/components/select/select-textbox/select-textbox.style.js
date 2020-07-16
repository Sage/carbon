import styled from 'styled-components';
import InputPresentationStyle from '../../../__experimental__/components/input/input-presentation.style';
import InputIconToggleStyle from '../../../__experimental__/components/input-icon-toggle/input-icon-toggle.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import sizes from '../../../__experimental__/components/input/input-sizes.style';

const StyledSelectTextbox = styled.div`
  ${StyledInput} {
    padding-left: ${({ size }) => sizes[size].horizontalPadding};
  }

  ${InputPresentationStyle} {
    padding-left: 0;
    padding-right: 0;
  }

  ${InputIconToggleStyle} {
    margin-right: 0;
  }
`;

StyledSelectTextbox.defaultProps = {
  size: 'medium'
};

export default StyledSelectTextbox;
