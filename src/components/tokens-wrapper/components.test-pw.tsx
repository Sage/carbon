import React from "react";
import TokensWrapper, { TokenWrapperProps } from "./tokens-wrapper.component";
import Portal from "../portal";
import PopoverContainer from "../popover-container";

export const TokensWrapperWithPortal = ({ id }: { id?: string }) => (
  <TokensWrapper>
    <Portal id={id}>
      <div
        data-role="portal-child"
        style={{ backgroundColor: "var(--badge-bg-default)", color: "" }}
      >
        Portal Child
      </div>
    </Portal>
  </TokensWrapper>
);

export const TokenOverridesWithPortal = ({
  id,
  overrides,
}: {
  id?: string;
  overrides?: TokenWrapperProps["overrides"];
}) => (
  <TokensWrapper overrides={overrides}>
    <Portal id={id}>
      <div
        data-role="portal-child"
        style={
          {
            "--primaryBrand": "var(--mode-color-action-main-default)",
            "--primaryBrandHover": "var(--mode-color-action-main-hover)",
            "--primaryBrandActive": "var(--mode-color-action-main-active)",
            "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
            "--fontFamily": "var(--global-font-families-heading)",
            "--focusInner": "var(--mode-color-action-focus-default)",
            "--focusOuter": "var(--mode-color-action-focus-with-default)",
            "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
            "--borderRadiusScale": "var(--global-radius-scale)",
          } as React.CSSProperties
        }
      >
        Portal Child
      </div>
    </Portal>
  </TokensWrapper>
);

export const TokensWrapperWithPopover = ({
  overrides,
}: {
  overrides?: TokenWrapperProps["overrides"];
}) => (
  <TokensWrapper overrides={overrides}>
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

export const TokenOverridesWithPopover = ({
  overrides,
}: {
  overrides?: TokenWrapperProps["overrides"];
}) => (
  <TokensWrapper overrides={overrides}>
    <PopoverContainer open>
      <div
        data-role="popover-child"
        style={
          {
            "--primaryBrand": "var(--mode-color-action-main-default)",
            "--primaryBrandHover": "var(--mode-color-action-main-hover)",
            "--primaryBrandActive": "var(--mode-color-action-main-active)",
            "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
            "--fontFamily": "var(--global-font-families-heading)",
            "--focusInner": "var(--mode-color-action-focus-default)",
            "--focusOuter": "var(--mode-color-action-focus-with-default)",
            "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
            "--borderRadiusScale": "var(--global-radius-scale)",
          } as React.CSSProperties
        }
      >
        Popover Child
      </div>
    </PopoverContainer>
  </TokensWrapper>
);

export const MultipleTokensWrappersWithPortals = ({
  overrides1,
  overrides2,
}: {
  overrides1?: TokenWrapperProps["overrides"];
  overrides2?: TokenWrapperProps["overrides"];
}) => (
  <>
    <TokensWrapper overrides={overrides1}>
      <Portal id="portal-1">
        <div
          data-role="portal-child-1"
          style={
            {
              "--primaryBrand": "var(--mode-color-action-main-default)",
              "--primaryBrandHover": "var(--mode-color-action-main-hover)",
              "--primaryBrandActive": "var(--mode-color-action-main-active)",
              "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
              "--fontFamily": "var(--global-font-families-heading)",
              "--focusInner": "var(--mode-color-action-focus-default)",
              "--focusOuter": "var(--mode-color-action-focus-with-default)",
              "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
              "--borderRadiusScale": "var(--global-radius-scale)",
            } as React.CSSProperties
          }
        >
          Portal Child
        </div>
      </Portal>
    </TokensWrapper>
    <TokensWrapper overrides={overrides2}>
      <Portal id="portal-2">
        <div
          data-role="portal-child-2"
          style={
            {
              "--primaryBrand": "var(--mode-color-action-main-default)",
              "--primaryBrandHover": "var(--mode-color-action-main-hover)",
              "--primaryBrandActive": "var(--mode-color-action-main-active)",
              "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
              "--fontFamily": "var(--global-font-families-heading)",
              "--focusInner": "var(--mode-color-action-focus-default)",
              "--focusOuter": "var(--mode-color-action-focus-with-default)",
              "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
              "--borderRadiusScale": "var(--global-radius-scale)",
            } as React.CSSProperties
          }
        >
          Portal Child
        </div>
      </Portal>
    </TokensWrapper>
  </>
);

export const MultipleTokensWrappersWithPopovers = ({
  overrides1,
  overrides2,
}: {
  overrides1?: TokenWrapperProps["overrides"];
  overrides2?: TokenWrapperProps["overrides"];
}) => (
  <>
    <TokensWrapper overrides={overrides1}>
      <PopoverContainer open>
        <div
          data-role="popover-child-1"
          style={
            {
              "--primaryBrand": "var(--mode-color-action-main-default)",
              "--primaryBrandHover": "var(--mode-color-action-main-hover)",
              "--primaryBrandActive": "var(--mode-color-action-main-active)",
              "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
              "--fontFamily": "var(--global-font-families-heading)",
              "--focusInner": "var(--mode-color-action-focus-default)",
              "--focusOuter": "var(--mode-color-action-focus-with-default)",
              "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
              "--borderRadiusScale": "var(--global-radius-scale)",
            } as React.CSSProperties
          }
        >
          Popover Child
        </div>
      </PopoverContainer>
    </TokensWrapper>
    <TokensWrapper overrides={overrides2}>
      <PopoverContainer open>
        <div
          data-role="popover-child-2"
          style={
            {
              "--primaryBrand": "var(--mode-color-action-main-default)",
              "--primaryBrandHover": "var(--mode-color-action-main-hover)",
              "--primaryBrandActive": "var(--mode-color-action-main-active)",
              "--onPrimaryBrand": "var(--mode-color-action-main-with-default)",
              "--fontFamily": "var(--global-font-families-heading)",
              "--focusInner": "var(--mode-color-action-focus-default)",
              "--focusOuter": "var(--mode-color-action-focus-with-default)",
              "--focusAlt": "var(--mode-color-action-focus-with-default-alt)",
              "--borderRadiusScale": "var(--global-radius-scale)",
            } as React.CSSProperties
          }
        >
          Popover Child
        </div>
      </PopoverContainer>
    </TokensWrapper>
  </>
);
