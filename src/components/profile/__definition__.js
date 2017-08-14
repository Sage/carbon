import Profile from './';
import Definition from './../../../demo/utils/definition';

const definition = new Definition('profile', Profile, {
  description: 'Represents a person with their initials or an avatar, and some text.',
  designerNotes: `
* Combines the [Portrait](/components/portrait) and [Detail](/components/detail) components in a single configuration.
* Useful to represent a person, user, or organisation.
* Use initials rather than an avatar if you prefer.
* Works with [Gravatar](http://en.gravatar.com/) as a source of avatars.
  `,
  relatedComponentsNotes: `
* Initials or avatar without text? [Try Portrait](/components/portrait).
* Text without initials or avatar? [Try Detail](/components/detail).
 `,
  propValues: {
    name: 'Andrew Tait',
    email: 'andrew.tait@sage.com'
  },
  propTypes: {
    className: 'String',
    name: 'String',
    email: 'String',
    initials: 'String',
    large: 'Boolean'
  },
  propDescriptions: {
    className: 'A custom class name for the component.',
    name: 'Define the name to display.',
    email: 'Define the email to use (will check Gravatar for image).',
    initials: 'Define initials to display if there is no Gravatar image.',
    large: 'Enable a larger theme for the name.'
  }
});

export default definition;
