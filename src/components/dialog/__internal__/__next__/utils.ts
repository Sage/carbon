const canHaveProperties = (value: unknown): value is object =>
  value !== null && (typeof value === "object" || typeof value === "function");

const hasDialogHeadingStatusMarker = (value: unknown) =>
  canHaveProperties(value) &&
  "$$carbonDialogHeadingStatus" in value &&
  value.$$carbonDialogHeadingStatus;

export const isDialogHeadingStatusComponent = (componentType: unknown) =>
  hasDialogHeadingStatusMarker(componentType) ||
  (canHaveProperties(componentType) &&
    "type" in componentType &&
    hasDialogHeadingStatusMarker(componentType.type));

export default isDialogHeadingStatusComponent;
