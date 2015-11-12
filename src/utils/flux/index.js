export function connect(ComposedView, stores) {

  class View extends ComposedView {

    constructor(...args) {
      super(...args);
      this.state = Object.assign({}, this.state, this._getStoreStates());
    }

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }

      for (let key in _stores) {
        _stores[key].addChangeListener(this._onChange);
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) { super.componentWillMount(); }

      for (var key in _stores) {
        _stores[key].removeChangeListener(this._onChange);
      }
    }

    _onChange = (key) => {
      this.setState({ [key]: _stores[key].getState() });
    }

    _getStoreStates = () => {
      var states = {};

      for (var key in _stores) {
        states[key] = _stores[key].getState();
      }

      return states;
    }

  }

  var _stores = {};

  if (stores.constructor === Array) {
    stores.forEach((store) => {
      _stores[store.constructor.name] = store;
    });
  } else {
    _stores[stores.constructor.name] = stores;
  }

  return View;
};
