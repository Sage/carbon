import Flux from 'flux';
import { assign } from 'lodash';
import { connect as reduxConnect } from 'react-redux'
import Logger from '../logger';
import reducerRegistry from './reducer-registry';

export const Dispatcher = {
  register: () => {},

  dispatch: action => {
    action.type = action.actionType;
    delete action.actionType;
    reducerRegistry.store.dispatch(action);
  }
};

const buildPropsFromStores = (stores, data) => {
  const props = {};

  if (stores.constructor === Array) {
    stores.forEach((store) => {
      props[store.name] = data[store.name];
    });
  } else {
    props[stores.name] = data[stores.name];
  }

  return props;
}

export function connect(ComposedView, stores) {
  class View extends ComposedView {
    constructor(...args) {
      super(...args);
      const props = buildPropsFromStores(stores, this.props);
      this.state = assign({}, this.state, props);
    }

    componentWillReceiveProps(nextProps) {
      if (super.componentWillReceiveProps) {
        super.componentWillReceiveProps(nextProps);
      }
      const props = buildPropsFromStores(stores, nextProps);
      this.setState(props);
    }
  }

  const mapStateToProps = state => {
    return buildPropsFromStores(stores, state);
  }

  const connectedView = reduxConnect(mapStateToProps)(View);
  connectedView.displayName = ComposedView.displayName || ComposedView.name;
  connectedView._legacyConnect = true;
  return connectedView;
}
