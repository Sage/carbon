import Logger from "../../logger";
/**
 * A function to display a warning in the console when a deprecated component is being used in developpment
 */
export default (oldName, newName) => {
  if (
    process.env.NODE_ENV === "development" &&
    oldName.length &&
    newName.length
  ) {
    const warnMessage = `${oldName} is marked as deprecated, it will soon be moved to "carbon-graveyard" and be replaced by ${newName}`;
    Logger.deprecate(warnMessage);
  }
};
