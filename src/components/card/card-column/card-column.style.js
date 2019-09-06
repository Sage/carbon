import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledCardColumn = styled.div`
  flex-grow: 1;
  ${({ align }) => css`
    text-align: ${align};
  `}
`;

StyledCardColumn.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  theme: PropTypes.object
};

StyledCardColumn.defaultProps = {
  align: 'center',
  theme: BaseTheme
};

export default StyledCardColumn;
/*
{
  "name": "classic",
  "colors": {
    "base": "#00A376",
    "primary": "#00805D",
    "secondary": "#006045",
    "tertiary": "#003F2E",
    "brand": "#00DC00",
    "disabled": "#66C166",
    "whiteMix": "#E5F4E5",
    "withOpacity": "rgba(0,163,118,0.55)",
    "black": "#000000",
    "slate": "#003349",
    "white": "#FFFFFF",
    "border": "#668491",
    "focusedIcon": "#335B6D",
    "focusedLinkBackground": "#FFDA7F",
    "previewBackground": "#BFCCD1",
    "hoveredTabKeyline": "#4CB74C",
    "error": "#C7384F",
    "focus": "#FFB500",
    "info": "#0073C2",
    "success": "#00B000",
    "warning": "#FFB500",
    "destructive": {
      "hover": "#9F2C3F"
    },
    "baseBlue": "#255BC7",
    "greyDarkBlue50": "#8099a4"
  },
  "form": {
    "invalid": "#F2F4F5"
  },
  "card": {
    "footerBackground": "#F2F4F5",
    "footerBorder": "#CCD6DA",
    "footerText": "#006B00",
    "middlePrimary": "rgba(0,0,0,0.74)",
    "middleSecondary": "rgba(0,0,0,0.65)",
    "middleTertiary": "rgba(0,0,0,0.55)"
  },
  "carousel": {
    "activeSelectorBackground": "#668491",
    "inactiveSelectorBackground": "#CCD6DA"
  },
  "help": {
    "color": "rgba(0,0,0,0.65)",
    "hover": "rgba(0,0,0,0.9)"
  },
  "text": {
    "color": "rgba(0,0,0,0.9)",
    "placeholder": "rgba(0,0,0,0.3)",
    "size": "14px"
  },
  "disabled": {
    "border": "#4d7080",
    "button": "#E5EAEC",
    "disabled": "#b3c2c8",
    "input": "#1e499f",
    "text": "#003349",
    "buttonText": "rgba(0,0,0,.2)",
    "background": "#E5EAEC",
    "switch": "#E4E9EB"
  },
  "table": {
    "primary": "#F2F4F5",
    "secondary": "#CCD6DA",
    "tertiary": "#19475B",
    "header": "#335B6D",
    "hover": "#E5EAEC",
    "selected": "#D8E0E3",
    "zebra": "#F9FAFB"
  },
  "pager": {
    "active": "rgba(0,0,0,0.74)",
    "disabled": "rgba(0,0,0,0.55)",
    "hover": "rgba(0,0,0,0.90)"
  },
  "rainbow": {
    "textColor": "#003349"
  },
  "icon": {
    "default": "rgba(0,0,0,0.65)",
    "defaultHover": "rgba(0,0,0,0.90)",
    "onLightBackground": "#668491",
    "onLightBackgroundHover": "#335B6D",
    "disabled": "rgba(0,0,0,0.30)"
  },
  "portrait": {
    "border": "#7F99A4",
    "background": "#F2F4F5",
    "initials": "rgba(0,0,0,0.65)"
  },
  "pill": {
    "neutral": "#4C707F",
    "warning": "#ED8333",
    "neutralBackgroundFocus": "#19475B",
    "warningButtonFocus": "#E96400",
    "errorButtonFocus": "#9F2C3F"
  },
  "select": {
    "border": "#bfccd2",
    "selected": "#F2F4F5"
  },
  "shadows": {
    "depth1": "0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1)",
    "depth2": "0 10px 20px 0 rgba(0,20,29,0.2), 0 20px 40px 0 rgba(0,20,29,0.1)",
    "depth3": "0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1)",
    "depth4": "0 10px 40px 0 rgba(0,20,29,0.04), 0 50px 80px 0 rgba(0,20,29,0.1)",
    "cards": "0 3px 3px 0 rgba(0,20,29,0.2),0 2px 4px 0 rgba(0,20,29,0.15)"
  },
  "switch": {
    "off": "#CCD6DB"
  },
  "tile": {
    "border": "#CCD6DA",
    "separator": "#E5EAEC"
  }
}*/