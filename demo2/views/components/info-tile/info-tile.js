import React from 'react';
import Pod from 'components/pod';
import Portrait from 'components/portrait';
import css from 'utils/css';

class InfoTile extends React.Component {
  render() {
    return (
      <Pod
        as='tile'
        className={ `info-tile ${ this.props.className }` }
      >
        <div className='info-tile__content'>
          <Portrait className='info-tile__image' shape='circle' />
          <div className={ `info-tile__heading ${ css.textBold }` }>
            { this.props.title }
          </div>

          <br />

          <div className='info-tile__description'>
            { this.props.description }
          </div>
        </div>
      </Pod>
    );
  }
}

export default InfoTile;
