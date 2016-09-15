import ReactDOM from 'react-dom';

export default (ref) => {
  let node = ReactDOM.findDOMNode(ref._input);
  node.focus();
  node.select();
};
