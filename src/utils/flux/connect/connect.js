import React from 'react'

/**
 * Higher order component
 *
 * Takes a variadic number of arguments where the leading arguments are
 * Stores and the the tail of those arguments is a function mapping from
 * store states to the props of the composed component.
 *
 * Usage like so:
 *
 *    function mapStateToProps(stateA, stateB) {
 *      return {
 *        propFromA: stateA.get('someProp'),
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
const connect = (...args) => (Component) => {
  const stores = args.slice(0, args.length - 1)
  const mapToProps = args[args.length - 1]

  return class ConnectedComponent extends React.Component {
    componentDidMount() {
      this.unsubscribers = stores.map((store) => {
        const updateComponent = () => { this.forceUpdate() }
        store.addChangeListener(updateComponent)
        return () => store.removeChangeListener(updateComponent)
      })
    }

    componentWillUnmount() {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe())
    }

    render() {
      const states = stores.map((store) => store.getState())

      return (
        <Component
          {...mapToProps(...states)}
          {...this.props}
        />
      )
    }
  }
}

export default connect
