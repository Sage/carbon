import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
  StyledFlatTableBox,
} from "./flat-table.style";
import { SidebarContext } from "../drawer";
import { filterStyledSystemMarginProps } from "../../style/utils";
import Box from "../box";

export const FlatTableThemeContext = React.createContext({});
const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const FlatTable = ({
  caption,
  children,
  hasStickyHead,
  colorTheme = "dark",
  footer,
  hasStickyFooter = false,
  height,
  isZebra,
  size = "medium",
  hasMaxHeight = false,
  ariaDescribedby,
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
    <SidebarContext.Consumer>
      {(context) => (
        <Box
          {...filterStyledSystemMarginProps(rest)}
          height={addDefaultHeight && !hasMaxHeight ? "100%" : height}
          maxHeight={hasMaxHeight ? "100%" : undefined}
        >
          <StyledFlatTableBox
            {...rest}
            {...((hasStickyHead || hasStickyFooter) && { overflowY: "auto" })}
            height={footer ? "calc(100% - 40px)" : "100%"}
          >
            <StyledFlatTableWrapper
              isInSidebar={context && context.isInSidebar}
              hasStickyHead={hasStickyHead}
              colorTheme={colorTheme}
              heightDefaulted={addDefaultHeight}
            >
              <StyledFlatTable
                data-component="flat-table"
                {...tableStylingProps}
              >
                {caption ? <caption>{caption}</caption> : null}
                <FlatTableThemeContext.Provider value={colorTheme}>
                  {children}
                </FlatTableThemeContext.Provider>
              </StyledFlatTable>
            </StyledFlatTableWrapper>
          </StyledFlatTableBox>
          {footer && (
            <StyledFlatTableFooter hasStickyFooter={hasStickyFooter}>
              {footer}
            </StyledFlatTableFooter>
          )}
        </Box>
      )}
    </SidebarContext.Consumer>
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
  /** Set the height of the table */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool,
  /** Used to define the tables size Renders as: 'compact', 'small', 'medium' and 'large' */
  size: PropTypes.oneOf(["compact", "small", "medium", "large"]),
  /** Applies max-height of 100% to FlatTable if true */
  hasMaxHeight: PropTypes.bool,
};

export default FlatTable;
