import styled from 'styled-components';
import LabelStyle from '../../__experimental__/components/label/label.style';

const StyledInlineInputs = styled.div`
  display: flex;
  align-items: center;

  ${LabelStyle} {
    font-weight: bold;
  }

  input {
    width: 100%;
  }
`;

export default StyledInlineInputs;
