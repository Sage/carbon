/**
 * Builds props object containing top level data tags
 *
 * @param {String} name of component
 * @param {Object} component props
 * @return {Object} dataTagProps
 */
function tagComponent(component, props) {
  const tagProps = {
    ['data-component']: component
  };

  if (props.element) { tagProps['data-element'] = props.element; }
  if (props.role) { tagProps['data-role'] = props.role; }

  return tagProps;
}

export {
  tagComponent
};
