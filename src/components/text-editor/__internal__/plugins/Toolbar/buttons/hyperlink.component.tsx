import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState } from "react";

import { FormattingButtonProps } from "./common.types";
import { FormattingButton } from "../toolbar.style";

import Button from "../../../../../button";
import Dialog from "../../../../../dialog";
import Form from "../../../../../form";
import Textbox from "../../../../../textbox";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { $createTextNode, $getSelection, $isRangeSelection } from "lexical";
import { $createLinkNode } from "@lexical/link";

const HyperlinkButton = ({
  namespace,
}: Pick<FormattingButtonProps, "namespace">) => {
  // Get the editor instance
  const [editor] = useLexicalComposerContext();

  // Get the locale to enable translations
  const locale = useLocale();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const resetDialog = () => {
    setLinkText("");
    setLinkUrl("");
    setDialogOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isEditable = editor.isEditable();
    if (isEditable) {
      // Focus the editor
      editor.focus();

      // Create a link node with the provided text and URL
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(linkUrl, { target: "_blank" });
          linkNode.append($createTextNode(linkText));
          selection.anchor.getNode().insertBefore(linkNode);
        }
      });

      resetDialog();
    }
  };

  return (
    <>
      <FormattingButton
        id={`${namespace}-hyperlink-button`}
        size="small"
        aria-label={locale.textEditor.hyperlink.buttonAria()}
        onClick={() => setDialogOpen(true)}
        iconType="link_on"
        buttonType={"tertiary"}
        data-role={`${namespace}-underline-button`}
        tabIndex={-1}
        className="toolbar-button"
      />
      <Dialog
        open={dialogOpen}
        onCancel={() => {
          resetDialog();
        }}
        title={locale.textEditor.hyperlink.dialogTitle()}
        data-role={`${namespace}-hyperlink-dialog`}
        aria-label={locale.textEditor.hyperlink.dialogTitle()}
        size="small"
      >
        <Form
          leftSideButtons={
            <Button
              onClick={() => {
                resetDialog();
              }}
            >
              Cancel
            </Button>
          }
          saveButton={
            <Button
              buttonType="primary"
              type="submit"
              disabled={!linkText || !linkUrl}
            >
              Save
            </Button>
          }
          onSubmit={handleSubmit}
        >
          <Textbox
            label={locale.textEditor.hyperlink.textFieldLabel()}
            name="text"
            required
            data-role={`${namespace}-hyperlink-text-field`}
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
          <Textbox
            label={locale.textEditor.hyperlink.linkFieldLabel()}
            name="link"
            required
            data-role={`${namespace}-hyperlink-link-field`}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </Form>
      </Dialog>
    </>
  );
};

export default HyperlinkButton;
