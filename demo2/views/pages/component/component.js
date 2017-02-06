// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';
import I18n from 'i18n-js';

// App Components
import PageContentArea from '../../common/page-content-area';
import ComponentPreview from './component-preview';
import ComponentAPI from './component-api';

// Flux Components
import { connect } from 'utils/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

class Component extends React.Component {
  render() {
    let definition = this.state.componentStore.get(this.props.params.name);

    return (
      <div>
        <ComponentPreview definition={ definition } name={ this.props.params.name } />

        { this.renderAPIs(definition) }

        <PageContentArea title={ I18n.t('component_page.design_notes') }>
          { definition.get('designerNotes') }
        </PageContentArea>
      </div>
    );
  }

  renderAPIs = (definition) => {
    let apis = [<ComponentAPI definition={ definition } />];

    definition.get('associatedDefinitions').forEach((associatedDefinition) => {
      apis.push(<ComponentAPI definition={ associatedDefinition } />);
    });

    return apis;
  }
}

export default connect(Component, ComponentStore);
