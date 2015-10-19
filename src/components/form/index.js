import React from 'react';
import Button from 'components/button';

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
        decrementErrorCount: this.decrementErrorCount,
        model: this.props.model
      }
    }
  }

  state = {
    errorCount: 0
  }

  inputs = {
  }

  tables = {
  }

  incrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount + 1 })
  }

  decrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount - 1 })
  }

  attachToForm = (component) => {
    if (component.constructor.name === "TableFieldsForMany") {
      this.tables[component.props.name] = component;
    } else if (component.props.namespace && component.props.row_id) {
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
    if (component.constructor.name === "TableFieldsForMany") {
      delete this.tables[component.props.name];
    } else if (component.props.namespace && component.props.row_id) {
      delete this.inputs[component.props.namespace][component.props.row_id][component.props.name];
    } else {
      delete this.inputs[component.props.name];
    }
  }

  handleOnSubmit = (ev) => {
    var valid = true;
    var errors = 0;

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

    if (!valid) {
      ev.preventDefault();
    } else {
      for (var key in this.tables) {
        var table = this.tables[key];
        table.setState({ placeholder: false });
      };
    }
  }

  htmlProps = () => {
    var { model, ...props } = this.props;

    return props;
  }

  generateCSRFToken = () => {
    var meta = document.getElementsByTagName('meta'),
        csrfAttr,
        csrfValue;

    for (var i = 0; i < meta.length; i++) {
      var item = meta[i];

      if (item.getAttribute('name') === 'csrf-param') {
        csrfAttr = item.getAttribute('content');
      } else if (item.getAttribute('name') === 'csrf-token') {
        csrfValue = item.getAttribute('content');
      }
    };

    return <input name={ csrfAttr } value={ csrfValue } readOnly="true" />;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <form onChange={ this.handleOnChange } onSubmit={ this.handleOnSubmit } { ...this.htmlProps() }>
        { this.generateCSRFToken() }
        { this.props.children }
        <Button/>
        Errors: <span>{ this.state.errorCount }</span>
      </form>
    );
  }

};

export default Form;
