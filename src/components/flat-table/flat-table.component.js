import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
} from "./flat-table.style";
import { DrawerSidebarContext } from "../drawer";
import { filterStyledSystemMarginProps } from "../../style/utils";

export const FlatTableThemeContext = React.createContext({});

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const FlatTable = ({
  caption,
  children,
  hasStickyHead,
  colorTheme,
  footer,
  hasStickyFooter = false,
  height,
  isZebra,
  size,
  hasMaxHeight = false,
  ariaDescribedby,
  minHeight,
  ...rest
}) => {
  const addDefaultHeight = !height && (hasStickyHead || hasStickyFooter);
  const tableStylingProps = {
    caption,
    isZebra,
    size,
  };

  if (ariaDescribedby) {
    tableStylingProps["aria-describedby"] = ariaDescribedby;
  }

  return (
    <DrawerSidebarContext.Consumer>
      {({ isInSidebar }) => (
        <StyledFlatTableWrapper
          isInSidebar={isInSidebar}
          hasStickyHead={hasStickyHead}
          colorTheme={colorTheme}
          {...rest}
          minHeight={minHeight}
          overflowY={
            !isInSidebar && (hasStickyHead || hasStickyFooter)
              ? "auto"
              : undefined
          }
          height={addDefaultHeight && !hasMaxHeight ? "99%" : height}
          maxHeight={hasMaxHeight ? "100%" : undefined}
          display="flex"
          flexDirection="column"
          justifyContent={
            hasStickyFooter || height ? "space-between" : undefined
          }
        >
          <StyledFlatTable data-component="flat-table" {...tableStylingProps}>
            {caption ? <caption>{caption}</caption> : null}
            <FlatTableThemeContext.Provider value={{ colorTheme, size }}>
              {children}
            </FlatTableThemeContext.Provider>
          </StyledFlatTable>
          {footer && (
            <StyledFlatTableFooter hasStickyFooter={hasStickyFooter}>
              {footer}
            </StyledFlatTableFooter>
          )}
        </StyledFlatTableWrapper>
      )}
    </DrawerSidebarContext.Consumer>
  );
};

FlatTable.propTypes = {
  ...marginPropTypes,
  /** The HTML id of the element that contains a description of this table. */
  ariaDescribedby: PropTypes.string,
  /** A string to render as the table's caption */
  caption: PropTypes.string,
  /** FlatTableHead and FlatTableBody */
  children: PropTypes.node.isRequired,
  /** If true, the header does not scroll with the content */
  hasStickyHead: PropTypes.bool,
  /** `FlatTable` color theme */
  colorTheme: PropTypes.oneOf([
    "light",
    "transparent-base",
    "transparent-white",
    "dark",
  ]),
  /** Content to be rendered at the foot of the table */
  footer: PropTypes.node,
  /** If true, the header does not scroll with the content */
  hasStickyFooter: PropTypes.bool,
  /** Set the height of the table. String can be any valid CSS string, numbers will be converted to pixels. */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Set the min-height of the table. A string can be any valid CSS string, numbers will be converted to pixels. */
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool,
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium', 'large' and 'extraLarge' */
  size: PropTypes.oneOf(["compact", "small", "medium", "large", "extraLarge"]),
  /** Applies max-height of 100% to FlatTable if true */
  hasMaxHeight: PropTypes.bool,
};

FlatTable.defaultProps = {
  colorTheme: "dark",
  size: "medium",
};

export default FlatTable;
