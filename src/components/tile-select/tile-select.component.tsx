import React, { useState, useEffect, useRef } from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import createGuid from "../../__internal__/utils/helpers/guid";
import Button from "../button";
import Box from "../box";
import Accordion from "./__internal__/accordion";

import {
  StyledTileSelectContainer,
  StyledTileSelect,
  StyledTileSelectInput,
  StyledTitleContainer,
  StyledTitle,
  StyledSubtitle,
  StyledAdornment,
  StyledDescription,
  StyledDeselectWrapper,
  StyledFooterWrapper,
  StyledFocusWrapper,
  StyledAccordionFooterWrapper,
} from "./tile-select.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const checkPropTypeIsNode = (prop: unknown): boolean =>
  typeof prop !== "string";

export interface TileSelectDeselectEvent {
  target: {
    name?: string;
    id?: string;
    value: null;
    checked: false;
  };
}

export interface TileSelectProps extends MarginProps, TagProps {
  /** title of the TileSelect */
  title?: React.ReactNode;
  /** adornment to be rendered next to the title */
  titleAdornment?: React.ReactNode;
  /** subtitle of the TileSelect */
  subtitle?: React.ReactNode;
  /** description of the TileSelect */
  description?: React.ReactNode;
  /** disables the TileSelect input */
  disabled?: boolean;
  /** the value that is represented by this TileSelect */
  value?: string;
  /** input id */
  id?: string;
  /** input name */
  name?: string;
  /** Callback triggered when user selects or deselects this tile */
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => void;
  /** Callback triggered when the user blurs this tile */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback triggered when the user focus this tile */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** determines if this tile is selected or unselected */
  checked?: boolean;
  /** Type of the TileSelect input */
  type?: "radio" | "checkbox";
  /** Render prop that allows overriding the default action button. */
  customActionButton?: (onClick: () => void) => JSX.Element;
  /** An additional help info icon rendered next to the action button */
  actionButtonAdornment?: React.ReactNode;
  /** footer of the TileSelect */
  footer?: React.ReactNode;
  /** Component to render in the top left corner of TileSelect */
  prefixAdornment?: React.ReactNode;
  /** Component to render additional information row between title and description */
  additionalInformation?: React.ReactNode;
  /** Components to render in the TileSelect Accordion */
  accordionContent?: React.ReactNode;
  /** Callback to toggle expanded state of TileSelect Accordion */
  accordionControl?: (controlId: string, contentId: string) => JSX.Element;
  /** Flag to control the open state of TileSelect Accordion */
  accordionExpanded?: boolean;
}

const TileSelect = React.forwardRef<HTMLInputElement, TileSelectProps>(
  (
    {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      checked = false,
      disabled,
      title,
      subtitle,
      description,
      titleAdornment,
      type = "checkbox",
      id,
      customActionButton,
      actionButtonAdornment,
      footer,
      prefixAdornment,
      additionalInformation,
      accordionContent,
      accordionControl,
      accordionExpanded,
      "data-element": dataElement,
      "data-role": dataRole,
      ...rest
    }: TileSelectProps,
    ref,
  ) => {
    const l = useLocale();
    const [hasFocus, setHasFocus] = useState(false);
    const handleDeselect = () =>
      onChange?.({
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: null,
          checked: false,
        },
      });

    const renderActionButton = () => (
      <StyledDeselectWrapper
        data-role="deselect-wrapper"
        hasActionAdornment={!!actionButtonAdornment}
      >
        {customActionButton && customActionButton(handleDeselect)}
        {!customActionButton && checked && (
          <Button
            buttonType="tertiary"
            size="small"
            disabled={disabled}
            onClick={handleDeselect}
          >
            {l.tileSelect.deselect()}
          </Button>
        )}
        {actionButtonAdornment}
      </StyledDeselectWrapper>
    );

    useEffect(() => {
      if (disabled && hasFocus) {
        setHasFocus(false);
      }
    }, [disabled, hasFocus]);

    const guid = useRef(createGuid());
    const contentId = `AccordionContent_${guid.current}`;
    const controlId = `AccordionControl_${guid.current}`;

    return (
      <StyledTileSelectContainer
        checked={checked}
        disabled={disabled}
        {...tagComponent("tile-select", {
          "data-element": dataElement,
          "data-role": dataRole,
        })}
        {...filterStyledSystemMarginProps(rest)}
      >
        <StyledFocusWrapper
          data-role="focus-wrapper"
          hasFocus={hasFocus}
          checked={checked}
        >
          <StyledTileSelectInput
            onChange={onChange}
            onBlur={(ev) => {
              setHasFocus(false);
              onBlur?.(ev);
            }}
            onFocus={(ev) => {
              setHasFocus(true);
              onFocus?.(ev);
            }}
            checked={checked}
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            id={id}
            ref={ref}
            {...rest}
          />
          <StyledTileSelect disabled={disabled} checked={checked}>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="row-reverse"
            >
              {(customActionButton || checked) && renderActionButton()}
              <Box flexGrow={1}>
                <StyledTitleContainer>
                  {title && (
                    <StyledTitle
                      as={checkPropTypeIsNode(title) ? "div" : undefined}
                    >
                      {title}
                    </StyledTitle>
                  )}

                  {subtitle && (
                    <StyledSubtitle
                      as={checkPropTypeIsNode(subtitle) ? "div" : undefined}
                    >
                      {subtitle}
                    </StyledSubtitle>
                  )}

                  {titleAdornment && (
                    <StyledAdornment
                      hasAdditionalInformation={!!additionalInformation}
                      data-role="title-adornment"
                    >
                      {titleAdornment && <div>{titleAdornment}</div>}
                    </StyledAdornment>
                  )}
                </StyledTitleContainer>
                {additionalInformation && <div>{additionalInformation}</div>}
                <StyledDescription
                  as={checkPropTypeIsNode(description) ? "div" : undefined}
                >
                  {description}
                </StyledDescription>
                {footer && (
                  <StyledFooterWrapper data-role="tile-select-footer">
                    {footer}
                  </StyledFooterWrapper>
                )}
                {accordionContent && accordionControl && (
                  <StyledAccordionFooterWrapper
                    accordionExpanded={accordionExpanded}
                    data-role="accordion-footer"
                  >
                    {accordionControl(controlId, contentId)}
                  </StyledAccordionFooterWrapper>
                )}
              </Box>
              {prefixAdornment && (
                <Box
                  data-element="prefix-adornment"
                  data-role="prefix-adornment"
                  mr={3}
                  opacity={disabled ? "0.3" : undefined}
                >
                  {prefixAdornment}
                </Box>
              )}
            </Box>
          </StyledTileSelect>
          {accordionContent && (
            <Accordion
              contentId={contentId}
              controlId={controlId}
              expanded={accordionExpanded}
            >
              {accordionContent}
            </Accordion>
          )}
        </StyledFocusWrapper>
      </StyledTileSelectContainer>
    );
  },
);

TileSelect.displayName = "TileSelect";
export default TileSelect;
