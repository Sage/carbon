import classNames from 'classnames';
import TableHeader from './../table-header';

/**
 * A TableSubheader widget.
 * An extension of the TableHeader class which caters for differences in styling.
 */
class TableSubheader extends TableHeader {
  /**
   * Returns classes to be used on the TH element.
   *
   * @method tableHeaderClasses
   * @return {String}
   */
  tableHeaderClasses () {
    return classNames(
      'carbon-table-subheader',
      super.tableHeaderClasses()
    );
  }

  componentTags(props) {
    return {
      'data-component': 'table-sub-header',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

export default TableSubheader;
