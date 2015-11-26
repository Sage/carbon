import React from 'react';
import Row from 'components/row';
import Button from 'components/button';
import FinancesStore from './../../../../stores/finances';

class History extends React.Component {
  handleReset = (ev) => {
    ev.preventDefault();
    FinancesStore.reset();
  }

  handleUndo = (ev) => {
    ev.preventDefault();
    FinancesStore.undo();
  }

  render() {
    let disabled = FinancesStore.history.length ? false : true;

    return (
      <div className="view-history">
        <Button onClick={ this.handleUndo } disabled={ disabled }>Undo</Button>
        <Button onClick={ this.handleReset } disabled={ disabled }>Reset</Button>
      </div>
    );
  }
}

export default History;
