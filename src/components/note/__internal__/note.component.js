import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';
import {
  StyledNote,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent
} from './note.style.js';
import StatusWithTooltip from './status-with-tooltip';

const Note = ({
  noteContent = EditorState.createEmpty(),
  width,
  inlineControl,
  title,
  name,
  createdDate,
  status,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderStatus = () => {
    if (!status || !status.text || !status.text.length) {
      return null;
    }

    const { text, timeStamp } = status;

    return (
      <StyledFooterContent data-component='note-status'>
        <StatusWithTooltip { ...tooltipProps(timeStamp, showTooltip, setShowTooltip) }>
          { text }
        </StatusWithTooltip>
      </StyledFooterContent>
    );
  };

  return (
    <StyledNote
      width={ width }
      { ...rest }
      data-component='note'
    >
      { title && (
        <StyledTitle>
          { title }
        </StyledTitle>
      )}

      { inlineControl && (
        <StyledInlineControl>
          { inlineControl }
        </StyledInlineControl>
      )}

      <StyledNoteContent>
        <Editor readOnly editorState={ noteContent } />
      </StyledNoteContent>

      {(name && createdDate) && (
        <StyledNoteContent>
          <StyledFooter>
            <StyledFooterContent>{ name }</StyledFooterContent>
            <StyledFooterContent>{ createdDate }</StyledFooterContent>
            { renderStatus() }
          </StyledFooter>
        </StyledNoteContent>
      )}
    </StyledNote>
  );
};

function tooltipProps(id, showTooltip, setShowTooltip) {
  return {
    tooltipMessage: id,
    tooltipPosition: 'top',
    tooltipAlign: 'center',
    tooltipVisible: showTooltip,
    onMouseOver: () => setShowTooltip(true),
    onMouseLeave: () => setShowTooltip(false)
  };
}

Note.propTypes = {
  /**  The rich text content to display in the Note */
  noteContent: PropTypes.object,
  /**
   * Set a percentage-based width for the whole Note component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width: PropTypes.number,
  /** renders a control for the Note */
  inlineControl: PropTypes.node,
  /** Adds a Title to the Note */
  title: PropTypes.string,
  /** Adds a name to the Note footer */
  name: PropTypes.string,
  /** Adds a created on date to the Note footer */
  createdDate: PropTypes.string,
  /** Adds a status and tooltip to the Note footer */
  status: PropTypes.shape({ text: PropTypes.string.isRequired, timeStamp: PropTypes.string })
};

export default Note;
