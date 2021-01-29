import MOUNT_PREVIEW from "./locators";

// component preview locators
const mountInAppPreview = () => cy.iFrame(MOUNT_PREVIEW);

export default mountInAppPreview;
