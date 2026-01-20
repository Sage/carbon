import React from "react";
import TokensWrapper from "./tokens-wrapper.component";
import Portal from "../portal";
import PopoverContainer from "../popover-container";

export const TokensWrapperWithPortal = ({ id }: { id?: string }) => (
  <TokensWrapper>
    <Portal id={id}>
      <div
        data-role="portal-child"
        style={{ backgroundColor: "var(--badge-bg-default)" }}
      >
        Portal Child
      </div>
    </Portal>
  </TokensWrapper>
);

export const TokensWrapperWithPopover = () => (
  <TokensWrapper>
    <PopoverContainer open>
      <div
        data-role="popover-child"
        style={{ backgroundColor: "var(--badge-bg-default)" }}
      >
        Popover Child
      </div>
    </PopoverContainer>
  </TokensWrapper>
);
