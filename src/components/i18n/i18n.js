import React from 'react';
import i18n from 'i18n-js';
import _marked from 'marked';

/*
 * Make sure that we sanitize html markup in the MD compiler
 */
_marked.setOptions({
  sanitize: true
});

/**
 * A widget for internationalisation of text.
 *
 * == How to use an I18n component:
 *
 * In your file:
 *
 *   import I18n from 'carbon/lib/components/i18n';
 *
 * To render the message:
 *
 *  <I18n translationKey='foo' />
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class I18n
 * @constructor
 */
class I18n extends React.Component {

  static propTypes = {

    /**
     * Whether to compile the value as markdown
     *
     * @property markdown
     * @type {Boolean}
     * @default false
     */
    markdown: React.PropTypes.bool,

    /**
     * Whether to enclose the text in a <span> or a <div>
     *
     * @property inline
     * @type {Boolean}
     * @default true
     */
    inline: React.PropTypes.bool,

    /**
     * The key to lookup for a localised value
     *
     * @property translationKey
     * @type {String}
     * @default undefined
     */
    translationKey: React.PropTypes.string
  }

  static defaultProps = {
    inline: true
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      this.props.markdown ? renderMarkdown : renderDefault
    )(this.props.inline, this.props.translationKey);
  }
}

function marked(inline) {
  return inline ? str => _marked.inlineLexer(str, []) : _marked;
}

function _render(inline, props, content) {
  return React.createElement(
    inline ? 'span' : 'div', props, content
  );
}

function renderMarkdown(inline, key) {
  return _render(inline, {
    dangerouslySetInnerHTML: {
      __html: marked(inline)(i18n.t(key))
    }
  });
}

function renderDefault(inline, key) {
  return _render(inline, {}, i18n.t(key));
}

export default I18n;
