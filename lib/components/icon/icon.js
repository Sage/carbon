/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_tooltipDecorator = require('./../../utils/decorators/tooltip-decorator');

/*istanbul ignore next*/
var _tooltipDecorator2 = _interopRequireDefault(_tooltipDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * For information on how to use the Tooltip Decorator see the decorator docs.
 *
 * @class Icon
 * @constructor
 */
var Icon = /*istanbul ignore next*/(0, _tooltipDecorator2.default)( /*istanbul ignore next*/function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      /*istanbul ignore next*/
      var _this2 = this;

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'span',
          /*istanbul ignore next*/_extends({
            className: this.mainClasses
          }, this.componentProps, {
            ref: function /*istanbul ignore next*/ref(comp) /*istanbul ignore next*/{
              return (/*istanbul ignore next*/_this2._target = comp
              );
            }
          }),
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'span', /*istanbul ignore next*/{ className: 'ui-icon__svg-icon', dangerouslySetInnerHTML: this.renderIcon }),
          this.tooltipHTML
        )
      );
    }

    /**
     * Returns the 'warning' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderWarningIcon
     * @return {Object} warningIcon svg
     */

  }, {
    key: 'renderIcon',


    /**
     * Checks if we have an SVG available, otherwise will fall back
     * to using the icon font.
     *
     * @method renderIcon
     * @return {HTML}
     */
    get: function get() {
      switch (this.type) {
        case 'warning':
          return this.renderWarningIcon;
        case 'new':
          return this.renderNewIcon;
        case 'maintenance':
          return this.renderMaintenanceIcon;
        case 'sort-up':
          return this.renderSortUpIcon;
        case 'sort-down':
          return this.renderSortDownIcon;
        case 'refresh':
          return this.renderRefreshIcon;
        case 'bin':
          return this.renderBinIcon;
        case 'basket':
          return this.renderBasketIcon;
        case 'phone':
          return this.renderPhoneIcon;
        case 'processing':
          return this.renderProcessingIcon;
        case 'mobile':
          return this.renderMobileIcon;
        case 'location':
          return this.renderLocationIcon;
        case 'email':
          return this.renderEmailIcon;
        case 'minus':
          return this.renderMinusIcon;
        case 'plus':
          return this.renderPlusIcon;
        case 'business':
          return this.renderBusinessIcon;
        case 'individual':
          return this.renderIndividualIcon;
        case 'external-link':
          return this.renderExternalLinkIcon;
        case 'edit':
          return this.renderEditIcon;
        case 'white-tick':
          return this.renderWhiteTickIcon;
        case 'paperclip':
          return this.renderPaperclipIcon;
        case 'help':
          return this.renderHelpIcon;
        case 'chevron':
          return this.renderChevronIcon;
        case 'information':
          return this.renderInformationIcon;
        case 'sync':
          return this.renderSyncIcon;
        case 'progress':
          return this.renderProgressIcon;
        case 'submitted':
          return this.renderSubmittedIcon;
        case 'completed':
          return this.renderCompletedIcon;
        default:
          null;
      }
    }

    /**
     * Return component props
     *
     * @method componentProps
     * @return {Object} props
     */

  }, {
    key: 'componentProps',
    get: function get() {
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var className = _props.className;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['className']);

      props.type = this.type;

      return props;
    }

    /**
     * Return component classes
     *
     * @method mainClasses
     * @return {String} classes
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      var icon = this.renderIcon;

      var classes = /*istanbul ignore next*/(0, _classnames2.default)('ui-icon', this.props.className, /*istanbul ignore next*/_defineProperty({}, 'icon-' + this.type, !icon));
      return classes;
    }

    /**
     * Return Icon type with overrides
     *
     * @method type
     * @return {String} icon type
     */

  }, {
    key: 'type',
    get: function get() {
      // we have no icon for 'success', so use 'tick'
      return this.props.type == 'success' ? 'tick' : this.props.type;
    }
  }, {
    key: 'renderWarningIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--warning" width="25px" height="20px" viewBox="0 0 50 40" version="1.1" xmlns="http://www.w3.org/2000/svg">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M23.4139163,5.53773397 C24.2898861,4.1361822 25.7118106,4.13889694 26.5860837,5.53773397 L43.4139163,32.462266 C44.2898861,33.8638178 43.6576906,35 41.9934988,35 L8.0065012,35 C6.34605644,35 5.71181059,33.8611031 6.58608373,32.462266 L23.4139163,5.53773397 Z M23,12 L27,12 L27,24 L23,24 L23,12 Z M25,32 C26.6568542,32 28,30.6568542 28,29 C28,27.3431458 26.6568542,26 25,26 C23.3431458,26 22,27.3431458 22,29 C22,30.6568542 23.3431458,32 25,32 Z"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }
  }, {
    key: 'renderSortDownIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--sort-down" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<title>sort-down</title>' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' + '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">' + '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' + '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-down"></path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }
  }, {
    key: 'renderSortUpIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--sort-up" width="10px" height="11px" viewBox="0 0 10 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '<title>sort-up</title>' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '<g id="Paginated-Grid" sketch:type="MSArtboardGroup" transform="translate(-511.000000, -164.000000)" fill="currentColor">' + '<g id="Group" sketch:type="MSLayerGroup" transform="translate(90.000000, 150.000000)">' + '<g id="Header" transform="translate(-1.000000, -1.000000)" sketch:type="MSShapeGroup">' + '<path d="M426,20 L422,20 L427,26 L432,20 L428,20 L428,15 L426,15 L426,20 Z" id="sort-up" transform="translate(427.000000, 20.500000) scale(1, -1) translate(-427.000000, -20.500000) "></path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'new' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderNewIcon
     * @return {Object} newIcon svg
     */

  }, {
    key: 'renderNewIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--new" width="50px" height="40px" viewBox="0 0 50 40">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M12,20 L21,20 L21,33 L12,33 L12,20 Z M29,20 L38,20 L38,33 L29,33 L29,20 Z M22,12 L28,12 L28,33 L22,33 L22,12 Z M11,12 L21,12 L21,19 L11,19 L11,12 Z M29,12 L39,12 L39,19 L29,19 L29,12 Z M23,8 L27,8 L27,11 L23,11 L23,8 Z M14,5 C16.1114562,4.20820393 22,8 22,8 L22,11 L14,11 C14,11 11.8885438,5.79179607 14,5 Z M36.061575,5 C33.9501189,4.20820393 28.061575,8 28.061575,8 L28.061575,11 L36.061575,11 C36.061575,11 38.1730312,5.79179607 36.061575,5 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'info' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderMaintenanceIcon
     * @return {Object} infoIcon svg
     */

  }, {
    key: 'renderMaintenanceIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--maintenance" width="50px" height="40px" viewBox="0 0 50 40">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g class="ui-icon__svg-group" fill="currentColor">' + '<path d="M35.2343942,10.801511 C34.4036528,9.97082285 34.4036528,8.61548951 35.2343942,7.78480133 L37.1582163,5.86110239 C37.3768325,5.64250024 37.2456628,5.29273679 36.9396002,5.20529593 C35.0595013,4.68065077 32.917063,5.1615755 31.4304732,6.64807014 C29.8127137,8.26572606 29.4192046,10.5829089 30.1187763,12.5503282 C30.1624995,12.6814895 30.1624995,12.8563713 30.0313298,12.9875325 L18.0074416,25.0106509 C17.876272,25.1418122 17.7451023,25.1418122 17.5702094,25.0980918 C15.5589408,24.3548445 13.2416096,24.7920488 11.6675733,26.4097047 C10.1372603,27.9399198 9.70002798,30.0385004 10.2247067,31.9621994 C10.3121532,32.2682424 10.7056623,32.3556832 10.9242784,32.1370811 L12.8481005,30.2133821 C13.6788419,29.382694 15.034262,29.382694 15.8650034,30.2133821 C16.6957448,31.0440703 16.6957448,32.3994037 15.8650034,33.2300918 L13.9411813,35.1537908 C13.7225651,35.3723929 13.8100116,35.7658768 14.1160742,35.8533177 C15.9961731,36.3779628 18.1386113,35.9407585 19.6252012,34.4105435 C21.2429607,32.7928875 21.6364697,30.4757047 20.936898,28.5082853 C20.8931748,28.3771241 20.8931748,28.2022423 21.0243445,28.071081 L33.0919559,16.0042422 C33.2231256,15.873081 33.3542953,15.873081 33.5291882,15.9168014 C35.5404568,16.6600487 37.857788,16.2228444 39.4318243,14.6051885 C40.9184141,13.1186938 41.3993696,10.9763927 40.8746908,9.09641424 C40.7872444,8.79037123 40.3937353,8.70293037 40.1751192,8.92153252 L38.2075738,10.801511 C37.3768325,11.6759196 36.0651356,11.6759196 35.2343942,10.801511 Z M20.936898,19.633038 L24.6533726,15.9168014 C24.8719887,15.6981992 24.8719887,15.3047154 24.6533726,15.0861132 L15.5589408,5.99226368 C14.3784136,4.81181206 12.2796985,4.68065077 11.0117249,5.86110239 C9.70002798,7.08527444 9.65630475,9.1838551 10.9242784,10.4517476 L20.1061567,19.633038 C20.3247728,19.8516401 20.7182819,19.8516401 20.936898,19.633038 Z M39.4755475,31.8310381 C39.388101,31.7435972 39.3006546,31.6561563 39.2132081,31.6124359 L37.5954486,30.7817477 C37.5517254,30.7380273 37.4642789,30.6943069 37.4205557,30.6505864 L29.5503743,22.780909 C29.3317582,22.5623068 28.9382491,22.5623068 28.719633,22.780909 L27.7577219,23.7427584 C27.5391058,23.9613606 27.5391058,24.3548445 27.7577219,24.5734466 L35.6279033,32.4431241 C35.6716265,32.4868445 35.7153497,32.5742854 35.759073,32.6180058 L36.5898143,34.2356617 C36.6335376,34.3231026 36.720984,34.4105435 36.8084305,34.4979843 L38.9508687,35.9407585 C39.2132081,36.1156402 39.6067172,36.0719198 39.8253333,35.8533177 L40.7872444,34.8914682 C41.0058605,34.672866 41.0495838,34.2793822 40.8746908,34.0170596 L39.4755475,31.8310381 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'info' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderRefreshIcon
     * @return {Object} refreshIcon svg
     */

  }, {
    key: 'renderRefreshIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--refresh" width="13px" height="16px" viewBox="0 0 13 16">' + '<g class="ui-icon__svg-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g transform="translate(-1029.000000, -227.000000)" fill="currentColor">' + '<g id="Tags" transform="translate(505.000000, 227.000000)">' + '<g transform="translate(524.000000, 0.000000)">' + '<path d="M7.00097862,2.70098912 C10.3528746,2.9650394 12.9924827,5.8368169 12.9924827,9.34059286 C12.9924827,13.0184819 10.0840164,16 6.49624136,16 C2.90846633,16 0,13.0184819 0,9.34059286 C0,8.86925873 0.0477666277,8.40936132 0.138608168,7.96571016 L1.99884343,7.96571016 C1.99884343,7.96571016 1.9988435,8.68664161 1.9988435,9.34059286 C1.9988435,11.8868237 4.01239711,13.9509517 6.49624136,13.9509517 C8.98008562,13.9509517 10.9936392,11.8868237 10.9936392,9.34059286 C10.9936392,6.96927971 9.24723222,5.01610685 7.00097862,4.75894453 L7.00097862,8 L2.00097862,3.5 L7.00097862,1.77635684e-14 L7.00097862,2.70098912 Z" id="Icon-path">' + '</path>' + '</g>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'bin' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderBinIcon
     * @return {Object} binIcon svg
     */

  }, {
    key: 'renderBinIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--bin" width="16px" height="16px" viewBox="0 0 16 16">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g fill="currentColor">' + '<path d="M2.17748666,5.97617662 C2.07946348,5.43704916 2.44483697,5 2.9955775,5 L12.0044225,5 C12.5542648,5 12.9191206,5.44483697 12.8225133,5.97617662 L11.1774867,15.0238234 C11.0794635,15.5629508 10.5621186,16 9.99707067,16 L5.00292933,16 C4.44902676,16 3.91912055,15.555163 3.82251334,15.0238234 L2.17748666,5.97617662 Z M1,3 C1,2.44771525 1.44748943,2 1.99850233,2 L13.0014977,2 C13.5529553,2 14,2.44386482 14,3 C14,3.55228475 13.5525106,4 13.0014977,4 L1.99850233,4 C1.44704472,4 1,3.55613518 1,3 Z"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'basket' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderBasketIcon
     * @return {Object} basketIcon svg
     */

  }, {
    key: 'renderBasketIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--basket" width="16px" height="16px" viewBox="0 0 16 16">' + '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g fill="currentColor">' + '<g>' + '<path d="M0.337342083,6.94077572 C0.151033195,6.42119964 0.444630861,6 1.00087166,6 L14.9991283,6 C15.5518945,6 15.8532955,6.4296875 15.6787991,6.94077572 L12.9069874,15.0592243 C12.729593,15.5788004 12.139475,16 11.5882418,16 L4.58333108,16 C4.03240239,16 3.43170968,15.5703125 3.24844436,15.0592243 L0.337342083,6.94077572 Z"></path>' + '<path d="M11.2490328,9.98677324 L13.3894251,7.19607664 C13.7305431,6.75131854 13.6812982,6.0812921 13.2881596,5.68815351 L8.71184039,1.11183429 C8.32258606,0.722579956 7.6812982,0.718695695 7.28815961,1.11183429 L2.71184039,5.68815351 C2.32258606,6.07740784 2.27628578,6.74998266 2.61710155,7.18171568 L7.4694029,13.3284345 C7.56110619,13.4446008 7.6681764,13.5290423 7.78226818,13.5817768 L4.21712756,7.84506121 C3.92708311,7.37834679 4.00177955,6.66917891 4.37457806,6.27111536 L7.31737756,3.12887854 C7.69437952,2.72632667 8.30939903,2.72345739 8.68749905,3.11874485 L11.7124949,6.28124905 C12.0921901,6.67820424 12.2392384,7.41716468 12.0433089,7.92560655 L11.2490328,9.98677324 Z"></path>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'processing' icon
     * TODO: React UPGRADE v15.0.0
     *
     * @method renderProcessingIcon
     * @return {Object} processingIcon svg
     */

  }, {
    key: 'renderProcessingIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--processing" xmlns="http://www.w3.org/2000/svg" width="18" height="18">' + '<g fill="none" fill-rule="evenodd">' + '<path fill="currentColor" fill-opacity=".2" stroke="currentColor" d="M9 17c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-3c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"/>' + '<path fill="currentColor" d="M4.774 11.673L2.52 13.69C3.972 15.697 6.333 17 9 17c4.418 0 8-3.582 8-8s-3.582-8-8-8v3c2.76 0 5 2.24 5 5s-2.24 5-5 5c-1.778 0-3.34-.93-4.226-2.327z"/>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'phone' icon
     *
     * @method renderPhoneIcon
     * @return {Object} phoneIcon svg
     */

  }, {
    key: 'renderPhoneIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--phone" width="16" height="16" viewBox="0 0 16 16">' + '<path d="M12.01.01c-.333-.036-.518.038-1 0l-2 5c.15-.314 2 2 2 2-.684 1.834-2.166 3.334-4 4l-2-2c-.166.186-5 2-5 2 .038.482-.036.667 0 1l2 4c7.297-.925 13.075-6.684 14-14-.055-.296-4-2-4-2z" fill="currentColor" fill-rule="evenodd"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'mobile' icon
     *
     * @method renderMobileIcon
     * @return {Object} MobileIcon svg
     */

  }, {
    key: 'renderMobileIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--mobile" width="16" height="16" viewBox="0 0 16 16">' + '<path d="M2 1c0-.552.456-1 1.002-1h9.996C13.55 0 14 .445 14 1v14c0 .552-.456 1-1.002 1H3.002C2.45 16 2 15.555 2 15V1zm2 1h8v10H4V2zm3 11h2v2H7v-2z" fill="currentColor" fill-rule="evenodd"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'location' icon
     *
     * @method renderLocationIcon
     * @return {Object} LocationIcon svg
     */

  }, {
    key: 'renderLocationIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--location" width="16" height="16" viewBox="0 0 16 16">' + '<path d="M9 7.87c.344-.2.623-.505.798-.87H10V5h-.322c-.172-.27-.404-.495-.678-.656V4H7v.344c-.274.16-.506.387-.678.656H6v2h.202c.175.365.454.67.798.87V8h.26c.23.093.48.144.74.144s.51-.05.74-.144H9v-.13zm4.688.188c.202-.612.312-1.268.312-1.95C14 2.735 11.314 0 8 0S2 2.735 2 6.108c0 .695.114 1.364.324 1.986-.018.01-.026.02-.022.03.964 2.935 5.693 7.376 5.693 7.376s4.61-4.35 5.687-7.376c.008-.023.01-.045.006-.066z" fill="currentColor" fill-rule="evenodd"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'email' icon
     *
     * @method renderEmailIcon
     * @return {Object} Email Icon svg
     */

  }, {
    key: 'renderEmailIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--email" xmlns="http://www.w3.org/2000/svg" width="16" height="12">' + '<path fill="currentColor" fill-rule="evenodd" d="M.2696 1C.6154.402 1.259 0 1.994 0h12.012c.7358 0 1.3785.4027 1.724 1H16v8.9916C16 11.1006 15.1055 12 14.006 12H1.994C.893 12 0 11.098 0 9.9915V1h.2696zM2 3.01l5.1497 2.355c.502.2296 1.311.2344 1.8196.0048L14 3.0993v1.741L8.924 6.919c-.5103.209-1.3446.2047-1.843-.001L2 4.8197v-1.81z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'minus' icon
     *
     * @method renderMinusIcon
     * @return {Object} Minus Icon svg
     */

  }, {
    key: 'renderMinusIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--minus" xmlns="http://www.w3.org/2000/svg" width="16" height="4">' + '<path fill-rule="evenodd" d="M0 0h16v4H0z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'plus' icon
     *
     * @method renderPlusIcon
     * @return {Object} Plus Icon svg
     */

  }, {
    key: 'renderPlusIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--plus" xmlns="http://www.w3.org/2000/svg" width="16" height="16">' + '<path fill-rule="evenodd" d="M10 6V0H6v6H0v4h6v6h4v-6h6V6h-6z"/>' + '</svg>'
      };
    }
    /**
     * Returns the 'business' icon
     *
     * @method renderBusinessIcon
     * @return {Object} Business Icon svg
     */

  }, {
    key: 'renderBusinessIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--business" width="16" height="16" viewBox="0 0 16 16">' + '<path id="business" fill="currentColor" fill-rule="evenodd" d="M14 8v7.002c0 .55-.456.998-1.002.998H3.002C2.45 16 2 15.554 2 15.002V8H0l2-5h12l2 5h-2zM4 10h2v6H4v-6zm4 0h4v3H8v-3zM3 1c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1v1H3V1z"/>' + '</svg>'
      };
    }
    /**
     * Returns the 'individual' icon
     *
     * @method renderIndividualIcon
     * @return {Object} Individual Icon svg
     */

  }, {
    key: 'renderIndividualIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--individual" width="16" height="16">' + '<path fill="currentColor" fill-rule="evenodd" d="M15.986 12.256c.007-.05.012-.1.014-.15-.083-1.704-3.886-4.195-8.03-4.195-4.143 0-7.946 2.493-7.97 4.35 0 .078.01.153.022.228l-.016 2.51C.003 15.558.448 16 1 16h14c.555 0 1-.45 1-1.003v-2.74h-.014zM8 6c1.657 0 3-1.343 3-3S9.657 0 8 0 5 1.343 5 3s1.343 3 3 3z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'external-link' icon
     *
     * @method renderExternalLinkIcon
     * @return {Object} externalLink icon svg
     */

  }, {
    key: 'renderExternalLinkIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--external-link" width="16px" height="16px" viewBox="0 0 16 16">' + '<path fill="currentColor" fill-rule="evenodd" d="M7 0H1.994C.894 0 0 .893 0 1.994v12.012C0 15.106.893 16 1.994 16h12.012c1.1 0 1.994-.893 1.994-1.994V9h-2v3.998C14 13.55 13.544 14 12.998 14H3.002C2.45 14 2 13.544 2 12.998V3.002C2 2.45 2.456 2 3.002 2H7V0zm8.414 2H16V0H9v2h3.586l-8.243 8.243 1.414 1.414L14 3.414V7h2V2h-.586z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'edit' icon
     *
     * @method renderExternalLinkIcon
     * @return {Object} renderEditIcon icon svg
     */

  }, {
    key: 'renderEditIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--edit" width="13px" height="13px" viewBox="0 0 13 13">' + '<g id="edit-copy__icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g transform="translate(-673.000000, -259.000000)">' + '<g transform="translate(673.000000, 258.000000)">' + '<path fill="currentColor" d="M0.0048828125,14 L0,11 L3,14 L0.0048828125,14 Z M1.00048828,10 L4.00048828,13 L11.0004883,6 L8.00048828,3 L1.00048828,10 Z M9,2 L12,5 L13,4 L10,1 L9,2 Z"/>' + '</g>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'paperclip' icon
     *
     * @method renderPaperclipIcon
     * @return {Object} paperclipIcon icon svg
     */

  }, {
    key: 'renderPaperclipIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--paperclip" width="19px" height="20px" viewBox="0 0 19 20">' + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="paperclip" transform="translate(-1186.000000, -662.000000)" stroke="#255BC7">' + '<path d="M1188.29912,679.541094 C1186.56693,677.808725 1186.56693,674.990161 1188.2993,673.258149 L1197.61304,663.944766 C1198.2222,663.335424 1199.03162,663 1199.89199,663 C1200.75237,663 1201.56196,663.335424 1202.17112,663.944766 C1202.78672,664.560545 1203.12233,665.369961 1203.12233,666.230513 C1203.12233,667.091066 1202.78672,667.900482 1202.17738,668.509645 L1193.58813,677.098541 L1193.47263,677.202065 C1192.77693,677.888647 1191.65265,677.885787 1190.96088,677.194555 C1190.61115,676.844827 1190.42574,676.397476 1190.42574,675.921696 C1190.42574,675.446273 1190.61133,674.998922 1190.94801,674.662246 L1195.41169,670.198745 C1195.55133,670.059104 1195.77768,670.059104 1195.91732,670.198745 C1196.05697,670.338386 1196.05697,670.564744 1195.91732,670.704385 L1191.45364,675.167886 C1191.25196,675.369748 1191.14093,675.637229 1191.14093,675.921875 C1191.14093,676.206342 1191.25196,676.474001 1191.45364,676.675864 C1191.88204,677.104263 1192.55861,677.103905 1192.97432,676.688737 L1201.67174,668.004006 C1202.14591,667.529835 1202.40714,666.899931 1202.40714,666.230513 C1202.40714,665.561096 1202.14591,664.931192 1201.67174,664.4572 C1201.19131,663.976234 1200.56141,663.71519 1199.89199,663.71519 C1199.22258,663.71519 1198.59267,663.976234 1198.11868,664.450405 L1188.80494,673.763968 C1187.35149,675.217234 1187.35149,677.58201 1188.80476,679.035454 C1190.25785,680.488363 1192.6228,680.488899 1194.07643,679.035454 L1203.38963,669.721714 C1203.52927,669.582073 1203.75563,669.582073 1203.89527,669.721714 C1204.03491,669.861354 1204.03491,670.087712 1203.89527,670.227353 L1194.58206,679.541094 C1193.71597,680.407189 1192.5781,680.840237 1191.44059,680.840237 C1190.3029,680.840237 1189.16504,680.407189 1188.29912,679.541094 Z" id="Shape"></path>' + '</g>' + '</g>' + '</svg>'
      };
    }

    /**
     * Returns the 'white-tick' icon
     *
     * @method renderWhiteTickIcon
     * @return {Object} whiteTick icon svg
     */

  }, {
    key: 'renderWhiteTickIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--white-tick"  width="15px" height="13px" viewBox="0 0 15 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">' + '  <!-- Generator: Sketch 3.4 (15575) - http://www.bohemiancoding.com/sketch -->' + '  <title>tick</title>' + '  <desc>Created with Sketch.</desc>' + '  <defs></defs>' + '  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">' + '    <g id="QSW---Step-2" sketch:type="MSArtboardGroup" transform="translate(-518.000000, -174.000000)" fill="#FFFFFF">' + '      <g id="Overlay" sketch:type="MSLayerGroup">' + '        <g id="Dialog" transform="translate(433.000000, 60.000000)" sketch:type="MSShapeGroup">' + '          <g id="progress-bar" transform="translate(77.000000, 87.000000)">' + '            <g id="business-basics">' + '              <path d="M12.1349063,38.4860814 L8.81960483,35.6607151 C8.4628233,35.3566587 8.41656446,34.8166977 8.71591615,34.454366 L9.79923038,33.1431352 C10.0989393,32.7803711 10.6303501,32.7334485 10.9869674,33.037365 L13.7895069,35.4257453 L19.7381802,28.2255413 C20.0374529,27.8633052 20.5692891,27.8160953 20.9260425,28.1201277 L22.2170862,29.220381 C22.5742654,29.5247762 22.6204272,30.0645427 22.3211424,30.4267934 L15.9731521,38.1103259 C15.9424206,38.1779211 15.9024384,38.2425382 15.8530479,38.3023198 L14.7697337,39.6135505 C14.5680446,39.8576726 14.2614267,39.9587622 13.9737606,39.9061537 C13.8218425,39.8848846 13.6737922,39.8212943 13.5476358,39.7137813 L12.2565922,38.613528 C12.2109212,38.5746063 12.1703353,38.5318364 12.1349063,38.4860814 L12.1349063,38.4860814 Z" id="tick"></path>' + '            </g>' + '          </g>' + '        </g>' + '      </g>' + '    </g>' + '  </g>' + '</svg>'
      };
    }

    /**
     * Returns the 'help' icon
     *
     * @method renderHelpIcon
     * @return {Object} help icon svg
     */

  }, {
    key: 'renderHelpIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--help" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' + '  <path fill="currentColor" fill-rule="evenodd" d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm1-3.234c0 .13-.102.234-.228.234H7.228C7.102 13 7 12.896 7 12.766v-1.532c0-.13.102-.234.228-.234h1.544c.126 0 .228.104.228.234v1.532zm.915-4.877l-.497.394c-.192.15-.315.314-.375.506-.027.085-.026.59-.03.96-.003.146-.12.263-.267.263h-1.48c-.074 0-.143-.03-.193-.082-.05-.05-.077-.12-.075-.193.025-.72.013-1.555.13-1.848.124-.308.416-.638.89-1.01l.447-.348c.12-.09.216-.188.293-.3.128-.177.254-.462.254-.67 0-.254.107-.794-.993-.794s-.994.69-.994.978c0 .147-.12.266-.266.266H5.27c-.072 0-.14-.03-.192-.082-.05-.052-.077-.123-.073-.196.05-1.235.16-2 .988-2.527.517-.333 1.284-.242 2.026-.242.962 0 1.54-.08 2.188.387.673.486.822 1.158.822 2.1 0 .58-.022 1.158-.313 1.56 0 0-.34.52-.802.877z" />' + '</svg>'
      };
    }

    /**
     * Returns the 'chevron' icon
     *
     * @method renderChevronIcon
     * @return {Object} chevron icon svg
     */

  }, {
    key: 'renderChevronIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' + '  <path fill="currentColor" fill-rule="evenodd" d="M7.3 8.01l4.845-4.43c.395-.384.396-1.01.002-1.4l-.77-.87c-.393-.388-1.038-.404-1.455-.02L3.358 7.317c-.41.377-.45 1.027-.03 1.37l6.598 6.02c.41.375 1.058.36 1.452-.028l.776-.788c.393-.388.39-1.014-.007-1.397L7.3 8.01z" />' + '</svg>'
      };
    }

    /**
     * Returns the 'information' icon
     *
     * @method renderInformationIcon
     * @return {Object} information icon svg
     */

  }, {
    key: 'renderInformationIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--information" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM7 6h2v7H7V6zm0-3h2v2H7V3z"/></svg>'
      };
    }

    /**
     * Returns the 'sync' icon
     *
     * @method renderSyncIcon
     * @return {Object} sync icon svg
     */

  }, {
    key: 'renderSyncIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--sync" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M2.343 2.343C3.79.895 5.79 0 8 0c4.08 0 7.446 3.054 7.938 7h-2.02C13.44 4.162 10.972 2 8 2c-1.657 0-3.157.672-4.243 1.757L7 7l-7 .005V0l2.343 2.343zm11.315 11.312C12.21 15.105 10.21 16 8 16 3.92 16 .554 12.946.062 9h2.02C2.56 11.838 5.028 14 8 14c1.657 0 3.158-.672 4.244-1.758L9 9h7v6.996l-2.342-2.34z"/></svg>'
      };
    }

    /**
     * Returns the 'progess' icon
     *
     * @method renderProgressIcon
     * @return {Object} progress icon svg
     */

  }, {
    key: 'renderProgressIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--progress" width="16" height="16" viewBox="0 0 16 16">' + '<path fill="currentColor" fill-rule="evenodd" d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM3 7h2v2H3V7zm4 0h2v2H7V7zm4 0h2v2h-2V7z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'submitted' icon
     *
     * @method renderSubmittedIcon
     * @return {Object} submitted icon svg
     */

  }, {
    key: 'renderSubmittedIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--submitted" width="16" height="16" viewBox="0 0 16 16">' + '<path fill="currentColor" fill-rule="evenodd" d="M9 7.038H1.007c-.557 0-1.007.448-1.007 1 0 .556.45 1 1.007 1H9v4.5c0 .552.336.705.75.342l5.9-5.172c.413-.363.414-.954 0-1.318l-5.9-5.192c-.413-.363-.75-.213-.75.338v4.502z"/>' + '</svg>'
      };
    }

    /**
     * Returns the 'completed' icon
     *
     * @method renderCompletedIcon
     * @return {Object} completed icon svg
     */

  }, {
    key: 'renderCompletedIcon',
    get: function get() {
      return {
        __html: '<svg class="ui-icon__svg ui-icon__svg--completed" width="16" height="16" viewBox="0 0 16 16">' + '<path fill="currentColor" fill-rule="evenodd" d="M2.9 8.3c-.404-.396-1.043-.4-1.445-.024L.318 9.5c-.407.38-.41.998-.017 1.39l3.92 3.803c.4.398 1.04.405 1.447.03l10.1-9.98c.312-.368.308-.9-.012-1.255L14.63 2.262c-.395-.36-1.05-.35-1.443.04L5.03 10.52 2.9 8.3z"/>' + '</svg>'
      };
    }
  }]);

  return Icon;
}( /*istanbul ignore next*/_react2.default.Component));

/*istanbul ignore next*/exports.default = Icon;