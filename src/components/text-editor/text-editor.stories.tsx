/* eslint-disable no-alert */
import { Meta, StoryObj } from "@storybook/react";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";
import EditorLinkPreview from "../link-preview";
import Typography from "../typography";
import Link from "../link";

import enGB from "../../locales/en-gb";

import TextEditor, {
  TextEditorHandle,
  createEmpty,
  createFromHTML,
  EditorFormattedValues,
} from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor",
  component: TextEditor,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor>;

export const Default: Story = () => {
  return <TextEditor namespace="storybook-default" labelText="Text Editor" />;
};
Default.storyName = "Default";

export const ProgrammaticFocus = () => {
  const editorRef = useRef<TextEditorHandle>(null);

  return (
    <>
      <Button mb="30px" onClick={() => editorRef.current?.focus()}>
        Focus the editor
      </Button>

      <TextEditor
        ref={editorRef}
        namespace="storybook-default"
        labelText="Text Editor"
      />
    </>
  );
};
ProgrammaticFocus.storyName = "Focusing the Text Editor Programmatically";

export const Header: Story = () => {
  return (
    <TextEditor
      namespace="storybook-header"
      labelText="Text Editor"
      header={<Button buttonType="gradient-white">Button</Button>}
    />
  );
};
Header.storyName = "With Header";

export const Footer: Story = () => {
  return (
    <TextEditor
      namespace="storybook-footer"
      labelText="Text Editor"
      footer={
        <Typography color="--colorsUtilityYin055">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text{" "}
          <Link href="https://carbon.sage.com/?path=/story/welcome--welcome-page">
            ever since the 1500s
          </Link>
        </Typography>
      }
    />
  );
};
Footer.storyName = "With Footer";

export const HeaderAndFooter: Story = () => {
  return (
    <TextEditor
      namespace="storybook-header-and-footer"
      labelText="Text Editor"
      header={<Button buttonType="gradient-white">Button</Button>}
      footer={
        <Typography color="--colorsUtilityYin055">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text{" "}
          <Link href="https://carbon.sage.com/?path=/story/welcome--welcome-page">
            ever since the 1500s
          </Link>
        </Typography>
      }
    />
  );
};
HeaderAndFooter.storyName = "With Header and Footer";

export const UsingCreateEmpty: Story = () => {
  const value = createEmpty();
  return (
    <TextEditor
      namespace="storybook-usingcreateempty"
      labelText="Text Editor"
      value={value}
    />
  );
};
UsingCreateEmpty.storyName = "Using CreateEmpty";
UsingCreateEmpty.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Required: Story = () => {
  return (
    <TextEditor
      namespace="storybook-required"
      labelText="Text Editor"
      required
    />
  );
};
Required.storyName = "Required";

export const Optional: Story = () => {
  return (
    <TextEditor
      namespace="storybook-optional"
      labelText="Text Editor"
      isOptional
    />
  );
};
Optional.storyName = "Optional";

export const CharacterLimit: Story = () => {
  return (
    <TextEditor
      namespace="storybook-characterlimit"
      labelText="Text Editor"
      characterLimit={50}
    />
  );
};
CharacterLimit.storyName = "Character Limit";

export const CommandButtons: Story = () => {
  return (
    <TextEditor
      namespace="storybook-commandbuttons"
      labelText="Text Editor"
      onCancel={() => alert("Cancelled")}
      onSave={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    />
  );
};
CommandButtons.storyName = "Command Buttons";

export const OnBlur: Story = () => {
  const [blurred, setBlurred] = React.useState<number>(0);
  return (
    <>
      <TextEditor
        namespace="storybook-onchange"
        labelText="Text Editor"
        onBlur={() => setBlurred((prev) => prev + 1)}
      />
      <div>Times blurred: {blurred}</div>
    </>
  );
};
OnBlur.storyName = "onBlur Handler";
OnBlur.parameters = {
  chromatic: { disableSnapshot: true },
};

export const onCancel: Story = () => {
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
    <TextEditor
      namespace="storybook-oncancel"
      labelText="Text Editor"
      value={value}
      onCancel={() => {}}
    />
  );
};
onCancel.storyName = "onCancel Handler";
onCancel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OnChange: Story = () => {
  const [valueString, setValueString] = React.useState<string | undefined>(
    undefined,
  );
  const [valueHTML, setValueHTML] = React.useState<string | undefined>(
    undefined,
  );

  const handleChange = useCallback(
    (value: string, formattedValues: EditorFormattedValues) => {
      setValueString(value);
      setValueHTML(formattedValues.htmlString);
    },
    [],
  );

  return (
    <>
      <TextEditor
        namespace="storybook-onchange"
        labelText="Text Editor"
        onChange={handleChange}
      />
      <div>Unformatted content: {valueString || "No content"}</div>
      <div>
        HTML formatted content:{" "}
        {valueHTML === "<p><br></p>" ? "No content" : valueHTML}
      </div>
    </>
  );
};
OnChange.storyName = "onChange Handler";
OnChange.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OnFocus: Story = () => {
  const [focused, setFocused] = React.useState<number>(0);
  return (
    <>
      <TextEditor
        namespace="storybook-onchange"
        labelText="Text Editor"
        onFocus={() => setFocused((prev) => prev + 1)}
      />
      <div>Times focused: {focused}</div>
    </>
  );
};
OnFocus.storyName = "onFocus Handler";
OnFocus.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OnSave: Story = () => {
  const [data, setData] = useState<EditorFormattedValues>({
    htmlString: "<p><br></p>",
    json: undefined,
  });
  const [showData, setShowData] = useState(false);
  return (
    <>
      <>
        <TextEditor
          namespace="storybook-onsave"
          labelText="Text Editor"
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
OnSave.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithHTMLValue: Story = () => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(initialValue);
  return (
    <TextEditor
      namespace="storybook-withhtmlvalue"
      labelText="Text Editor"
      value={value}
    />
  );
};
WithHTMLValue.storyName = "HTML As Initial Value";
WithHTMLValue.parameters = {
  chromatic: { disableSnapshot: true },
};

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
  return (
    <TextEditor
      namespace="storybook-withjsonvalue"
      labelText="Text Editor"
      value={value}
    />
  );
};
WithJSONValue.storyName = "JSON As Initial Value";
WithJSONValue.parameters = {
  chromatic: { disableSnapshot: true },
};

export const InputHint: Story = () => {
  return (
    <TextEditor
      namespace="storybook-inputhint"
      labelText="Text Editor"
      inputHint="This is an example input hint"
    />
  );
};
InputHint.storyName = "Input Hint";

export const Rows: Story = () => {
  return (
    <TextEditor namespace="storybook-rows" labelText="Text Editor" rows={20} />
  );
};
Rows.storyName = "Row Count";

export const WithPlaceholder: Story = () => {
  return (
    <TextEditor
      namespace="storybook-placeholder"
      labelText="Text Editor"
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
        textEditor: {
          boldAria: () => "Make text bold",
          cancelButton: () => "No",
          cancelButtonAria: () => "Cancel the current content",
          characterCounter: (count: string | number) =>
            `You've got ${count} characters left`,
          characterLimit: (count: number) =>
            `Please delete the last ${count} characters`,
          contentEditorAria: () => "Rich text content editor",
          italicAria: () => "Make text italic",
          orderedListAria: () => "Ordered list",
          saveButton: () => "Yes",
          saveButtonAria: () => "Save the current content",
          toolbarAriaLabel: () => "Formatting",
          unorderedListAria: () => "Unordered list",
        },
      }}
    >
      <TextEditor
        namespace="storybook-customtranslations"
        characterLimit={10}
        labelText="Translated Text Editor"
        onCancel={() => {}}
        onSave={() => {}}
      />
    </I18nProvider>
  );
};
WithCustomTranslations.storyName = "Translations";

export const Links: Story = () => {
  const defaultHTML = `<a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" dir="ltr"><span data-lexical-text="true">Carbon</span></a>`;
  const value = createFromHTML(defaultHTML);
  return (
    <TextEditor
      namespace="storybook-links"
      labelText="Text Editor"
      value={value}
    />
  );
};
Links.storyName = "Link Support";

export const WithLinkAddedCallback: Story = () => {
  const [options, setOptions] = useState<{ url: string; state: string }>({
    url: "",
    state: "",
  });

  const handleLinkAdded = useCallback((link: string, state: string) => {
    setOptions({ url: link, state });
  }, []);

  return (
    <>
      <TextEditor
        namespace="storybook-linkscallback"
        labelText="Text Editor"
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
WithLinkAddedCallback.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = createFromHTML(initialValue);
  const previews = [
    <a
      dir="ltr"
      href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
      key="key-0"
      rel="noreferrer"
    >
      <span data-lexical-text="true">Carbon</span>
    </a>,
  ];

  return (
    <>
      <TextEditor
        namespace="storybook-linkpreviews"
        labelText="Text Editor"
        previews={previews}
        value={value}
      />
    </>
  );
};
WithLinkPreviews.storyName = "Link Previews";

export const WithComplexLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = createFromHTML(initialValue);

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
        key="key-1"
      />,
    );
  }

  return (
    <>
      <TextEditor
        namespace="storybook-complexlinkpreviews"
        labelText="Text Editor"
        previews={previews.current}
        value={value}
      />
    </>
  );
};
WithComplexLinkPreviews.storyName = "Complex Link Previews";

export const WithMultipleLinkPreviews: Story = () => {
  const initialValue = `<p dir="ltr"><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
  const value = createFromHTML(initialValue);
  const [previews, setPreviews] = useState<React.JSX.Element[]>([]);

  const closePreview = useCallback((urlString: string | undefined) => {
    if (!urlString) return;
    setPreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.props.url !== urlString),
    );
  }, []);

  useEffect(() => {
    if (previews && previews.length === 0) {
      setPreviews([
        <a
          dir="ltr"
          href="https://carbon.sage.com/?path=/story/welcome--welcome-page"
          key="key-0"
          rel="noreferrer"
        >
          <span data-lexical-text="true">Carbon</span>
        </a>,
        <EditorLinkPreview
          onClose={closePreview}
          title="Han Shot First"
          url="https://en.wikipedia.org/wiki/Han_shot_first"
          description="Had a slight weapons malfunction but, uh everything's perfectly all right now. We're fine. We're all fine here now. Thank you. How are you?"
          key="key-1"
          as="div"
        />,
      ]);
    }
  }, [closePreview, previews]);

  return (
    <>
      <TextEditor
        namespace="storybook-multiplinkpreviews"
        labelText="Text Editor"
        previews={previews}
        value={value}
      />
    </>
  );
};
WithMultipleLinkPreviews.storyName = "Multiple Link Previews";

export const ReadOnly: Story = () => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is an HTML example.</span><br><a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" dir="ltr"><span data-lexical-text="true">Carbon</span></a></p>`;
  const value = createFromHTML(initialValue);
  return (
    <TextEditor
      namespace="storybook-readonly"
      labelText="Text Editor"
      readOnly
      value={value}
    />
  );
};
ReadOnly.storyName = "Read-Only Mode";
ReadOnly.parameters = {
  chromatic: { disableSnapshot: true },
};

export const MultipleEditors: Story = () => {
  return (
    <Box>
      <TextEditor labelText="Text Editor One" namespace="rte-one" />
      <TextEditor labelText="Text Editor Two" namespace="rte-two" />
    </Box>
  );
};
MultipleEditors.storyName = "Multiple Editors";
