import React from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import styledSystemPropTypes from "@styled-system/prop-types";
import invariant from "invariant";
import {
  StyledNote,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent,
} from "./note.style.js";
import StatusWithTooltip from "./__internal__/status-with-tooltip";
import { ActionPopover } from "../action-popover";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { getDecoratedValue } from "../text-editor/__internal__/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

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
  invariant(width > 0, "<Note> width must be greater than 0");
  invariant(createdDate, "<Note> createdDate is required");
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
      <StyledFooterContent
        hasName={!!name}
        mt={2}
        ml={3}
        data-component="note-status"
      >
        <StatusWithTooltip tooltipMessage={timeStamp}>{text}</StatusWithTooltip>
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
        <Editor readOnly editorState={getDecoratedValue(noteContent)} />
      </StyledNoteContent>

      {createdDate && (
        <StyledNoteContent>
          <StyledFooter>
            {name && (
              <StyledFooterContent hasName={!!name} mt={2}>
                {name}
              </StyledFooterContent>
            )}
            <StyledFooterContent
              hasName={!!name}
              mt={2}
              ml={name ? 2 : undefined}
            >
              {createdDate}
            </StyledFooterContent>
            {renderStatus()}
          </StyledFooter>
        </StyledNoteContent>
      )}
    </StyledNote>
  );
};

Note.propTypes = {
  ...marginPropTypes,
  /**  The rich text content to display in the Note */
  noteContent: PropTypes.object.isRequired,
  /** Set a percentage-based width for the whole Note component, relative to its parent. */
  width: PropTypes.number,
  /** renders a control for the Note */
  inlineControl: PropTypes.node,
  /** Adds a Title to the Note */
  title: PropTypes.string,
  /** Adds a name to the Note footer */
  name: PropTypes.string,
  /** Adds a created on date to the Note footer */
  createdDate: PropTypes.string.isRequired,
  /** Adds a status and tooltip to the Note footer */
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
  }),
};

export default Note;
