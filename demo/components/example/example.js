import React from 'react';
import Highlight from 'react-highlight';
import Row from 'components/row';
import Button from 'components/button';
import Checkbox from 'components/checkbox';
import Pod from 'components/pod';

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
          href={ `https://www.github.com/Sage/carbon/tree/master/src/${this.props.readme}` }
          target="_blank"
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
        <Pod key="controls" className="ui-example__controls">
          { this.props.controls }
        </Pod>
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
      <Pod className="ui-example" title={ this.props.title }>
        { this.renderHeader }

        <Row>
          { this.renderExample }
        </Row>

        { this.renderCode }
      </Pod>
    );
  }
}

export default Example;
