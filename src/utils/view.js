import React from 'react';

var View = (ComposedView, Store) => class extends React.Component {
  componentDidMount = () => {
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount = () => {
    Store.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState({ data: Store.getState() });
  }

  state = {
    data: Store.getState()
  }

  render() {
    return (
      <ComposedView {...this.props} {...this.state} />
    );
  }
}

export default View;
