import React from "react";
import { Editor, EditorState } from "draft-js";
import { MarginProps } from "styled-system";
import invariant from "invariant";
import {
  StyledNote,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent,
} from "./note.style";
import StatusIcon from "./__internal__/status-icon";
import { ActionPopover } from "../action-popover";
import { getDecoratedValue } from "../text-editor/__internal__/utils";
import { EditorContext } from "../text-editor/text-editor.component";
import LinkPreview, { LinkPreviewProps } from "../link-preview";

export interface NoteProps extends MarginProps {
  /** Adds a created on date to the Note footer */
  createdDate: string;
  /** renders a control for the Note */
  inlineControl?: React.ReactNode;
  /** Adds a name to the Note footer */
  name?: string;
  /**  The rich text content to display in the Note */
  noteContent: EditorState;
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
  title?: string;
  /** Set a percentage-based width for the whole Note component, relative to its parent. */
  width?: number;
}

function hasExpectedDisplayName(
  child: React.ReactElement,
  displayName: string
) {
  return (child.type as React.FunctionComponent).displayName === displayName;
}

export const Note = ({
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
  invariant(createdDate, "<Note> createdDate is required");
  invariant(noteContent, "<Note> noteContent is required");
  invariant(!status || status.text, "<Note> status.text is required");
  invariant(!status || status.timeStamp, "<Note> status.timeStamp is required");
  invariant(
    !inlineControl ||
      (React.isValidElement(inlineControl) &&
        inlineControl.type === ActionPopover),
    "<Note> inlineControl must be an instance of <ActionPopover>"
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
    <EditorContext.Provider value={{ onLinkAdded, editMode: false }}>
      <StyledNote width={width} {...rest} data-component="note">
        {title && (
          <StyledTitle hasInlineControl={!!inlineControl}>{title}</StyledTitle>
        )}

        {inlineControl && (
          <StyledInlineControl>{inlineControl}</StyledInlineControl>
        )}

        <StyledNoteContent hasInlineControl={!!inlineControl}>
          <Editor
            readOnly
            editorState={getDecoratedValue(noteContent)}
            onChange={/* istanbul ignore next */ () => {}}
          />
        </StyledNoteContent>
        {React.Children.map(previews, (preview) =>
          React.isValidElement(preview) &&
          hasExpectedDisplayName(preview, LinkPreview.displayName)
            ? React.cloneElement<LinkPreviewProps>(
                preview as React.ReactElement<LinkPreviewProps>,
                { as: "a", onClose: undefined }
              )
            : preview
        )}
        {createdDate && (
          <StyledNoteContent
            hasPreview={!!React.Children.count(previews)}
            hasInlineControl={!!inlineControl}
          >
            <StyledFooter>
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
    </EditorContext.Provider>
  );
};

export default Note;
