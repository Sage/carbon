/**
 * CommonGrid decorator
 *
 * This decorator provides common classes for grids
 *
 * == How to use the CommonGrid decorator:
 *
 * In your file:
 *
 *   import CommonGrid from 'carbon/lib/utils/decorators/common_grid;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyGridComponent = CommonGrid(
 *   class MyGridComponent extends React.Component {
 *     ...
 *   })
 *
 *   export MyGridComponent;
 *
 * This decorator provides methods you can use in your component class:
 *
 *  * `gridClasses` - classes to apply to the main table element
 *  * `gridHeaderClasses` - classes to apply to the thead element
 *  * `gridHeaderRowClasses` - classes to apply to the table heads tr element
 *  * `gridHeaderCellClasses` - classes to apply to the table heads cell elements
 *  * `gridRowClasses` - classes to apply to the table body tr elements
 *  * `gridRowCellClasses` - classes to apply to the table body td cell elements
 *
 */
let CommonGrid = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  /**
   * Extends grid classes to add common-grid
   *
   * @method gridClasses
   * @return {String} concatenated grid classes
   */
  get gridClasses() {
    return 'common-grid ' + (super.gridClasses || '');
  }

  /**
   * Extends grid header classes to add common-grid__header
   *
   * @method gridHeaderClasses
   * @return {String} concatenated grid header classes
   */
  get gridHeaderClasses() {
    return 'common-grid__header ' + (super.gridHeaderClasses || '');
  }

  /**
   * Extends grid header row classes to add common-grid__header__row
   *
   * @method gridHeaderRowClasses
   * @return {String} concatenated grid header row classes
   */
  get gridHeaderRowClasses() {
    return 'common-grid__header__row ' + (super.gridHeaderRowClasses || '');
  }

  /**
   * Extends grid header cell classes to add common-grid__header__cell
   *
   * @method gridHeaderCellClasses
   * @return {String} concatenated grid header cell classes
   */
  get gridHeaderCellClasses() {
    return 'common-grid__header__cell ' + (super.gridHeaderCellClasses || '');
  }

  /**
   * Extends grid row classes to add common-grid__row
   *
   * @method gridRowClasses
   * @return {String} concatenated grid row classes
   */
  get gridRowClasses() {
    return 'common-grid__row ' + (super.gridRowClasses || '');
  }

  /**
   * Extends grid row cell classes to add common-grid__row__cell
   *
   * @method gridRowCellClasses
   * @return {String} concatenated grid row cell classes
   */
  get gridRowCellClasses() {
    return 'common-grid__row__cell ' + (super.gridRowCellClasses || '');
  }
};

export default CommonGrid;
