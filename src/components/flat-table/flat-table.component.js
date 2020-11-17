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
  children,
  hasStickyHead,
  colorTheme,
  footer,
  hasStickyFooter = false,
  height,
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
              <StyledFlatTable data-component="flat-table">
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
};

FlatTable.defaultProps = {
  colorTheme: "dark",
};

export default FlatTable;
