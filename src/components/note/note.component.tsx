import React from "react";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import {
  StyledNote,
  StyledNoteContent,
  StyledNoteMain,
  StyledInlineControl,
  StyledTitleWrapper,
  StyledFooter,
  StyledFooterContent,
} from "./note.style";
import StatusIcon from "./__internal__/status-icon";
import { ActionPopover } from "../action-popover";
import ReadOnlyEditor from "../text-editor/__internal__/__ui__/ReadOnlyEditor/read-only-rte.component";
import TextEditorContext from "../text-editor/text-editor.context";
import LinkPreview, { LinkPreviewProps } from "../link-preview";
import Typography from "../typography";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

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
  /** Adds a status and tooltip to the Note footer */
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
  invariant(width > 0, "<Note> width must be greater than 0");
  invariant(
    !inlineControl ||
      (React.isValidElement(inlineControl) &&
        inlineControl.type === ActionPopover),
    "<Note> inlineControl must be an instance of <ActionPopover>",
  );

  const renderStatus = () => {
    if (!status) {
      return null;
    }

    const { text, timeStamp } = status;

    return (
      <StyledFooterContent hasName={!!name} data-component="note-status">
        <StatusIcon tooltipMessage={timeStamp}>{text}</StatusIcon>
      </StyledFooterContent>
    );
  };

  return (
    <TextEditorContext.Provider value={{ onLinkAdded }}>
      <StyledNote width={width} {...rest} {...tagComponent("note", rest)}>
        <StyledNoteMain>
          <StyledNoteContent>
            {title &&
              (typeof title === "string" ? (
                <Typography
                  data-role="note-title"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  paddingBottom="16px"
                  variant="h3"
                >
                  {title}
                </Typography>
              ) : (
                <StyledTitleWrapper>{title}</StyledTitleWrapper>
              ))}
            <ReadOnlyEditor
              aria-label={ariaLabel}
              initialValue={noteContent}
              useBackgroundColor={false}
            />
          </StyledNoteContent>
          {inlineControl && (
            <StyledInlineControl>{inlineControl}</StyledInlineControl>
          )}
        </StyledNoteMain>

        <StyledNoteContent>
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

        {createdDate && (
          <StyledNoteContent hasPreview={!!React.Children.count(previews)}>
            <StyledFooter data-element="note-footer">
              {name && (
                <StyledFooterContent hasName={!!name}>
                  {name}
                </StyledFooterContent>
              )}
              <StyledFooterContent hasName={!!name}>
                {createdDate}
              </StyledFooterContent>
              {renderStatus()}
            </StyledFooter>
          </StyledNoteContent>
        )}
      </StyledNote>
    </TextEditorContext.Provider>
  );
};

export default Note;
