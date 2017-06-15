/**
 * Builds props object containing top level data tags
 *
 * @param {String} name of component
 * @param {Object} component props
 * @return {Object} dataTagProps
 */
function tagComponent(component, props) {
  const tagProps = {};

  tagProps['data-component'] = props['data-component'] ? props['data-component'] : component;
  if (props['data-element']) { tagProps['data-element'] = props['data-element']; }
  if (props['data-role']) { tagProps['data-role'] = props['data-role']; }

  return tagProps;
}

export {
  tagComponent
};
