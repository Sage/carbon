import { css } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';

export default ({
  theme
}) => (
  isClassic(theme) && css`
    color: rgba(0,0,0,.85);
  `
);
