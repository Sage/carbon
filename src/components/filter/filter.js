import React from 'react';
import Form from './../form';

/**
 * @class Filter
 * @constructor
 */
class Filter extends Form {
  static propTypes = {
    /**
     * The component the filter is targetting
     *
     * @property target
     * @type {Object}
     */
    target: React.PropTypes.object,
  }
}

export default Filter;
