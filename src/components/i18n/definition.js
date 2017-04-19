import I18nComponent from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('i18n-component', I18nComponent, {
  description: `Displays a translation from an i18n file.`,
  designerNotes: `
* Internationalization (i18n) means apps can be localized for languages and cultures easily.
* This component displays a single text translation.
* You can use this component with any other component that displays text.
 `,
  js: `I18n.translations.en.my = {
  example: '# My __example__ translation.'
};`,
  hiddenProps: ["options"],
  propRequires: {
    inline: 'markdown',
  },
  propTypes: {
    markdown: "Boolean",
    inline: "Boolean",
    scope: "String",
    options: "Object"
  },
  propDescriptions: {
    markdown: "Parse the string as markdown.",
    inline: "Renders markdown as inline (less tags).",
    scope: "The I18n scope.",
    options: "Additional options to pass to I18n."
  },
  propValues: {
    scope: "my.example",
  }
});

// need to manually set this one due to kebabcase working unexpectedly
definition.key = "i18n-component";

export default definition;
