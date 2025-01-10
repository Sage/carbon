/* eslint-disable no-alert */
import { Meta, StoryObj } from "@storybook/react";

import React, { useCallback, useRef, useState } from "react";

import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";
import EditorLinkPreview from "../link-preview";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import enGB from "../../locales/en-gb";

import RichTextEditor, { CreateFromHTML } from "./rich-text-editor.component";
import { SaveCallbackProps } from "./plugins/Toolbar/buttons/save.component";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof RichTextEditor> = {
  title: "Rich Text Editor",
  component: RichTextEditor,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" />;
};
Default.storyName = "Default";

export const Required: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" required />;
};
Required.storyName = "Required";

export const Optional: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" isOptional />;
};
Optional.storyName = "Optional";

export const CharacterLimit: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" characterLimit={50} />;
};
CharacterLimit.storyName = "Character Limit";

export const CommandButtons: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      onCancel={() => alert("Cancelled")}
      onSave={(values) => alert(values)}
    />
  );
};
CommandButtons.storyName = "Command Buttons";

export const OnChange: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  return (
    <>
      <RichTextEditor labelText="Rich Text Editor" onChange={setState} />
      <div>Content: {state || "No content"}</div>
    </>
  );
};
OnChange.storyName = "onChange Handler";

export const OnChangeDebounced: Story = () => {
  const [state, setState] = React.useState<string | undefined>(undefined);
  const debounceWaitTime = 2000;

  const handleChange = useDebounce((newValue) => {
    setState(newValue);
  }, debounceWaitTime);

  return (
    <>
      <RichTextEditor labelText="Rich Text Editor" onChange={handleChange} />
      <div>Content: {state || "No content"}</div>
    </>
  );
};
OnChangeDebounced.storyName = "onChange Handler with Debounce";

export const OnSave: Story = () => {
  const [data, setData] = useState<SaveCallbackProps>({
    htmlString: "<p><br></p>",
    json: undefined,
  });
  const [showData, setShowData] = useState(false);
  return (
    <>
      <>
        <RichTextEditor
          labelText="Rich Text Editor"
          onSave={({ htmlString, json }) => setData({ htmlString, json })}
        />
      </>
      <Button
        buttonType="primary"
        size="small"
        my={2}
        onClick={() => setShowData(!showData)}
      >
        Show Data Formats
      </Button>
      {showData && (
        <Box
          display="flex"
          flexDirection="row"
          gap={4}
          justifyContent="space-around"
        >
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              HTML
            </Typography>
            {data?.htmlString || "No content"}
          </Box>
          <Box maxWidth="30%">
            <Typography variant="h4" mb={1}>
              JSON
            </Typography>
            {JSON.stringify(data?.json, null, 2) || "No content"}
          </Box>
        </Box>
      )}
    </>
  );
};
OnSave.storyName = "onSave Handler";

export const ResetToDefault: Story = () => {
  const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Make changes to this text and then press the ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "Cancel",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " button to reset it to this default state.",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
  const value = JSON.stringify(initialValue);
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      value={value}
      onCancel={() => {}}
      resetOnCancel
    />
  );
};
ResetToDefault.storyName = "Resetting On Cancel";

export const WithError: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      error="error"
      characterLimit={100}
    />
  );
};
WithError.storyName = "Error";

export const WithWarning: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      warning="warning"
      characterLimit={100}
    />
  );
};
WithWarning.storyName = "Warning";

export const WithHTMLValue: Story = () => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = CreateFromHTML(initialValue);
  return <RichTextEditor labelText="Rich Text Editor" value={value} />;
};
WithHTMLValue.storyName = "HTML As Initial Value";

export const WithJSONValue: Story = () => {
  const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Sample text with ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "some formatting",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "applied",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ".",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
          textFormat: 0,
          textStyle: "",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };
  const value = JSON.stringify(initialValue);
  return <RichTextEditor labelText="Rich Text Editor" value={value} />;
};
WithJSONValue.storyName = "JSON As Initial Value";

export const InputHint: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      inputHint="This is an example input hint"
    />
  );
};
InputHint.storyName = "Input Hint";

export const Rows: Story = () => {
  return <RichTextEditor labelText="Rich Text Editor" rows={20} />;
};
Rows.storyName = "Row Count";

export const WithPlaceholder: Story = () => {
  return (
    <RichTextEditor
      labelText="Rich Text Editor"
      placeholder="This is a much better placeholder"
    />
  );
};
WithPlaceholder.storyName = "Placeholder";

export const WithCustomTranslations: Story = () => {
  return (
    <I18nProvider
      locale={{
        ...enGB,
        richTextEditor: {
          boldAria: () => "Make text bold",
          cancelButton: () => "No",
          cancelButtonAria: () => "Cancel the current content",
          characterCounter: (count: number) =>
            `You've got ${count} characters left`,
          characterLimit: (count: number) =>
            `Please delete the last ${count} characters`,
          contentEditorAria: () => "Rich text content editor",
          italicAria: () => "Make text italic",
          orderedListAria: () => "Ordered list",
          saveButton: () => "Yes",
          saveButtonAria: () => "Save the current content",
          unorderedListAria: () => "Unordered list",
        },
      }}
    >
      <RichTextEditor
        characterLimit={10}
        labelText="Translated Rich Text Editor"
        onCancel={() => {}}
        onSave={() => {}}
      />
    </I18nProvider>
  );
};
WithCustomTranslations.storyName = "Translations";

export const Links: Story = () => {
  const defaultHTML = `<a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" dir="ltr"><span data-lexical-text="true">Carbon</span></a>`;
  const value = CreateFromHTML(defaultHTML);
  return <RichTextEditor labelText="Rich Text Editor" value={value} />;
};
Links.storyName = "Link Support";

export const WithLinkAddedCallback: Story = () => {
  const [options, setOptions] = useState<{ url: string; state: string }>({
    url: "",
    state: "",
  });

  const handleLinkAdded = useCallback((link, state) => {
    setOptions({ url: link, state });
  }, []);

  return (
    <>
      <RichTextEditor
        labelText="Rich Text Editor"
        onLinkAdded={handleLinkAdded}
      />
      <span>
        <strong>Link:</strong> {options.url || "No link added"}
        <br />
        <strong>Mutation:</strong> {options.state || "None"}
      </span>
    </>
  );
};
WithLinkAddedCallback.storyName = "Link Added Callback";

export const WithLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = CreateFromHTML(initialValue);
  const previews = [
    <a
      href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
      rel="noreferrer"
      dir="ltr"
    >
      <span data-lexical-text="true">Carbon</span>
    </a>,
  ];

  return (
    <>
      <RichTextEditor
        labelText="Rich Text Editor"
        previews={previews}
        value={value}
      />
    </>
  );
};
WithLinkPreviews.storyName = "Link Previews";

export const WithComplexLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = CreateFromHTML(initialValue);

  const firstRender = useRef(false);
  const previews = useRef<React.JSX.Element[]>([]);
  const removeUrl = (reportedUrl: string | undefined) => {
    previews.current = previews.current.filter(
      (preview) => reportedUrl !== preview.props.url,
    );
  };

  if (!firstRender.current) {
    firstRender.current = true;
    previews.current.push(
      <EditorLinkPreview
        onClose={(urlString) => removeUrl(urlString)}
        title="Han Shot First"
        url="https://en.wikipedia.org/wiki/Han_shot_first"
        description="Had a slight weapons malfunction but, uh everything's perfectly all right now. We're fine. We're all fine here now. Thank you. How are you?"
        key="key - 1"
      />,
    );
  }

  return (
    <>
      <RichTextEditor
        labelText="Rich Text Editor"
        previews={previews.current}
        value={value}
      />
    </>
  );
};
WithComplexLinkPreviews.storyName = "Complex Link Previews";

export const WithMultipleLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = CreateFromHTML(initialValue);

  const firstRender = useRef(false);
  const previews = useRef<React.JSX.Element[]>([]);
  const removeUrl = (reportedUrl: string | undefined) => {
    previews.current = previews.current.filter(
      (preview) => reportedUrl !== preview.props.url,
    );
  };

  if (!firstRender.current) {
    firstRender.current = true;
    previews.current.push(
      <EditorLinkPreview
        onClose={(urlString) => removeUrl(urlString)}
        title="Han Shot First"
        url="https://en.wikipedia.org/wiki/Han_shot_first"
        description="Had a slight weapons malfunction but, uh everything's perfectly all right now. We're fine. We're all fine here now. Thank you. How are you?"
        key="key - 1"
      />,
    );
    previews.current.push(
      <a
        href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
        rel="noreferrer"
        dir="ltr"
      >
        <span data-lexical-text="true">Carbon</span>
      </a>,
    );
  }

  return (
    <>
      <RichTextEditor
        labelText="Rich Text Editor"
        previews={previews.current}
        value={value}
      />
    </>
  );
};
WithMultipleLinkPreviews.storyName = "Multiple Link Previews";

export const ReadOnly: Story = () => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p>`;
  const value = CreateFromHTML(initialValue);
  return <RichTextEditor labelText="Rich Text Editor" readOnly value={value} />;
};
ReadOnly.storyName = "Read-Only Mode";
