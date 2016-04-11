import React from 'react';
import Pod from 'components/pod';
import Textbox from 'components/textbox';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <Pod className="ui-homepage">
          Carbon
        </Pod>

        <Textbox name='help-demo' labelIconType='info' />
      </div>
    );
  }
}

export default Homepage;
