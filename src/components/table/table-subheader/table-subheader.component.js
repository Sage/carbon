import TableHeader from '../table-header';
import './table-subheader.scss';

/**
 * A TableSubheader widget.
 * An extension of the TableHeader class which caters for differences in styling.
 */
class TableSubheader extends TableHeader {
  componentTags(props) {
    return {
      'data-component': 'table-sub-header',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

export default TableSubheader;
