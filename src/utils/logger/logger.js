/* Logger Function
 *
 * @param {String} message Message to output
 * @param {String} type Console Type e.g. log, warn, error
 * @param {String} env Enviroment. E.g. production
 *
 * env should be injected with process.env.NODE_ENV which is set in the build task
 */
export default (message, type, env) => {
  if (env !== 'production') {
    console[type](message); // eslint-disable-line no-console
  }
};
