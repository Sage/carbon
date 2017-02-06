import React from 'react';
import PageContentArea from './../../../common/page-content-area';
import Icon from 'components/icon';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class ComponentAPI extends React.Component {
  render() {
    return (
      <PageContentArea
        title='API'
      >
        <Table shrink={ true }>
          { this._buildRows() }
        </Table>
      </PageContentArea>
    );
  }

  _buildRows = () => {
    let rows = [(
      <TableRow>
        <TableHeader>Name</TableHeader>
        <TableHeader>Required</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Default</TableHeader>
        <TableHeader>Description</TableHeader>
      </TableRow>
    )];

    this.props.definition.get('props').sort().forEach((prop) => {
      rows.push(
        <TableRow>
          <TableCell>{ prop }</TableCell>
          <TableCell>{ this._isRequired(prop) }</TableCell>
          <TableCell>{ this._type(prop) }</TableCell>
          <TableCell>{ this._default(prop) }</TableCell>
          <TableCell>{ this._description(prop) }</TableCell>
        </TableRow>
      );
    });

    return rows;
  }

  _isRequired = (prop) => {
    if (this.props.definition.get('requiredProps').includes(prop)) {
      return <Icon type="tick" />
    }
  }

  _type = (prop) => {
    return this.props.definition.getIn(['propTypes', prop]);
  }

  _default = (prop) => {
    return this.props.definition.getIn(['defaultProps', prop]);
  }

  _description = (prop) => {
    return this.props.definition.getIn(['propDescriptions', prop]);
  }
}

export default ComponentAPI;
