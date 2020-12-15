import React from "react";
import PropTypes from "prop-types";
import {
  StyledFlatTableWrapper,
  StyledFlatTable,
  StyledFlatTableFooter,
} from "./flat-table.style";
import { SidebarContext } from "../drawer";
import Box from "../box";

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
  ...props
}) => {
  const addDefaultHeight = !height && (hasStickyHead || hasStickyFooter);
  return (
    <SidebarContext.Consumer>
      {(context) => (
        <>
          <Box
            {...props}
            {...((hasStickyHead || hasStickyFooter) && { overflowY: "auto" })}
            height={addDefaultHeight ? "100%" : height}
          >
            <StyledFlatTableWrapper
              isInSidebar={context && context.isInSidebar}
              hasStickyHead={hasStickyHead}
              colorTheme={colorTheme}
              heightDefaulted={addDefaultHeight}
            >
              <StyledFlatTable
                data-component="flat-table"
                isZebra={isZebra}
                caption={caption}
                size={size}
              >
                {caption ? <caption>{caption}</caption> : null}
                {children}
              </StyledFlatTable>
            </StyledFlatTableWrapper>
          </Box>
          {footer && (
            <StyledFlatTableFooter hasStickyFooter={hasStickyFooter}>
              {footer}
            </StyledFlatTableFooter>
          )}
        </>
      )}
    </SidebarContext.Consumer>
  );
};

FlatTable.propTypes = {
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
};

FlatTable.defaultProps = {
  colorTheme: "dark",
  size: "medium",
};

export default FlatTable;
