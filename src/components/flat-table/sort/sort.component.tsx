import React, { useRef } from "react";
import Event from "../../../__internal__/utils/helpers/events";
import Icon from "../../icon";
import Typography from "../../typography";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";
import useLocale from "../../../hooks/__internal__/useLocale";

export interface SortProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending";
  /** Callback fired when the component is clicked */
  onClick?: () => void;
  /** Sets the text content of the component */
  children?: string;
}

const Sort = ({ children, onClick, sortType }: SortProps) => {
  const id = useRef(guid());
  const locale = useLocale();

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  return (
    <>
      <Typography screenReaderOnly id={id.current}>
        {locale.sort.accessibleName(children, sortType)}
      </Typography>
      <StyledSort
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        sortType={sortType}
        aria-labelledby={id.current}
      >
        {children}
        {sortType && (
          <Icon
            type={sortType === "ascending" ? "sort_up" : "sort_down"}
            color="--colorsUtilityMajor200"
          />
        )}
      </StyledSort>
      {!sortType && <StyledSpaceHolder />}
    </>
  );
};

export default Sort;
