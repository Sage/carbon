import styled from 'styled-components';
import Fieldset from '../fieldset';
import { LegendContainerStyle } from '../fieldset/fieldset.style';

const SimpleColorFieldset = styled(Fieldset)`
  max-width: 300px;

  ${LegendContainerStyle} {
    margin-bottom: 16px;
    height: 26px;

    legend {
      font-size: 14px;
      margin-left: -2px;
    }
  }
`;

const StyledColorOptions = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export { SimpleColorFieldset, StyledColorOptions };
