import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '../table-cell';
import TableRow from '../table-row';

const content = (_content) => {
  if (_content) {
    return _content;
  }

  return I18n.t('table.no_data', { defaultValue: 'No results to display' });
};

const EmptyTable = props => (
  <TableRow
    className='carbon-table-empty-table'
    key='__loading__' selectable={ false }
    highlightable={ false }
  >
    <TableCell colSpan='42' align='center'>
      { content(props.content) }
    </TableCell>
  </TableRow>
);

EmptyTable.propTypes = {
  content: PropTypes.node
};

export default EmptyTable;
