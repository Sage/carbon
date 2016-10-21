import React from 'react';
import Pod from 'components/pod';
import Portrait from 'components/portrait';

class InfoTile extends React.Component {
  render() {
    return (
      <Pod
        as='tile'
        className={ `info-tile ${ this.props.className }` }
      >
        <Portrait shape='circle' />
      </Pod>
    );
  }
}

export default InfoTile;
