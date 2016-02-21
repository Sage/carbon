import React from 'react';
import Highlight from 'react-highlight';
import Row from 'components/row';
import Button from 'components/button';
import Checkbox from 'components/checkbox';

class Example extends React.Component {
  state = {
    /**
     * @property isConfigOpen
     * @type {Boolean}
     */
    isConfigOpen: false,

    /**
     * @property isCodeOpen
     * @type {Boolean}
     */
    isCodeOpen: false
  }

  /**
   * @method toggleConfig
   */
  toggleConfig = (view) => {
    this.setState({ isConfigOpen: !this.state.isConfigOpen });
  }

  /**
   * @method toggleCode
   */
  toggleCode = (view) => {
    this.setState({ isCodeOpen: !this.state.isCodeOpen });
  }

  /**
   * @method renderHeader
   */
  get renderHeader() {
    return (
      <div className="ui-example__header">
        <h2 className="ui-example__header-item ui-example__title">
          { this.props.title }
        </h2>

        <Checkbox
          className="ui-example__header-item"
          label="Show Code"
          value={ this.state.isCodeOpen }
          onChange={ this.toggleCode }
        />

        <Checkbox
          className="ui-example__header-item"
          label="Show Config"
          value={ this.state.isConfigOpen }
          onChange={ this.toggleConfig }
        />

        <Button
          className="ui-example__header-item"
          href={ this.props.readme }
        >
          { this.props.title } README
        </Button>
      </div>
    );
  }

  /**
   * @method renderExample
   */
  get renderExample() {
    let example = [
      <div key="demo" className="ui-example__demo">
        { this.props.demo }
      </div>
    ];

    if (this.state.isConfigOpen) {
      example.push(
        <div key="controls" className="ui-example__controls">
          { this.props.controls }
        </div>
      );
    }

    return example;
  }

  /**
   * @method renderCode
   */
  get renderCode() {
    return this.state.isCodeOpen ? (
      <div className="ui-example__code">
        <Highlight className="javascript">
          { this.props.code }
        </Highlight>
      </div>
    ) : null;
  }

  /**
   * @method render
   */
  render() {
    return (
      <div className="ui-example">
        { this.renderHeader }

        <Row>
          { this.renderExample }
        </Row>

        { this.renderCode }
      </div>
    );
  }
}

export default Example;
