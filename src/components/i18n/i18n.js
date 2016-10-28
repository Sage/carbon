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
 *  <I18n scope='foo' />
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
     * @property scope
     * @type {String}
     * @default undefined
     */
    scope: React.PropTypes.string
  }

  static defaultProps = {
    inline: true
  }

  constructor(...args) {
    super(...args);

    this._render = this._render.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.renderMarkdown = this.renderMarkdown.bind(this);
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { markdown, inline, scope, options, ...props } = { ...this.props }

    return (
      markdown ? this.renderMarkdown : this.renderDefault
    )(inline, scope, options, props);
  }

  marked(inline) {
    return inline ? str => _marked.inlineLexer(str, []) : _marked;
  }

  _render(inline, props, content) {
    return React.createElement(
      inline ? 'span' : 'div', props, content
    );
  }

  renderMarkdown(inline, key, options, props) {
    let targetProps = props;
    targetProps.dangerouslySetInnerHTML = {
      __html: this.marked(inline)(i18n.t(key, options))
    };

    return this._render(inline, targetProps);
  }

  renderDefault(inline, key, options, props) {
    return this._render(inline, props, i18n.t(key, options));
  }
}

export default I18n;
