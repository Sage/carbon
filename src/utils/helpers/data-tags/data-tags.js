/**
 * Builds props object containing top level data tags
 *
 * @param {String} name of component
 * @param {Object} name of component
 * @return {Object} dataTagProps
 */

export default (component, props) => {
  const dataTagProps = {
    ['data-component']: component
  }

  if (props.dataElement) { dataTagProps['data-element'] = props.dataElement };
  if (props.dataRole) { dataTagProps['data-role'] = props.dataRole };

  return dataTagProps;
}
