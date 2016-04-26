import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';

import DropdownFilter from 'components/dropdown-filter';

class DropdownFilterDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['dropdown_filter', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'dropdown_filter');
  }

  /**
   * @method demo
   */
  get demo() {
    let opts = Immutable.fromJS([
      { id: 1, name: "Option One" },
      { id: 2, name: "Option Two" },
      { id: 3, name: "Option Three" },
      { id: 4, name: "Option Four" },
      { id: 5, name: "Option Five" },
      { id: 6, name: "Option Six" },
      { id: 7, name: "Option Seven" },
      { id: 8, name: "Option Eight" },
      { id: 9, name: "Option Nine" },
      { id: 10, name: "Option Ten" },
      { id: 11, name: "Option Eleven" },
      { id: 12, name: "Option Twelve" }
    ]);

    return (
      <DropdownFilter options={ opts } { ...FormInputHelper.demoProps(this, this.action) } />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import DropdownFilter from 'carbon/lib/components/dropdown-filter';\n";
    html += "import Immutable from 'immutable';\n\n";

    html += "Immutable.fromJS([\n";
    html += "  { id: 1, name: 'Option One' },\n";
    html += "  { id: 2, name: 'Option Two' },\n";
    html += "  { id: 3, name: 'Option Three' },\n";
    html += "  { id: 4, name: 'Option Four' },\n";
    html += "  { id: 5, name: 'Option Five' },\n";
    html += "  { id: 6, name: 'Option Six' },\n";
    html += "  { id: 7, name: 'Option Seven' },\n";
    html += "  { id: 8, name: 'Option Eight' },\n";
    html += "  { id: 9, name: 'Option Nine' },\n";
    html += "  { id: 10, name: 'Option Ten' },\n";
    html += "  { id: 11, name: 'Option Eleven' },\n";
    html += "  { id: 12, name: 'Option Twelve' },\n";
    html += "]);\n\n";

    html += "<DropdownFilter\n";
    html += "  options={opts}";
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
        title="Dropdown Filter"
        readme="components/dropdown-filter"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(DropdownFilterDemo, AppStore);
