import React from 'react';

import DefinitionHelper from '../../utils/helpers/definition-helper';

import { Carousel } from './';
import slideDefinition from './slide/definition';

import { _ } from 'lodash';

let slide = React.createElement(slideDefinition.component, slideDefinition.props);

let definition = {
  component: Carousel,
  key: 'carousel',
  text: {
    bemClass: 'carbon-carousel',
    details: 'Try not to create any duplication between the primary navigation, and this component.\n' +
             'Try not to mix links which navigate the user to a location, versus links which create new entities.',
    description: 'Padded and coloured basic carousel.',
    name: 'Carousel',
    type: 'layout'
  },
  props: Carousel.propTypes,
  defaultProps: Carousel.defaultProps
}

definition.demoProps = DefinitionHelper.prepareDemoProps(definition, [ slide, slide, slide, slide ]);

export default definition;
