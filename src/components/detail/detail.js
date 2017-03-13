import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from './../icon';

const propTypes = {
  icon:     PropTypes.string,
  footnote: PropTypes.string,
  children: PropTypes.node
}

const Detail = (props) => {
  return (
    <div className={ classes(props.className, props.icon) }>
      { renderIcon(props.icon) }

      <div className="carbon-detail__content">
        { props.children }
      </div>

      { renderFootnote(props.footnote) }
    </div>
  );
}

/**
 * Concatenates the classes for the top level element in the component.
 *
 * @private
 * @method classes
 * @param {String} className - classes passed down to this instance.
 * @param {String} icon - the specified icon used for this instance.
 * @return {String}
 */
function classes(className, icon) {
  return classNames(
    "carbon-detail",
    className, {
      "carbon-detail--has-icon": icon
    }
  );
}

/**
 * Returns the markup for the icon, if one is specified.
 *
 * @private
 * @method icon
 * @param {String} icon - the specified icon used for this instance.
 * @return {Node}
 */
function renderIcon(icon) {
  if (!icon) { return null; }
  return <Icon className="carbon-detail__icon" type={ icon } />;
}

/**
 * Returns the markup for the footnote, if ones is specified.
 *
 * @private
 * @method renderFootnote
 * @param {String} footnote - the string to render for the footnote.
 * @return {Node}
 */
function renderFootnote(footnote) {
  if (!footnote) { return null; }

  return (
    <div className="carbon-detail__footnote">
      { footnote }
    </div>
  );
}

// assign the propTypes to the component
Detail.propTypes = propTypes;

export default Detail;
