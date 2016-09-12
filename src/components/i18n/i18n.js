import React from 'react';
import i18n from 'i18n-js';
import _marked from 'marked';

/*
 * Make sure that we sanitize html markup in the MD compiler
 */
_marked.setOptions({
  sanitize: true
});

function _render(props, content) {
  return React.createElement(
    this.props.inline ? 'span' : 'div', props, content
  );
}

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

  get marked() {
    return this.props.inline ? str => _marked.inlineLexer(str, []) : _marked;
  }

  renderMarkdown() {
    return _render.call(this, {
      dangerouslySetInnerHTML: {
        __html: this.marked(i18n.t(this.props.translationKey))
      }
    });
  }

  renderDefault() {
    return _render.call(this, {}, i18n.t(this.props.translationKey));
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return this.props.markdown ? this.renderMarkdown() : this.renderDefault();
  }

}

export default I18n;
