import { MOUNT_PREVIEW } from './locators';

// component preview locators
export const mountInAppPreview = () => cy.iFrame(MOUNT_PREVIEW);
