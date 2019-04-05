import styled from 'styled-components';
import { InputPresentation } from '../input';

const StyledInputPresentation = styled(InputPresentation)`
    width: ${({ width }) => (width || 'auto')};
    height: ${({ height }) => (height || 'auto')};
    display: inline-block;
    flex: none;
`;

export default StyledInputPresentation;
