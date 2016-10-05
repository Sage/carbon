import classNames from 'classnames';
import TableHeader from './../table-header';

/**
 * A TableSubHeader widget.
 * An extension of the TableHeader class which caters for differences in styling.
 */
class TableSubHeader extends TableHeader {
  /**
   * Returns classes to be used on the TH element.
   *
   * @method tableHeaderClasses
   * @return {String}
   */
  tableHeaderClasses () {
    return classNames(
      'carbon-table-sub-header',
      super.tableHeaderClasses()
    );
  }
}

export default TableSubHeader;
