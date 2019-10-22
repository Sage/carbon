import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({ theme }) => isClassic(theme) && css`
    color: #003349;
    font-size: 14px;
    font-weight: bold;
    line-height: 14px;
    margin: 0 0 8px 0;
    padding: 0 6px;
`;
