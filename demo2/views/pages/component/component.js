// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';
import I18n from 'i18n-js';

// App Components
import PageContentArea from '../../common/page-content-area';
import ComponentPreview from './component-preview';

// Flux Components
import { connect } from 'utils/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

class Component extends React.Component {
  render() {
    let def = this.state.componentStore.get(this.props.params.name);

    return (
      <div>
        <ComponentPreview definition={ def } name={ this.props.params.name } />
        <PageContentArea title={ I18n.t('component_page.design_notes') }>
          { def.get('designerNotes') }
        </PageContentArea>
      </div>
    );
  }
}

export default connect(Component, ComponentStore);
