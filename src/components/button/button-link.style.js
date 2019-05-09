import LinkStyle from '../link/link.style';

const buttonLinkStyle = (color, hoverColor) => {
  return `
    ${LinkStyle},
    ${LinkStyle} a {
      color: ${color};
      text-decoration: none;
    }
    
    &:hover ${LinkStyle} a,
    ${LinkStyle} a:hover,
    ${LinkStyle} a:active {
      color: ${hoverColor};
    }
  `;
};

export default buttonLinkStyle;
