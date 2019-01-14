import PropTypes from 'prop-types';

export default {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  onLazyLoad: PropTypes.func,
  keyNavigation: PropTypes.bool,
  maxHeight: PropTypes.string
};
