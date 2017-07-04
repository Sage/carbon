import React from 'react';
import PropTypes from 'prop-types';
import { ConfigurableColumns, ConfigurableColumnRow } from './../../components/configurable-columns';

class ConfigurableColumnsPattern extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Column data for the configurable table.
     *
     * @property columnsData
     * @type {Object}
     */
    columnsData: PropTypes.object,

    /**
     * Callback triggered when the form is canceled.
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: PropTypes.func.isRequired,

    /**
     * Callback triggered when the checkbox checked value is updated.
     *
     * @property onChange
     * @type {Function}
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Callback triggered when an item is dragged.
     *
     * @property onDrag
     * @type {Function}
     */
    onDrag: PropTypes.func.isRequired,

    /**
     * Callback triggered when when the reset button is pressed.
     *
     * @property onReset
     * @type {Function}
     */
    onReset: PropTypes.func,

    /**
     * Callback triggered when the form is saved.
     *
     * @property onSave
     * @type {Function}
     */
    onSave: PropTypes.func.isRequired
  }

  onChange = (rowId) => {
    return () => {
      this.props.onChange(rowId);
    };
  }

  rows = (columnsData) => {
    return (
      <ol className='carbon-configurable-columns__columns-wrapper'>
        {
          columnsData.map((column, rowIndex) => {
            return (
              <ConfigurableColumnRow
                enabled={ column.get('enabled') }
                key={ rowIndex }
                locked={ column.get('locked') }
                name={ column.get('name') }
                rowIndex={ rowIndex }
                onChange={ this.onChange(rowIndex) }
              />
            );
          })
        }
      </ol>
    );
  }

  render() {
    const { columnsData, ...configurableColumnsProps } = this.props;
    return (
      <ConfigurableColumns { ...configurableColumnsProps } >
        { this.rows(columnsData) }
      </ConfigurableColumns>
    );
  }
}

export default ConfigurableColumnsPattern;
