import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import Dropdown from 'components/dropdown';

class DropdownDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['dropdown', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'dropdown');
  }

  /**
   * @method demo
   */
  get demo() {
    let opts = Immutable.fromJS([
      { id: 1, name: "Option One" },
      { id: 2, name: "Option Two" },
      { id: 3, name: "Option Three" },
      { id: 4, name: "Option Four" }
    ]);

    return (
      <Dropdown options={ opts } { ...FormInputHelper.demoProps(this, this.action) } />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Dropdown from 'carbon/lib/components/dropdown';\n";
    html += "import Immutable from 'immutable';\n\n";

    html += "Immutable.fromJS([\n";
    html += "  { id: 1, name: 'Option One' },\n";
    html += "  { id: 2, name: 'Option Two' },\n";
    html += "  { id: 3, name: 'Option Three' },\n";
    html += "  { id: 4, name: 'Option Four' },\n";
    html += "]);\n\n";

    html += "<Dropdown\n";
    html += "  options={opts}\n";
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
        title="Dropdown"
        readme="github/dropdown"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DropdownDemo, AppStore);
