import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import DropdownFilterAjax from 'components/dropdown-filter-ajax';

class DropdownFilterAjaxDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['dropdown_filter_ajax', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'dropdown_filter_ajax');
  }

  /**
   * @method demo
   */
  get demo() {
    return (
      <DropdownFilterAjax
        { ...FormInputHelper.demoProps(this, this.action) }
        visibleValue={ this.value('value') }
        path="/countries"
        additionalRequestParams={ {foo: 'bar'} }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import DropdownFilterAjax from 'carbon/lib/components/dropdown-filter-ajax';\n";
    html += "import Immutable from 'immutable';\n\n";

    html += "<DropdownFilterAjax\n";
    html += "  options={opts}";
    html += "  path='/countries'";
    html += "  additionalRequestParams={ {foo: 'bar'}";
    html = FormInputHelper.codeProps(this, html);
    html += "/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    return FormInputHelper.controls(this, this.action);
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Dropdown Filter Ajax"
        readme="components/dropdown-filter-ajax"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DropdownFilterAjaxDemo, AppStore);
