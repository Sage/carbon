import React from 'react';
import { Panel, Image, Heading, Text  } from './selling-points.style';

const images = {
  flexible: require('./images/flexible.svg'),
  hammer: require('./images/hammer.svg'),
  plug: require('./images/plug.svg'),
  point: require('./images/point.svg'),
  brush: require('./images/brush.svg'),
  collaborate: require('./images/collaborate.svg')
};

export default ({ icon, heading, text }) => (
  <Panel>
    <Image src={ images[icon] } />
    <Heading>{ heading }</Heading>
    <Text>{ text }</Text>
  </Panel>
);
