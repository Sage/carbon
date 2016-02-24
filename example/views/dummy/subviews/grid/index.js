import React from 'react';
import FinancesActions from './../../../../actions/finances';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';
import Textbox from 'components/textbox';
import Decimal from 'components/decimal';
import Icon from 'components/icon';
import Presence from 'utils/validations/presence';

class Grid extends React.Component {

  render() {
    let discountHeader = null,
        discountPlaceholder = null,
        discountGutter = null;

    // define grid rows
    let gridContent = (
      // maps the data to table rows
      this.props.data.map((row, key) => {
        // if discount is enable, set up field for it
        let discountField = this.props.discount ? (
          <TableCell>
            <Decimal
              label={ false }
              name="discount"
              value={ row.get('discount') }
              onChange={ FinancesActions.financesLineItemUpdated.bind(this, key) }
            />
          </TableCell>
        ) : null;

        return (
          <TableRow key={ key }>

            { /* add delete */ }
            <TableCell action={ true }>
              <Icon type="delete" onClick={ FinancesActions.financesLineItemDeleted.bind(this, key) } />
            </TableCell>

            { /* add description */ }
            <TableCell>
              <Textbox
                label={ false }
                name="description"
                validations={ [new Presence()] }
                value={ row.get('description') }
                onChange={ FinancesActions.financesLineItemUpdated.bind(this, key) }
              />
            </TableCell>

            { /* add credit field */ }
            <TableCell>
              <Decimal
                label={ false }
                name="credit"
                value={ row.get('credit') }
                onChange={ FinancesActions.financesLineItemUpdated.bind(this, key) }
              />
            </TableCell>

            { /* add debit field */ }
            <TableCell>
              <Decimal
                label={ false }
                name="debit"
                value={ row.get('debit') }
                onChange={ FinancesActions.financesLineItemUpdated.bind(this, key) }
              />
            </TableCell>

            { /* add discount field */ }
            { discountField }

            { /* add total field */ }
            <TableCell align="right">
              { row.get('total') }
            </TableCell>

          </TableRow>
        );
      })
    );

    // if discount is enabled then set up additional components that are required
    if (this.props.discount) {
      discountHeader = <TableHeader align="right">Discount</TableHeader>;

      discountPlaceholder = (
        <TableCell>
          <Decimal
            label={ false }
            name="discount"
            onChange={ FinancesActions.financesLineItemUpdated.bind(this, this.props.data.count()) }
          />
        </TableCell>
      );

      discountGutter = <TableCell align="right">{ this.props.discountTotal }</TableCell>;
    }

    // add header
    gridContent = gridContent.unshift(
      <TableRow key="header">
        <TableHeader />
        <TableHeader>Description</TableHeader>
        <TableHeader align="right">Credit</TableHeader>
        <TableHeader align="right">Debit</TableHeader>
        { discountHeader }
        <TableHeader align="right">Total</TableHeader>
      </TableRow>
    );

    // add placeholder row
    gridContent = gridContent.push(
      <TableRow key={ this.props.data.count() }>
        <TableCell />

        <TableCell>
          <Textbox
            label={ false }
            name="description"
            onChange={ FinancesActions.financesLineItemUpdated.bind(this, this.props.data.count()) }
          />
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="credit"
            onChange={ FinancesActions.financesLineItemUpdated.bind(this, this.props.data.count()) }
          />
        </TableCell>

        <TableCell>
          <Decimal
            label={ false }
            name="debit"
            onChange={ FinancesActions.financesLineItemUpdated.bind(this, this.props.data.count()) }
          />
        </TableCell>

        { discountPlaceholder }

        <TableCell align="right">0.00</TableCell>
      </TableRow>
    );

    // add gutter
    gridContent = gridContent.push(
      <TableRow key="gutter">
        <TableCell/>
        <TableCell/>
        <TableCell align="right">{ this.props.creditTotal }</TableCell>
        <TableCell align="right">{ this.props.debitTotal }</TableCell>
        { discountGutter }
        <TableCell align="right">{ this.props.balance }</TableCell>
      </TableRow>
    );

    return (
      <Table>
        { gridContent }
      </Table>
    );
  }
}

export default Grid;
