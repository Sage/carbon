import React from 'react';

/**
 * Wraps each child into a div with a clip path applied, which gradually gets shallower depending on page position
 *
 * @param {object} props.children passed straight through
 * @return {Sectioniser}
 */
export default props => (
  <div className='sectioniser'>
    { _sections(props) }
  </div>
);

const _sections = (props) => {
  return props.children.map((child, i) => {
    return <div
             key={ i }
             style={ _prepareStyles(props, i) }
           >
             { child }
           </div>
  });
}

const _prepareStyles = (props, i) => {
  if (i > 0) {
    let min = parseInt(props.minDepth, 10),
        max = parseInt(props.maxDepth, 10),
        len = props.children.length;

    let depth = `${(((max - min) / len) * (len - i)) + min}px`;

    return {
      marginTop: `-${depth}`,
      WebkitClipPath: `polygon(50% ${depth}, 100% 0, 100% 100%, 0 100%, 0 0)`,
      zIndex: i
    };
  }
}
