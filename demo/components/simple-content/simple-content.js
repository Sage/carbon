import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { merge } from 'lodash';

// Carbon
import Icon from 'components/icon';
import Link from 'components/link';
import './simple-content.scss';

class SimpleContent extends React.Component {

  static propTypes = {
    /**
     * The body of the content component.
     *
     * @property children
     * @type {Object}
     */
    children: PropTypes.node,

    /**
     * The title of the content component.
     *
     * @property title
     * @type {String}
     */
    title: PropTypes.string,

    /**
     * Content to displayed in the footer as a Link.
     *
     * @property footerContent
     * @type {Node}
     */
    footerContent: PropTypes.node,

    /**
     * Props to be passed to the link component that wraps
     * the footer.
     *
     * @property linkProps
     * @type {Object}
     */
    linkProps: PropTypes.object,
  }

  constructor(...args) {
    super(...args);

    this.classes = this.classes.bind(this);
    this.linkProps = this.linkProps.bind(this);
    this.footerContent = this.footerContent.bind(this);
  }

  render() {
    return (
      <div className={ this.classes() }>
        <h1 className="demo-simple-content__title">
          { this.props.title }
        </h1>

        <div className="demo-simple-content__body">
          { this.props.children }
        </div>

        { this.footerContent() }
      </div>
    );
  }

  /**
   * Returns the HTML classes for the component.
   *
   * @method
   * @return {String}
   */
  classes() {
    return classNames(
      "demo-simple-content",
      this.props.className
    );
  }

  /**
   * Returns the props for the link
   *
   * @method
   * @return {Object}
   */
  linkProps() {
    let defaultLinkProps = {
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
  footerContent() {
    if (this.props.footerContent) {
      return (
        <div className="demo-simple-content__footer">
          <Link { ...this.linkProps() } >
            { this.props.footerContent }
          </Link>
        </div>
      );
    }
  }
}

export default SimpleContent;
