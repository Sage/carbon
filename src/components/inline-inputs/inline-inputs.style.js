import styled from 'styled-components';
import LabelStyle from '../../__experimental__/components/label/label.style';

const StyledInlineInputs = styled.div`
  display: flex;
  align-items: center;

  ${LabelStyle} {
    font-weight: bold;
    margin-right: 15px;
    width: auto;
  }

  input {
    width: 100%;
  }

  [data-component="carbon-select"] input {
    width: 30px;
  }

  .carbon-row {
    flex-grow: 1;
  }
`;

export default StyledInlineInputs;
