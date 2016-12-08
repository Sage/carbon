import React from 'react';
import classNames from 'classnames';

/**
 * Creates a pod content holder
 *
 * @param {Object} props
 * @param {String} props.as - theme defaults to 'primary'
 * @param {String} props.border - defaults to true
 * @param {String} props.padding - defaults to 'medium'
 * @param {Object} props.contentEdit
 * @param {Boolean} props.contentEdit.showEditButton
 * @param {Boolean} props.contentEdit.triggerOnContentClick
 * @return {PodContent}
 */
let PodContent = props =>
  <div
    className={ _classes(props) }
    onClick= { _contentEditAction(props) }
  >
    { props.children }
  </div>;

PodContent.propTypes = {
  as: React.PropTypes.string,
  border: React.PropTypes.bool,
  contentEdit: React.PropTypes.object,
  padding: React.PropTypes.string
};
PodContent.defaultProps = {
  as: 'primary',
  border: true,
  contentEdit: {
    showEditButton: false,
    triggerOnContentClick: false,
  },
  padding: 'medium'
};

/**
 * retrieves classes for this compo
 *
 * @private
 * @method _classes
 * @param {Object} classes - formatted as an object for processing, will contain various props
 * @return {String} classes in HTML attribute format
 */
const _classes = (classes) => {
  return classNames(
    'carbon-pod-content',
    `carbon-pod-content--${classes.as}`,
    `carbon-pod-content--padding-${classes.padding}`, {
      'carbon-pod-content--border': classes.border
    }
  );
};

/**
 * decides whether to add the edit action to the content
 *
 * @private
 * @method _contentEditAction
 * @param {Object} props - formatted as an object for processing, will contain various props
 * @return {Boolean}
 */
const _contentEditAction = (props) => {
  if ((props.contentEdit.triggerOnContentClick || !props.contentEdit.showEditButton) && props.editAction) {
    return props.editAction;
  }
};

export default PodContent;
