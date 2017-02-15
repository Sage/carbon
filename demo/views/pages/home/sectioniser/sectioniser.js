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

/**
 * builds the sections
 *
 * @private
 * @method _sections
 * @param {Object} props
 * @return {Component}
 */
const _sections = (props) => {
  return props.children.map((child, i) => {
    return <div
             key={ i }
             style={ _prepareStyles(props, i) }
           >
             { child }
             <div className='sectioniser__svg'>{ _prepareSVG(props, i) }</div>
           </div>
  });
}

/**
 * calculates the depth based on section order position and bounds of depth range
 *
 * @private
 * @method _depth
 * @param {Object} props
 * @param {Number} i - section index
 * @return {Number} depth for this section
 */
const _depth = (props, i) => {
  let min = parseInt(props.minDepth, 10),
      max = parseInt(props.maxDepth, 10),
      len = props.children.length;

  return (((max - min) / len) * (len - i)) + min;
}

/**
 * generates inline clip path styles and tweaks for sections but not for the first section as the
 * clipped path effects the top of the element, not the bottom
 *
 * @private
 * @method _prepareStyles
 * @param {Object} props
 * @param {Number} i - section index
 * @return {Object} inline style object
 */
const _prepareStyles = (props, i) => {
  if (i > 0) {
    return {
      clipPath: `url("#clip-shape-${i}")`,
      marginTop: `-${(_depth(props, i))}%`,
      WebkitClipPath: `polygon(0 0, 50% ${_depth(props, i)}%, 100% 0, 100% 100%, 0 100%)`,
      zIndex: i
    };
  }
}

/**
 * generates an SVG version of the clip-path
 *
 * @private
 * @method _prepareSVG
 * @param {Object} props
 * @param {Number} i - section index
 * @return {Component} SVG component
 */
const _prepareSVG = (props, i) => {
  let depth = _depth(props, i);

  return (
    <svg width="0" height="0">
      <defs>
        <clipPath id={ `clip-shape-${i}` } clipPathUnits="objectBoundingBox">
          <polygon points={ `0 0, 0.5 ${(_depth(props, i) / 100)}, 1 0, 1 1, 0 1` } />
        </clipPath>
      </defs>
    </svg>
  );
}
