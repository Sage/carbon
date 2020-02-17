import { link } from '../../locators';

Then('create children on preview is {string}', (children) => {
  link().children().should('have.text', children);
});

Then('create className on preview is {string}', (classNameParameter) => {
  link().should('have.class', `${classNameParameter}`);
});

Then('Create component has proper inner color {string} and background-color {string} and border color {string}', (color, backgroundColor, borderColor) => {
  link().children().should('have.css', 'background-color', backgroundColor)
    .and('have.css', 'border', `1px dashed ${borderColor}`)
    .and('have.css', 'padding', '12px 12px 10px')
    .and('have.css', 'text-align', 'center')
    .and('have.css', 'font-weight', '700');
  link().children().children().first()
    .should('have.css', 'color', color);
});

Then('Create element has {word} border on focus', (borderColor) => {
  switch (borderColor) {
    case 'golden':
      link().children().should('have.css', 'outline', 'rgb(255, 181, 0) solid 3px');
      break;
    case 'blue':
      link().children().should('have.css', 'outline', 'rgba(0, 103, 244, 0.247) auto 5px');
      break;
    default: throw new Error('There are only two possible focus outline colors');
  }
});
