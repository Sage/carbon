import React from 'react';
import PageContentArea from './../../../common/page-content-area';
import Icon from 'components/icon';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

class ComponentAPI extends React.Component {
  render() {
    return (
      <PageContentArea
        title={ "Props for " + this.props.definition.get('name') + " Component" }
      >
        <Table shrink={ true } className="component-api">
          { this._buildRows() }
        </Table>
      </PageContentArea>
    );
  }

  _buildRows = () => {
    let rows = [(
      <TableRow key="header">
        <TableHeader>Name</TableHeader>
        <TableHeader>Required</TableHeader>
        <TableHeader>Type</TableHeader>
        <TableHeader>Default</TableHeader>
        <TableHeader>Description</TableHeader>
      </TableRow>
    )];

    this.props.definition.get('props').sort().forEach((prop, index) => {
      rows.push(
        <TableRow key={ index }>
          <TableCell className="component-api__cell">{ prop }</TableCell>
          <TableCell className="component-api__cell component-api__cell--align-center">
            { this._isRequired(prop) }
          </TableCell>
          <TableCell className="component-api__cell">{ this._type(prop) }</TableCell>
          <TableCell className="component-api__cell">{ this._default(prop) }</TableCell>
          <TableCell className="component-api__cell">{ this._description(prop) }</TableCell>
        </TableRow>
      );
    });

    return rows;
  }

  _isRequired = (prop) => {
    if (this.props.definition.get('requiredProps').includes(prop)) {
      return <Icon type="tick" className="component-api__tick" />
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
