/**
 * A function to display a warning in the console when a deprecated component is being used in developpment
 */
export default (oldName, newName, env) => {
  if (env === 'development' && oldName.length && newName.length) {
    const carbonDeprecationLabel = '*** CARBON DEPRECATED COMPONENT WARNING *** \n';
    const warnMessage = (
      `${oldName} is marked as deprecated, it will soon be moved to "carbon-graveyard" and be replaced by ${newName}`
    );
    console.warn(carbonDeprecationLabel, warnMessage);
  }
};
