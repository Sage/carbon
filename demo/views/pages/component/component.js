// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';
import I18n from 'i18n-js';

// App Components
import PageContentArea from '../../common/page-content-area';
import InformationStyles from '../../common/information-styles';
import ComponentPreview from './component-preview';
import ComponentAPI from './component-api';

// Flux Components
import { connect } from 'carbon-state-management/lib/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

import marked from 'marked';

class Component extends React.Component {
  render() {
    const definition = this.state.componentStore.get(this.props.params.name);

    return (
      <div>
        <ComponentPreview definition={ definition } name={ this.props.params.name } />

        { this.renderAPIs(definition) }
        { this.renderDesignerNotes(definition) }
        { this.renderRelatedComponentsNotes(definition) }
      </div>
    );
  }

  renderRelatedComponentsNotes = (definition) => {
    const relatedComponentsNotes = definition.get('relatedComponentsNotes');

    if (relatedComponentsNotes) {
      return (
        <PageContentArea title={ I18n.t('component_page.related_components') }>
          <InformationStyles>
            <div dangerouslySetInnerHTML={ { __html: marked(relatedComponentsNotes) } } />
          </InformationStyles>
        </PageContentArea>
      );
    }
  }

  renderDesignerNotes = (definition) => {
    const designerNotes = definition.get('designerNotes');

    if (designerNotes) {
      return (
        <PageContentArea title={ I18n.t('component_page.design_notes') }>
          <InformationStyles>
            <div dangerouslySetInnerHTML={ { __html: marked(designerNotes) } } />
          </InformationStyles>
        </PageContentArea>
      );
    }
    return null;
  }

  renderAPIs = (definition) => {
    const apis = [<ComponentAPI definition={ definition } key='main' />];

    definition.get('associatedDefinitions').forEach((associatedDefinition, index) => {
      apis.push(<ComponentAPI definition={ associatedDefinition } key={ index } />);
    });

    return apis;
  }
}

export default connect(Component, ComponentStore);
