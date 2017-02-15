import I18nComponent from './';
import Definition from './../../../demo/utils/definition';

let definition = new Definition('i18n-component', I18nComponent, {
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
