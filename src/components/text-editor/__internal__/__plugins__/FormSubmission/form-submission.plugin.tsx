import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  SerializeLexical,
  generateHTMLWithInlineStyles,
} from "../../__utils__/helpers";
import type { EditorFormattedValuesWithInlineStyles } from "../../__utils__/interfaces.types";

/**
 * FormSubmissionPlugin - A Lexical plugin that listens for form submission events
 * and calls the onFormSubmission callback with the current editor state.
 *
 * Returns the editor's current formatted values (HTML and JSON) including HTML with inline styles.
 *
 * @param onFormSubmission - Callback function that receives EditorFormattedValuesWithInlineStyles containing:
 *   - htmlString: string - HTML representation of the editor content
 *   - json: object - JSON representation of the editor state
 *   - htmlStringWithInlineStyles: string - HTML with inline styles instead of classes
 *
 * @example
 * <TextEditor labelText="...">
 *   <FormSubmissionPlugin onFormSubmission={(values) => console.log(values.htmlStringWithInlineStyles)} />
 * </TextEditor>
 */
export interface FormSubmissionPluginProps {
  onFormSubmission?: (value: EditorFormattedValuesWithInlineStyles) => void;
}

export const FormSubmissionPlugin = ({
  onFormSubmission,
}: FormSubmissionPluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onFormSubmission) return;

    // Find parent form - traverses up DOM, avoids any internal forms within the TextEditor
    const form = editor.getRootElement()?.closest("form");
    if (!form) return;

    const handleSubmit = () => {
      if (!editor.isEditable()) return;

      const formattedValues = SerializeLexical(editor);
      const htmlStringWithInlineStyles =
        formattedValues.htmlString &&
        generateHTMLWithInlineStyles(formattedValues.htmlString);

      onFormSubmission({
        ...formattedValues,
        htmlStringWithInlineStyles: htmlStringWithInlineStyles || "",
      });
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, [editor, onFormSubmission]);

  return null;
};

export default FormSubmissionPlugin;
