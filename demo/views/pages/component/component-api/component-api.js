import React from 'react';
import Icon from 'components/icon';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';
import PageContentArea from './../../../common/page-content-area';

class ComponentAPI extends React.Component {
  render() {
    const propsTitle = `Props for ${this.props.definition.get('name')} Component`;
    return (
      <PageContentArea
        title={ propsTitle }
      >
        <Table
          shrink={ true }
          className='demo-component-api'
          caption={ propsTitle }
          thead={ this._tableHeader() }
        >
          { this._buildRows() }
        </Table>
      </PageContentArea>
    );
  }

  _tableHeader = () => {
    return (
      <TableRow key="header">
        <TableHeader scope='col'>Name</TableHeader>
        <TableHeader scope='col'>Required</TableHeader>
        <TableHeader scope='col'>Type</TableHeader>
        <TableHeader scope='col'>Default</TableHeader>
        <TableHeader scope='col'>Description</TableHeader>
      </TableRow>
    );
  }

  _buildRows = () => {
    const rows = [];

    this.props.definition.get('props').sort().forEach((prop, index) => {
      rows.push(
        <TableRow key={ index }>
          <TableCell className="demo-component-api__cell">{ prop }</TableCell>
          <TableCell className="demo-component-api__cell" align='center'>
            { this._isRequired(prop) }
          </TableCell>
          <TableCell className="demo-component-api__cell">{ this._type(prop) }</TableCell>
          <TableCell className="demo-component-api__cell demo-component-api__default">{ this._default(prop) }</TableCell>
          <TableCell className="demo-component-api__cell">{ this._description(prop) }</TableCell>
        </TableRow>
      );
    });

    return rows;
  }

  _isRequired = (prop) => {
    if (this.props.definition.get('requiredProps').includes(prop)) {
      return <Icon type="tick" className="demo-component-api__tick" />
    }
  }

  _type = (prop) => {
    return this.props.definition.getIn(['propTypes', prop]);
  }

  _default = (prop) => {
    let value = this.props.definition.getIn(['defaultProps', prop]);

    if (typeof value === "boolean") {
      value = String(value);
    }

    return value;
  }

  _description = (prop) => {
    return this.props.definition.getIn(['propDescriptions', prop]);
  }
}

export default ComponentAPI;
