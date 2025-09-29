import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useState } from "react";

import { FormattingButton } from "../toolbar.style";

import Button from "../../../../../button";
import Dialog from "../../../../../dialog";
import Form from "../../../../../form";
import Textbox from "../../../../../textbox";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  ParagraphNode,
} from "lexical";
import { $createLinkNode } from "@lexical/link";
import { FormattingButtonProps } from "../../../__utils__/interfaces.type";

type HyperlinkButtonProps = Pick<
  FormattingButtonProps,
  "namespace" | "isFirstButton" | "size"
> & {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
};

const HyperlinkButton = React.forwardRef<
  HTMLButtonElement,
  HyperlinkButtonProps
>(
  (
    {
      isFirstButton,
      namespace,
      dialogOpen,
      setDialogOpen,
      size = "medium",
    }: HyperlinkButtonProps,
    ref,
  ) => {
    // Get the editor instance
    const [editor] = useLexicalComposerContext();

    // Get the locale to enable translations
    const locale = useLocale();

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
      /* istanbul ignore else */
      if (isEditable) {
        // Create a link node with the provided text and URL
        editor.update(() => {
          const root = $getRoot();
          const numberOfChildren = root.getChildrenSize();
          let paragraphNode: ParagraphNode | null = null;

          if (numberOfChildren === 0) {
            root.append($createParagraphNode());
          } else {
            paragraphNode = root.getLastChild();
            /* istanbul ignore next */
            if (!paragraphNode || paragraphNode.getType() !== "paragraph") {
              root.append($createParagraphNode());
            }
          }

          const linkNode = $createLinkNode(linkUrl, { target: "_blank" });
          linkNode.append($createTextNode(linkText));
          paragraphNode?.append(linkNode);
        });

        resetDialog();
      }
    };

    return (
      <>
        <FormattingButton
          size={size}
          aria-label={locale.textEditor.hyperlink.buttonAria()}
          onClick={() => {
            setDialogOpen(true);
          }}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
            e.preventDefault()
          }
          iconType="link_on"
          buttonType={"tertiary"}
          data-role={`${namespace}-hyperlink-button`}
          id={`${namespace}-hyperlink-button`}
          tabIndex={isFirstButton ? 0 : -1}
          className="toolbar-button"
          ref={ref}
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
                data-role={`${namespace}-hyperlink-cancel-button`}
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
                data-role={`${namespace}-hyperlink-save-button`}
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
  },
);

export default HyperlinkButton;
