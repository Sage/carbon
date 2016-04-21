import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import AsDropdown from './../../../components/as-dropdown';

import Banner from 'components/banner';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import Textarea from 'components/textarea';

class BannerDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['banner', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'banner');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <Banner
        as={ this.value('as') }
        open={ true }
        title={ this.value('title') }
      >
        { this.value('text') || " " }
      </Banner>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Banner from 'carbon/lib/components/banner';\n\n";

    html += "<Banner";
    html += `\n  as='${this.value('as')}'`;
    html += `\n  open='${true}'`;
    html += `\n  title='${this.value('title')}'`;
    html += "\n>\n";
    html += `  ${this.value('text')}`;
    html += "\n</Banner>\n\n";

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
            label="Title"
            value={ this.value('title') }
            onChange={ this.action.bind(this, 'title') }
          />
        </Row>
        <Row>
          <Textarea
            label="Content"
            value={ this.value('text') }
            onChange={ this.action.bind(this, 'text') }
          />
        </Row>

        <Row>
          <AsDropdown
            value={ this.value('as') }
            onChange={ this.action.bind(this, 'as') }
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
        title="Banner"
        readme="components/banner"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(BannerDemo, AppStore);
