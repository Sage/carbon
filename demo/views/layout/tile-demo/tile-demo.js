import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Tile from 'components/tile';
import Row from 'components/row';
import Textarea from 'components/textarea';
import Pod from 'components/pod';

class TileDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['tile', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'tile');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Tile>
        <Pod border={ false }>
          { this.value('content') }
        </Pod>
      </Tile>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Tile from 'carbon/lib/components/tile';\n\n";

    html += '<Tile>\n';
    html += '  <Pod border={ false }>\n';
    html += `    ${this.value('content')}\n`;
    html += '  </Pod>\n';
    html += '</Tile>'

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return (
      <div>
        <Row>
          <Textarea
            label="Content"
            value={ this.value('content') }
            onChange={ this.action.bind(this, 'content') }
          />
        </Row>
      </div>
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title='Tile'
        readme='components/tile'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }

}

export default connect(TileDemo, AppStore);
