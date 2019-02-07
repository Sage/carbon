# Table

The following is an example of how to use the Table component:

```js
import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'carbon-react/lib/components/table';
import Textbox from 'carbon-react/lib/components/textbox';
import Button from 'carbon-react/lib/components/button';

class MyView extends React.Component {
  render() {
    // We map the data from the store, to define what a row should look like.
    // Using map allows the developer to define any content they want - this could
    // render text, an input, a button or anything else.
    let tableRows = this.props.data.map((row, index) => {
      return(
        <TableRow>
          // This cell renders just text for 'description'.
          <TableCell>
            { row.get('description') }
          </TableCell>

          // This cell renders a textbox for 'name'. We also give it an onChange function. It is
          // important to notice that we bind additional values to this function - 'this' and 'index'.
          // This means that when the function is called it will receive the index as an argument.
          // The store then knows which index in the array of data has been modified and needs to update,
          // the mutation would look something like:
          // `this.data = this.data.setIn(['line_items', action.index, action.name], action.value);`.
          <TableCell>
            <Textbox value={ row.get('name') } onChange={ Actions.nameUpdated.bind(this, index) } />
          </TableCell>

          // This cell renders a button component.
          <TableCell>
            <Button>An Action!</Button>
          </TableCell>
        </TableRow>
      );
    });

    // tableRows is now an array mapped from the data we provided. We also need a table header so
    // lets add that as an additional row in the array (unshift prepends to an array):
    tableRows = tableRows.unshift(
      <TableRow>
        <TableHeader>Description</TableHeader>
        <TableHeader>Name</TableHeader>
        <TableHeader>Actions</TableHeader>
      </TableRow>
    );

    // We can now render the array of rows as a child of Table.
    return (
      <Table>
        { tableRows }
      </Table>
    );
  }
}

export default MyView
```

The example above should highlight the flexibility available with grids. You can mix input with plain text or any other component, all in the same table. Adding a placeholder row is simple as well:

```js
import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'carbon-react/lib/components/table';
import Textbox from 'carbon-react/lib/components/textbox';

class MyView extends React.Component {
  render() {
    // Define tableRows.
    let tableRows = this.props.data.map((row, index) => {
      <TableRow>
        <TableCell>
          <Textbox name="description" value={ row.get('description') } onChange={ Actions.valueUpdated.bind(this, index) } />
        </TableCell>

        <TableCell>
          <Textbox name="name" value={ row.get('name') } onChange={ Actions.valueUpdated.bind(this, index) } />
        </TableCell>
      </TableRow>
    });

    // Add header.
    tableRows = tableRows.unshift(
      <TableRow>
        <TableHeader>Description</TableHeader>
        <TableHeader>Name</TableHeader>
      </TableRow>
    );

    // Add placeholder row. The main difference between a regular row is we are not mapping any data to
    // this row (as it has none). Also, instead of an index, we are passing the data count to the bound
    // action. This means on valueUpdated that it will update the value in the array to an index which
    // does not yet exist - effectively creating the new row.
    tableRows.push(
      <TableRow>
        <TableCell>
          <Textbox name="description" onChange={ Actions.valueUpdated.bind(this, this.data.count()) } />
        </TableCell>

        <TableCell>
          <Textbox name="name" onChange={ Actions.valueUpdated.bind(this, this.data.count()) } />
        </TableCell>
      </TableRow>
    );

    // We can now render the array of rows as a child of Table.
    return (
      <Table>
        { tableRows }
      </Table>
    );
  }
}

export default MyView
```
