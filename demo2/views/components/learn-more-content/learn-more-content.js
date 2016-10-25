import React from 'react';
import Icon from 'components/icon';
import Link from 'components/link';
import classNames from 'classnames';
import { merge } from 'lodash';

class LearnMoreContent extends React.Component {

  static propTypes = {
    /**
     * The body of the content component.
     *
     * @property children
     * @type {Object}
     */
    children: React.PropTypes.node,

    /**
     * The title of the content component.
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string,

    /**
     * Content to displayed in the footer as a Link.
     *
     * @property footerContent
     * @type {Node}
     */
    footerContent: React.PropTypes.node,

    /**
     * Props to be passed to the link component that wraps
     * the footer.
     *
     * @property linkProps
     * @type {Object}
     */
    linkProps: React.PropTypes.object,
  }

  /**
   * Returns the HTML classes for the component.
   *
   * @method
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-learn-more-content",
      this.props.className
    );
  }

  /**
   * Returns the props for the link
   *
   * @method
   * @return {Object}
   */
  get linkProps() {
    let defaultLinkProps = {
      target: "_blank",
      href: this.props.footerHref,
      to: this.props.footerTo,
      iconAlign: 'right',
      icon: 'arrow'
    };

    return merge(defaultLinkProps, this.props.linkProps);
  }

  /**
   * Returns the footerContent wrapped in a link
   * if footerContent is passed
   *
   * @method
   * @return {JSX}
   */
  get footerContent() {
    if (this.props.footerContent) {
      return (
        <div className="carbon-learn-more-content__footer">
          <Link { ...this.linkProps } >
            { this.props.footerContent }
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={ this.classes }>
        <h1 className="carbon-learn-more-content__title">
          { this.props.title }
        </h1>

        <div className="carbon-learn-more-content__body">
          { this.props.children }
        </div>

        { this.footerContent }
      </div>
    );
  }
}

export default LearnMoreContent;
