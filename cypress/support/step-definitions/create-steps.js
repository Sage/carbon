import { link } from '../../locators';

Then('create children on preview is {string}', (children) => {
  link().children().should('have.text', children);
});

Then('create className on preview is {string}', (classNameParameter) => {
  link().should('have.class', `${classNameParameter}`);
});

Then('Create component has proper inner color {string} and background-color {string} and border color {string}', (color, backgroundColor, borderColor) => {
  link().find('a').should('have.css', 'background-color', backgroundColor)
    .and('have.css', 'border', `1px dashed ${borderColor}`)
    .and('have.css', 'padding', '12px 12px 10px')
    .and('have.css', 'text-align', 'center')
    .and('have.css', 'font-weight', '700');
  link().children().children().first()
    .should('have.css', 'color', color);
});

Then('Create element has golden border on focus', () => {
  link().children().should('have.css', 'outline-color', 'rgb(255, 181, 0)');   
});
