import React from "react";
import { SpaceProps } from "styled-system";
import { isElement, isFragment } from "react-is";
import {
  StyledDl,
  StyledDtDiv,
  StyledDdDiv,
  StyledDtDivProps,
  StyledDdDivProps,
  StyledDlProps,
} from "./definition-list.style";
import Dt from "./dt.component";
import Dd from "./dd.component";
import DlContext from "./__internal__/dl.context";

export interface DlProps
  extends SpaceProps,
    StyledDlProps,
    StyledDtDivProps,
    StyledDdDivProps {
  /** HTML id attribute of the input */
  id?: string;
  /** prop to render children. */
  children: React.ReactNode;
}

const Dl = ({
  children,
  w = 50,
  dtTextAlign = "right",
  ddTextAlign = "left",
  asSingleColumn = false,
  ...rest
}: DlProps) => {
  const dlComponent: React.ReactNode[] = [];
  const listChildren = React.Children.toArray(children);
  let key = "";

  const composeDlComponent = (childrenArray: React.ReactNode[]) => {
    let dtLabel: React.ReactNode;
    let ddContent: React.ReactNode[] = [];
    let isLastChild;
    let nextItemIsNotDd;

    childrenArray.forEach((child: React.ReactNode, index: number) => {
      if (isFragment(child)) {
        composeDlComponent(child.props.children);
      } else {
        if (isElement(child) && child.type === Dt) {
          dtLabel = child;
        }
        if (isElement(child) && child.type === Dd) {
          ddContent.push(child);
        }

        isLastChild = index === childrenArray.length - 1;

        const originalKey = isElement(child) && child.props.key;
        const nextItem = childrenArray[index + 1];
        const isNextItemDt = isElement(nextItem) && nextItem.type === Dt;

        nextItemIsNotDd =
          !isLastChild && (isNextItemDt || isFragment(nextItem));

        if (dtLabel && (nextItemIsNotDd || isLastChild)) {
          key = `${key + 1}`;

          dlComponent.push(
            <React.Fragment key={originalKey || key}>
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
    <StyledDl
      w={w}
      data-component="dl"
      asSingleColumn={asSingleColumn}
      {...rest}
    >
      <DlContext.Provider value={{ asSingleColumn }}>
        {composeDlComponent(listChildren)}
      </DlContext.Provider>
    </StyledDl>
  );
};

Dl.displayName = "Dl";
export default Dl;
