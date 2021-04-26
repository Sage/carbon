import React from "react";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { StyledDl, StyledDtDiv, StyledDdDiv } from "./definition-list.style";
import Dt from "./dt.component";
import Dd from "./dd.component";

const Dl = ({
  children,
  w = 50,
  dtTextAlign = "right",
  ddTextAlign = "left",
  ...props
}) => {
  const dlComponent = [];
  const listChildren = React.Children.toArray(children);
  let key = "";

  const composeDlComponent = (array) => {
    let dtLabel;
    let ddContent = [];
    let isLastChild;
    let nextItemIsNotDd;

    array.forEach((child, index) => {
      if (child.type === React.Fragment) {
        composeDlComponent(child.props.children);
      } else {
        if (child.type === Dt) {
          dtLabel = child;
        }
        if (child.type === Dd) {
          ddContent.push(child);
        }

        isLastChild = index === listChildren.length - 1;
        nextItemIsNotDd =
          !isLastChild &&
          [Dt, React.Fragment].includes(listChildren[index + 1].type);

        if (dtLabel && (nextItemIsNotDd || isLastChild)) {
          key = `${key + 1}`;

          dlComponent.push(
            <React.Fragment key={child.props.key || key}>
              <StyledDtDiv dtTextAlign={dtTextAlign}>{dtLabel}</StyledDtDiv>
              <StyledDdDiv ddTextAlign={ddTextAlign}>{ddContent}</StyledDdDiv>
            </React.Fragment>
          );

          ddContent = [];
        }
      }
    });

    return dlComponent;
  };

  return (
    <StyledDl w={w} data-component="dl" {...props}>
      {composeDlComponent(listChildren)}
    </StyledDl>
  );
};

Dl.propTypes = {
  ...propTypes.space,
  /** This string will specify the text align styling of the `<dt></dt>`. */
  dtTextAlign: PropTypes.oneOf(["left", "center", "right"]),
  /** This string will specify the text align styling of the `<dd></dd>`. */
  ddTextAlign: PropTypes.oneOf(["left", "center", "right"]),
  /** This value will specify the width of the `StyledDtDiv` as a percentage. The remaining space will be taken up
      by the `StyledDdDiv`.
   */
  w: PropTypes.number,
  /**
   * @private
   * @ignore
   */
  children: PropTypes.node.isRequired,
};
export default Dl;
