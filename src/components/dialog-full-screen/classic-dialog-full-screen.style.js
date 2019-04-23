import { css } from 'styled-components';
import { THEMES } from '../../style/themes';

const ClassicDialogFullScreenHeadingStyle = ({ theme }) => theme.name === THEMES.classic && css`
  background-color: #e6ebed;
`;

export default ClassicDialogFullScreenHeadingStyle;
