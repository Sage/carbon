import { commonButtonPreview } from '../../locators';
import { splitToggleButton } from '../../locators/split-button';

Then('Split Button is expanded', () => {
  commonButtonPreview().should('have.length', 5); // 3 expanded buttons, 1 icon button and 1 main button
  splitToggleButton().should('have.attr', 'aria-expanded', 'true');
});
