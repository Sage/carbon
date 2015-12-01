import React from 'react';

/**
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * @class Icon
 * @constructor
 */
var Icon = (props) => {
  let { className, type, ...otherProps } = props;

  className = className || '';
  className = `icon-${type} ${className}`;

  return <span className={ className } { ...otherProps }></span>;
};

export default Icon;
