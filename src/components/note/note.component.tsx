import React from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import {
  StyledNote,
  StyledNoteContent,
  StyledNoteMain,
  StyledInlineControl,
  StyledNoteTitle,
  StyledTitleRow,
  StyledTitleWrapper,
  StyledFooter,
  StyledFooterContent,
  StyledTimestamps,
} from "./note.style";
import {
  ActionPopover,
  ActionPopoverProps,
  RenderButtonProps,
} from "../action-popover";
import Button from "../button/__next__";
import ReadOnlyEditor from "../text-editor/__internal__/__ui__/ReadOnlyEditor/read-only-rte.component";
import TextEditorContext from "../text-editor/text-editor.context";
import LinkPreview, { LinkPreviewProps } from "../link-preview";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import useLocale from "../../hooks/__internal__/useLocale";
import isValidISOString from "./note.utils";

export interface NoteProps extends MarginProps, TagProps {
  /** The aria-label to be used when no title is present */
  "aria-label"?: string;
  /** Adds a created on date to the Note footer */
  createdDate: string;
  /** renders a control for the Note */
  inlineControl?: React.ReactNode;
  /** Adds a name to the Note footer */
  name?: string;
  /**  The rich text content to display in the Note */
  noteContent: string;
  /** Callback to report a url when a link is added */
  onLinkAdded?: (url: string) => void;
  /** The previews to display of any links added to the Editor */
  previews?: React.ReactNode;
  /** Adds a status and timestamp below the created details */
  status?: {
    text: string;
    timeStamp: string;
  };
  /** Adds a Title to the Note */
  title?: React.ReactNode;
  /** Set a percentage-based width for the whole Note component, relative to its parent. */
  width?: number;
}

function hasExpectedDisplayName(
  child: React.ReactElement,
  displayName: string,
) {
  return (child.type as React.FunctionComponent).displayName === displayName;
}

export const Note = ({
  "aria-label": ariaLabel,
  createdDate,
  inlineControl,
  name,
  noteContent,
  onLinkAdded,
  previews,
  status,
  title,
  width = 100,
  ...rest
}: NoteProps) => {
  const locale = useLocale();
  invariant(width > 0, "<Note> width must be greater than 0");
  invariant(
    !inlineControl ||
      (React.isValidElement(inlineControl) &&
        inlineControl.type === ActionPopover),
    "<Note> inlineControl must be an instance of <ActionPopover>",
  );

  const renderActionButton = ({
    tabIndex,
    "data-element": dataElement,
    ariaAttributes,
  }: RenderButtonProps) => (
    <Button
      {...ariaAttributes}
      {...{ tabIndex }}
      data-element={dataElement}
      iconType="ellipsis_vertical"
      size="medium"
      variant="default"
      variantType="subtle"
    />
  );

  const actionPopoverElement = React.isValidElement<ActionPopoverProps>(
    inlineControl,
  )
    ? inlineControl
    : undefined;

  const actionPopover = actionPopoverElement
    ? React.cloneElement<ActionPopoverProps>(actionPopoverElement, {
        renderButton:
          actionPopoverElement.props.renderButton || renderActionButton,
      })
    : undefined;

  return (
    <TextEditorContext.Provider value={{ onLinkAdded }}>
      <StyledNote width={width} {...rest} {...tagComponent("note", rest)}>
        <StyledNoteMain data-role="note-main">
          <StyledNoteContent
            $hasTitlelessControl={!title && !!actionPopover}
            $isBody
            data-role="note-body"
          >
            {title && (
              <StyledTitleRow data-role="note-title-row">
                {typeof title === "string" ? (
                  <StyledNoteTitle data-role="note-title">
                    {title}
                  </StyledNoteTitle>
                ) : (
                  <StyledTitleWrapper data-role="note-title-wrapper">
                    {title}
                  </StyledTitleWrapper>
                )}
                {actionPopover && (
                  <StyledInlineControl data-role="note-inline-control">
                    {actionPopover}
                  </StyledInlineControl>
                )}
              </StyledTitleRow>
            )}
            <ReadOnlyEditor aria-label={ariaLabel} initialValue={noteContent} />
            {!title && actionPopover && (
              <StyledInlineControl $isTitleless data-role="note-inline-control">
                {actionPopover}
              </StyledInlineControl>
            )}
          </StyledNoteContent>
        </StyledNoteMain>

        {!!React.Children.count(previews) && (
          <StyledNoteContent data-role="note-previews">
            {React.Children.map(previews, (preview) =>
              React.isValidElement(preview) &&
              hasExpectedDisplayName(preview, LinkPreview.displayName)
                ? React.cloneElement<LinkPreviewProps>(
                    preview as React.ReactElement<LinkPreviewProps>,
                    { as: "a", onClose: undefined },
                  )
                : preview,
            )}
          </StyledNoteContent>
        )}

        {createdDate && (
          <StyledNoteContent
            data-role="note-metadata"
            $hasPreviews={!!React.Children.count(previews)}
          >
            <StyledFooter data-element="note-footer" data-role="note-footer">
              {name && (
                <StyledFooterContent $isName>{name}</StyledFooterContent>
              )}
              <StyledTimestamps data-role="note-timestamps">
                <StyledFooterContent data-role="note-created-block">
                  <span>{locale.note.created()}</span>
                  <time
                    dateTime={
                      isValidISOString(createdDate) ? createdDate : undefined
                    }
                  >
                    {createdDate}
                  </time>
                </StyledFooterContent>
                {status && (
                  <StyledFooterContent
                    data-component="note-status"
                    data-role="note-updated-block"
                  >
                    <span>{status.text}</span>
                    <time
                      dateTime={
                        isValidISOString(status.timeStamp)
                          ? status.timeStamp
                          : undefined
                      }
                    >
                      {status.timeStamp}
                    </time>
                  </StyledFooterContent>
                )}
              </StyledTimestamps>
            </StyledFooter>
          </StyledNoteContent>
        )}
      </StyledNote>
    </TextEditorContext.Provider>
  );
};

export default Note;
