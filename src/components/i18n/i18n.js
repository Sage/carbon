import React from 'react';
import i18n from 'i18n-js';
import _marked from 'marked';
import { tagComponent } from '../../utils/helpers/tags';
import { assign } from 'lodash';

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
    scope: React.PropTypes.string,

    /**
     * Additional options to pass to I18n
     *
     * @property options
     * @type {Object}
     * @default undefined
     */
    options: React.PropTypes.object
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
    let { markdown, inline, scope, options, ...props } = { ...this.props },
        translation = i18n.t(scope, options);

    if (markdown) {
      props.dangerouslySetInnerHTML = {
        __html: this.marked(inline)(translation)
      };
      translation = null;
    }

    props = assign({}, props, tagComponent('i18n', this.props));

    return this.renderMarkup(inline, props, translation);
  }

  renderMarkup(inline, props, translation) {
    let el = inline ? 'span' : 'div';
    return React.createElement(el, props, translation);
  }

  marked(inline) {
    // Make sure that we sanitize html markup in the MD compiler
    _marked.setOptions({ sanitize: true });
    return inline ? str => _marked.inlineLexer(str, []) : _marked;
  }
}

export default I18n;
