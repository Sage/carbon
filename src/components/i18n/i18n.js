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

  constructor(props) {
    super(props);

    const self = this;
    const marked = self.props.inline ? str => _marked.inlineLexer(str, []) : _marked;

    function _render(props, content) {
      return React.createElement(
        self.props.inline ? 'span' : 'div', props, content
      );
    }

    function renderMarkdown() {
      return _render({
        dangerouslySetInnerHTML: {
          __html: marked(i18n.t(self.props.translationKey))
        }
      });
    }

    function renderDefault() {
      return _render({}, i18n.t(self.props.translationKey));
    }

    /**
     * Renders the component.
     *
     * @method render
     */
    self.render = function() {
      return self.props.markdown ? renderMarkdown() : renderDefault();
    };
  }
}

export default I18n;
