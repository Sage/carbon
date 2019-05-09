import { icon } from '../../locators';
import { tooltipPreview } from '../../locators/help';

const POSITION = 'carbon-tooltip--position-';
const ALIGN = 'carbon-tooltip--pointer-align-';

Then('tooltipPosition is set to {string}', (tooltipPosition) => {
  tooltipPreview().then(($tooltip) => { $tooltip.hasClass(`${POSITION}${tooltipPosition}`); });
  icon().trigger('mouseover');
  tooltipPreview().should('have.class', `${POSITION}${tooltipPosition}`);
});

Then('tooltipAlign is set to {string}', (tooltipAlign) => {
  tooltipPreview().then(($tooltip) => { $tooltip.hasClass(`${ALIGN}${tooltipAlign}`); });
  icon().trigger('mouseover');
  tooltipPreview().should('have.class', `${ALIGN}${tooltipAlign}`);
});
