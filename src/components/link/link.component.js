import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign } from 'lodash';
import { Link } from 'react-router';
import Icon from '../icon';
import { validProps } from '../../utils/ether';
import Event from '../../utils/helpers/events';
import tagComponent from '../../utils/helpers/tags';
// import './link.scss';
import LinkStyle from './link.style';

class _Link extends React.Component {
  static safeProps = ['onClick']

  constructor() {
    super();
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(ev) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }

    // return early if there is no onClick or there is a href prop
    if (!this.props.onClick || this.props.href) { return; }
    // return early if the event is not an enter key
    if (!Event.isEnterKey(ev)) { return; }

    this.props.onClick(ev);
  }

  get iconLeft() {
    if (!this.props.icon || this.props.iconAlign !== 'left') { return null; }
    return this.icon;
  }

  get iconRight() {
    if (!this.props.icon || this.props.iconAlign !== 'right') { return null; }
    return this.icon;
  }


  get icon() {
    const classes = classNames(
      'carbon-link__icon',
      `carbon-link__icon--align-${this.props.iconAlign}`
    );

    return (
      <Icon
        type={ this.props.icon }
        className={ classes }
        tooltipMessage={ this.props.tooltipMessage }
        tooltipAlign={ this.props.tooltipAlign }
        tooltipPosition={ this.props.tooltipPosition }
      />
    );
  }

  get tabIndex() {
    return this.props.tabbable && !this.props.disabled ? '0' : '-1';
  }


  get typeRegex() {
    return /^href:|^to:/;
  }


  get componentProps() {
    let { ...props } = validProps(this);
    props.tabIndex = this.tabIndex;

    props = assign({}, props, tagComponent('link', this.props));

    delete props.href;
    delete props.tabbable;
    delete props.to;

    props.className = this.props.className;
    props[this.linkType.prop] = this.url;
    props.onKeyDown = this.onKeyDown;

    return props;
  }

  get linkTypes() {
    return {
      to: {
        prop: 'to',
        component: Link
      },
      href: {
        prop: 'href',
        component: 'a'
      }
    };
  }

  get linkType() {
    const url = this.props.href || this.props.to;
    let type = 'href';

    if (url) {
      const match = url.match(this.typeRegex);

      if (match) {
        type = match[0].substr(0, match[0].length - 1);
      } else if (this.props.href) {
        type = 'href';
      } else {
        type = 'to';
      }
    }

    return this.linkTypes[type];
  }

  get url() {
    const url = this.props.href || this.props.to;
    if (!url) { return null; }

    return url.replace(this.typeRegex, '');
  }

   linkTypeHOC = (Component, props) => (
     <LinkStyle disabled={ this.props.disabled }>
       <Component { ...props }>
         <span>
           { this.iconLeft }

           <span>
             { this.props.children }
           </span>

           { this.iconRight }
         </span>
       </Component>
     </LinkStyle>
   );

   render() {
     return (
       this.linkTypeHOC(this.linkType.component, this.componentProps)
     );
   }
}


_Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconAlign: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabbable: PropTypes.bool,
  to: PropTypes.string,
  tooltipMessage: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipAlign: PropTypes.string
};

_Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};

export default _Link;
