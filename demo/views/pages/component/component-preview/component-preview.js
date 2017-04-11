// React
import React from 'react';

// App Components
import ComponentCodeBuilder from './../../../../utils/component-code-builder';
import ComponentActions from '../../../../actions/component';
import PageContentArea from './../../../common/page-content-area';
import SimpleHeading from './../../../../components/simple-heading';
import Code from './../../../../components/code';
import ShareConfig from './../../../../components/share-config';
import Fields from './fields';

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

  generateOptionsUrl = () => {
    ComponentActions.generateOptionsUrl(
      this.props.name,
      this.props.definition.get('propValues')
    );
  }

  render() {
    return (
      <PageContentArea
        title='Preview'
        link={ `https://github.com/Sage/carbon/tree/master/src/components/${this.props.definition.get('key')}` }
      >
        <div className= { `demo-component-preview demo-component-preview--${this.props.definition.get('key')}` }>

          <ShareConfig
            optionsUrl={ this.props.optionsUrl }
            onShareClick={ this.generateOptionsUrl }
          />

          <div className='demo-component-preview__component-wrapper'>
            <div id="carbon-demo" />
            <div ref='demo' />
          </div>

          <SimpleHeading title="Code"></SimpleHeading>

          <div className='demo-component-preview__interaction'>
            <Fields name={ this.props.name } definition={ this.props.definition } />
            { this.renderCode() }
          </div>
        </div>
      </PageContentArea>
    );
  }

  renderCode = () => {
    var code = this.compileCode();
    return <Code>{ code.toString() }</Code>
  }

  renderDemo = () => {
    let code = this.compileCode(true),
        components = [],
        numberOfExamples = this.props.definition.get('numberOfExamples');

    for (let i = 0; i < numberOfExamples; i++) {
      let component = React.cloneElement(code.toComponent(), { key: i });
      components.push(component);
    }

    ReactDOM.render(<div>{ components }</div>, this.refs.demo);
  }


  compileCode = (withEvents) => {
    return new ComponentCodeBuilder(this.props.definition, withEvents);
  }
};

export default ComponentPreview;
