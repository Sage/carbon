import React from 'react';

import Button from 'components/button';
import Textarea from 'components/textarea';

class ShareConfig extends React.Component {

  static propTypes = {
    optionsUrl: React.PropTypes.string, // url to show within the textbox
    onShareClick: React.PropTypes.func, // callback for share button press
  }

  render() {
    return (
      <div className='shareConfig'>
        <Button onClick={ this.props.onShareClick }>
          Share Config
        </Button>

        <Textarea rows='30' expandable={ true } cols='30' value={ this.props.optionsUrl || '' }/>
      </div>
    )
  }
}

export default ShareConfig;
