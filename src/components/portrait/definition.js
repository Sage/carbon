import OptionsHelper from 'utils/helpers/options-helper';
import Portrait from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('portrait', Portrait, {
  description: 'Represents a person with their initials or an avatar.',
  designerNotes: `
* Useful to represent a person, user, or organisation.
* Use initials rather than an avatar if you prefer.
* Works with [Gravatar](http://en.gravatar.com/) as a source of avatars.
  `,
  relatedComponentsNotes: `
* Combining Portrait with some text? [Try Profile](/components/profile).
 `,
  propOptions: {
    size: OptionsHelper.sizesFull,
    shape: OptionsHelper.shapesVaried
  },
  propTypes: {
    alt: 'String',
    className: 'String',
    darkBackground: 'Boolean',
    gravatar: 'String',
    initials: 'String',
    shape: 'String',
    size: 'String',
    src: 'String'
  },
  propDescriptions: {
    alt: 'Defines the alt HTML string.',
    className: 'A custom class name for the component.',
    darkBackground: 'Switch to a dark background (requires a re-render).',
    gravatar: 'Define an email address registered with gravatar.',
    initials: 'Define some initials to render in the Portrait.',
    shape: 'Defines the shape of the Portrait.',
    size: 'Defines the size of the Portrait.',
    src: 'Define an image source.'
  }
});

export default definition;
