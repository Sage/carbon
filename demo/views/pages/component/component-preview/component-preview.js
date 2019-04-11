// React
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

// App Components
import classic from '../../../../../src/style/themes/classic';
import ComponentCodeBuilder from '../../../../utils/component-code-builder';
import PageContentArea from '../../../common/page-content-area';
import SimpleHeading from '../../../../components/simple-heading';
import Code from '../../../../components/code';
import Fields from './fields';
import './component-preview.scss';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
class ComponentPreview extends React.Component {
  componentDidMount() {
    this.renderDemo();
  }

  componentDidUpdate() {
    this.renderDemo();
  }

  render() {
    return (
      <PageContentArea
        title='Preview'
        link={ `https://github.com/Sage/carbon/tree/master/src/components/${this.props.definition.get('key')}` }
      >
        <div className={ `demo-component-preview demo-component-preview--${this.props.definition.get('key')}` }>
          <div className='demo-component-preview__component-wrapper'>
            <div id='carbon-demo' />
            <div ref='demo' />
          </div>

          <SimpleHeading title='Code' />

          <div className='demo-component-preview__interaction'>
            <Fields name={ this.props.name } definition={ this.props.definition } />
            { this.renderCode() }
          </div>
        </div>
      </PageContentArea>
    );
  }

  renderCode = () => {
    const code = this.compileCode();
    return <Code>{ code.toString() }</Code>;
  }

  renderDemo = () => {
    let code = this.compileCode(true),
        components = [],
        numberOfExamples = this.props.definition.get('numberOfExamples');

    for (let i = 0; i < numberOfExamples; i++) {
      const component = React.cloneElement(code.toComponent(), { key: i });
      components.push(component);
    }

    ReactDOM.render(
      <ThemeProvider theme={ classic }><div>{ components }</div></ThemeProvider>,
      this.refs.demo
    );
  }


  compileCode = (withEvents) => {
    return new ComponentCodeBuilder(this.props.definition, withEvents);
  }
}

export default ComponentPreview;
