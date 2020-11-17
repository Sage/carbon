import React, { useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import invariant from "invariant";
import {
  StyledNote,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent,
} from "./note.style.js";
import StatusWithTooltip from "./status-with-tooltip";
import { ActionPopover } from "../../action-popover";

const Note = ({
  noteContent,
  width = 100,
  inlineControl,
  title,
  name,
  createdDate,
  status,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  invariant(width > 0, "<Note> width must be greater than 0");
  invariant(createdDate, "<Note> createdDate is required");
  invariant(name, "<Note> name is required");
  invariant(noteContent, "<Note> noteContent is required");
  invariant(!status || status.text, "<Note> status.text is required");
  invariant(!status || status.timeStamp, "<Note> status.timeStamp is required");
  invariant(
    !inlineControl || inlineControl.type === ActionPopover,
    "<Note> inlineControl must be an instance of <ActionPopover>"
  );

  const renderStatus = () => {
    if (!status) {
      return null;
    }

    const { text, timeStamp } = status;

    return (
      <StyledFooterContent data-component="note-status">
        <StatusWithTooltip
          {...tooltipProps(timeStamp, showTooltip, setShowTooltip)}
        >
          {text}
        </StatusWithTooltip>
      </StyledFooterContent>
    );
  };

  return (
    <StyledNote width={width} {...rest} data-component="note">
      {title && <StyledTitle>{title}</StyledTitle>}

      {inlineControl && (
        <StyledInlineControl>{inlineControl}</StyledInlineControl>
      )}

      <StyledNoteContent>
        <Editor readOnly editorState={noteContent} />
      </StyledNoteContent>

      {name && createdDate && (
        <StyledNoteContent>
          <StyledFooter>
            <StyledFooterContent>{name}</StyledFooterContent>
            <StyledFooterContent>{createdDate}</StyledFooterContent>
            {renderStatus()}
          </StyledFooter>
        </StyledNoteContent>
      )}
    </StyledNote>
  );
};

function tooltipProps(id, showTooltip, setShowTooltip) {
  return {
    tooltipMessage: id,
    tooltipPosition: "top",
    tooltipAlign: "center",
    tooltipVisible: showTooltip,
    onMouseOver: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false),
  };
}

Note.propTypes = {
  /**  The rich text content to display in the Note */
  noteContent: PropTypes.object.isRequired,
  /** Set a percentage-based width for the whole Note component, relative to its parent. */
  width: PropTypes.number,
  /** renders a control for the Note */
  inlineControl: PropTypes.node,
  /** Adds a Title to the Note */
  title: PropTypes.string,
  /** Adds a name to the Note footer */
  name: PropTypes.string.isRequired,
  /** Adds a created on date to the Note footer */
  createdDate: PropTypes.string.isRequired,
  /** Adds a status and tooltip to the Note footer */
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
  }),
};

export default Note;
