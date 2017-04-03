/**
 * Builds props object containing top level data tags
 *
 * @param {String} name of component
 * @param {Object} component props
 * @return {Object} dataTagProps
 */
function tagComponent(component, props) => {
  const tagProps = {
    ['data-component']: component
  }

  if (props.dataElement) { tagProps['data-element'] = props.dataElement };
  if (props.dataRole) { tagProps['data-role'] = props.dataRole };

  return tagProps;
}

export {
  tagComponent
}
