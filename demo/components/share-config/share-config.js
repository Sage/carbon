import React from 'react';

import Button from 'components/button';
import Textbox from 'components/textbox';
import Icon from 'components/icon';

class ShareConfig extends React.Component {

  static propTypes = {
    optionsUrl: React.PropTypes.string, // url to show within the textbox
    onShareClick: React.PropTypes.func, // callback for share button press
  }

  className = () => {
    return `${ this.props.className } demo-share-config`;
  }

  render() {
    return (
      <div className={ this.className() }>
        <Button
          onClick={ this.props.onShareClick }
          className='demo-share-config__button'
        >
          <Icon type='link'/>
        </Button>

        <Textbox
          value={ this.props.optionsUrl || '' }
          className='demo-share-config__input'
          selectAllOnFocus={ true }
          disabled={ !this.props.optionsUrl }
        />
      </div>
    )
  }
}

export default ShareConfig;
