import React from 'react';

class View extends React.Component {
  store = undefined

  componentDidMount = () => {
    this.store.addChangeListener(this._onChange);
  }

  componentWillUnmount = () => {
    this.store.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState({ data: this.store.getState() });
  }
}

export default View;
