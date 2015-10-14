import React from 'react';

class Form extends React.Component {

  static childContextTypes = {
    form: React.PropTypes.object
  }

  getChildContext = () => {
    return {
      form: {
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        incrementErrorCount: this.incrementErrorCount,
        decrementErrorCount: this.decrementErrorCount
      }
    }
  }

  state = {
    errorCount: 0
  }

  inputs = {
  }

  incrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount + 1 })
  }

  decrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount - 1 })
  }

  attachToForm = (component) => {
    if (component.props.namespace && component.props.row_id) {
      if (!this.inputs[component.props.namespace]) {
        this.inputs[component.props.namespace] = {};
      }

      if (!this.inputs[component.props.namespace][component.props.row_id]) {
        this.inputs[component.props.namespace][component.props.row_id] = {};
      }

      this.inputs[component.props.namespace][component.props.row_id][component.props.name] = component;
    } else {
      this.inputs[component.props.name] = component;
    }
  }

  detachFromForm = (component) => {
    if (component.props.namespace && component.props.row_id) {
      delete this.inputs[component.props.namespace][component.props.row_id][component.props.name];
    } else {
      delete this.inputs[component.props.name];
    }
  }

  handleOnSubmit = (ev) => {
    var valid = true;
    var errors = 0;
    ev.preventDefault()

    for (var key in this.inputs) {
      var input = this.inputs[key];

      if (input.props) {
        if (!input.validate()) {
          valid = false;
          errors++;
        }
      } else {
        for (var id in input) {
          var row = input[id];

          for (var rowField in row) {
            var rowInput = row[rowField];

            if (rowInput.props._placeholder) {
              continue;
            }

            if (!rowInput.validate()) {
              valid = false;
              errors++;
            }
          }
        }
      }
    }

    this.setState({ errorCount: errors });
    console.log(valid);
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <form onChange={ this.handleOnChange } onSubmit={ this.handleOnSubmit }>
        { this.props.children }
        <button>Save</button>
        Errors: <span>{ this.state.errorCount }</span>
      </form>
    );
  }

};

export default Form;
