import { getComponentNoIframe } from '../build';

export const theme = themeName => cy.get(`[data-theme="${themeName}"]`);
export const buttonToggleComponent = () => getComponentNoIframe('button-toggle').first().find('label');
export const linkComponent = () => getComponentNoIframe('link').find('a');
export const loaderComponent = () => getComponentNoIframe('loader').find('div');
