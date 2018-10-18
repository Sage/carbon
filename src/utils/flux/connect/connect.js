import React from 'react';
import { connect as reduxConnect } from 'react-redux'

/**
 * Higher order component
 *
 * Takes a variadic number of arguments where the leading arguments are
 * Stores and the the tail of those arguments is a function mapping from
 * store states to the props of the composed component.
 *
 * Usage like so:
 *
 *    function mapStateToProps(stateA, stateB, props) {
 *      return {
 *        propFromA: stateA.get('someProp') + props.someProp,
 *        propFromB: stateB.get('someProp')
 *      }
 *    }
 *
 *    const ConnectedComponent = connect(storeA, storeB, mapStateToProps)(TargetComponent)
 *
 * @function connect
 * @param {...Store} ...stores
 * @param {Function} mapStateToProps
 * @return {Function}
 */
const connect = (...args) => (WrappedComponent) => {
  const stores = args.slice(0, args.length - 1);
  const mapToProps = args[args.length - 1];

  const mapStateToProps = state => {
    const states = [];
    stores.forEach((store) => {
      states.push(state[store.name]);
    });
    return mapToProps(...states);
  }

  return reduxConnect(mapStateToProps)(WrappedComponent);
};

export default connect;
