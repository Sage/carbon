import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import styled, { css } from "styled-components";
import { margin, layout, background } from "styled-system";
import BaseTheme from "../../style/themes/base";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Image = styled.div.attrs(({ src, children }) => ({
  ...(src && { as: "img" }),
  children: src ? undefined : children,
  src,
}))`
  ${margin}
  ${layout}

  ${({ as }) =>
    as !== "img" &&
    css`
      ${background}
    `}
`;

Image.defaultProps = {
  theme: BaseTheme,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

Image.displayName = "Image";

Image.propTypes = {
  ...marginPropTypes,
  ...styledSystemPropTypes.layout,
  ...styledSystemPropTypes.background,
  /** any valid file path, passing this will render the component as an img element */
  src: PropTypes.string,
  /** alt property to display when an img fails to load */
  alt: (props, propName, componentName) => {
    const prop = props[propName];
    let error;

    if (props.src && (!prop || typeof prop !== "string")) {
      error = new Error(
        // eslint-disable-next-line max-len
        `Please provide an \`${propName}\` string when rendering the \`${componentName}\` component as an \`img\` element.`
      );
    }

    return error;
  },
  /** Children elements, will only render if component is a div element */
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error;

    if (props.src && prop) {
      error = new Error(
        // eslint-disable-next-line max-len
        `The \`${componentName}\` component renders as an \`img\` element when the \`${propName}\` prop is used and therefore does not accept children.`
      );
    }

    return error;
  },
};

export default Image;
