import { css } from 'styled-components';

export const modernStyleConfig = {
  small: {
    colors: {
      neutral: '#4D7080',
      negative: '#C7384F',
      warning: '#E96400',
      positive: '#00b000'
    }
  },
  medium: {
    colors: {
      neutral: '#4D7080',
      negative: '#C7384F',
      warning: '#E96400',
      positive: '#00b000'
    }
  },
  large: {
    colors: {
      neutral: '#4D7080',
      negative: '#C7384F',
      warning: '#E96400',
      positive: '#00b000'
    }
  }
};

export default (props) => {
  const { theme, styledAs } = props;
  const styleSet = modernStyleConfig[theme.name];

  return css`
      border: 2px solid ${styleSet.colors[styledAs]};
      border-radius: 14px;
      font-size: 14px;
      padding: 2px 7px;
      font-weight: 700;
    `;
};
