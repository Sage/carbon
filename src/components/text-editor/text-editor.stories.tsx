import { Meta, StoryObj } from "@storybook/react";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

import Box from "../box";
import Button from "../button";
import I18nProvider from "../i18n-provider";
import EditorLinkPreview from "../link-preview";
import Typography from "../typography";
import Link from "../link";
import Form, { FormProps } from "../form";

import enGB from "../../locales/en-gb";

import TextEditor, {
  TextEditorHandle,
  createEmpty,
  createFromHTML,
  EditorFormattedValues,
  TextEditorProps,
  Mention,
  MentionsPlugin,
} from ".";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { action } from "@storybook/addon-actions";

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

export const Demo: Story = {
  render: (args: TextEditorProps) => (
    <Box mx={2} my={0}>
      <Typography mb={2}>
        This is an interactive demo of the Text Editor component. Use the
        controls in the panel below to modify props and see how the component
        behaves with different configurations.
      </Typography>
      <TextEditor
        {...args}
        customPlugins={
          <MentionsPlugin
            namespace={args.namespace || "storybook-mentions"}
            searchOptions={[
              {
                id: "1",
                name: "Amanda Ball",
              },
              {
                id: "2",
                name: "Anaya Underwood",
              },
              {
                id: "3",
                name: "Tylar Cox",
              },
              {
                id: "4",
                name: "Ibrahim Abbasov",
              },
            ]}
          />
        }
      />
    </Box>
  ),
  args: {
    labelText: "Text Editor Label",
    placeholder: "Enter your text here...",
    rows: 4,
    size: "medium",
    namespace: "storybook-demo",
    inputHint: "",
    characterLimit: undefined,
    required: false,
    readOnly: false,
    error: "",
    warning: "",
    validationMessagePositionTop: false,
    header: "",
    footer: "",
    toolbarControls: [
      "typography",
      "bold",
      "italic",
      "underline",
      "unordered-list",
      "ordered-list",
      "link",
    ],
    initialValue: undefined,
    // Callbacks handled via actions
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    onBlur: action("onBlur"),
    onLinkAdded: action("onLinkAdded"),
    onCancel: action("onCancel"),
    onSave: action("onSave"),
  },
  parameters: {
    options: {
      initialActive: "controls",
    },
  },
};

export const ProgrammaticFocus = () => {
  const editorRef = useRef<TextEditorHandle>(null);

  return (
    <Box mx={2} my={0}>
      <Button mb="30px" onClick={() => editorRef.current?.focus()}>
        Focus the editor
      </Button>

      <TextEditor
        ref={editorRef}
        namespace="storybook-default"
        labelText="Text Editor"
      />
    </Box>
  );
};
ProgrammaticFocus.storyName = "Focusing the Text Editor Programmatically";

export const ToolbarControls: Story = {
  render: (args: TextEditorProps) => (
    <Box mx={2} my={0}>
      <TextEditor {...args} />
    </Box>
  ),
  args: {
    labelText: "Text Editor Label",
    rows: 4,
    size: "medium",
    namespace: "storybook-demo",
    toolbarControls: ["link"],
  },
};

export const HeaderAndFooter: Story = () => {
  return (
    <Box mx={2} my={0}>
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
    </Box>
  );
};
HeaderAndFooter.storyName = "With Header and Footer";

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
    <Box mx={2} my={0}>
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
    </Box>
  );
};
OnChange.storyName = "onChange Handler";
OnChange.parameters = {
  chromatic: { disableSnapshot: true },
};

const saveContent = async (content: string) => content;
const generateGuid = () => crypto.randomUUID();

export const ExternallyOverwriting: Story = () => {
  const [content, setContent] = useState("");
  const [resetKey, setResetKey] = useState(generateGuid); // Use a guid string as a key for the editor

  const handleSubmit: FormProps["onSubmit"] = async (ev) => {
    ev.preventDefault();

    await saveContent(content); // Saving content to a server or local storage

    setResetKey(generateGuid()); // Reset editor by changing the key
    setContent("");
  };

  return (
    <Box mx={2} my={0}>
      <Form
        onSubmit={handleSubmit}
        saveButton={
          <Button type="submit" buttonType="primary">
            Save
          </Button>
        }
      >
        <TextEditor
          key={resetKey}
          labelText="Feedback"
          initialValue={createEmpty()}
          onChange={(value) => setContent(createFromHTML(value))}
        />
      </Form>
    </Box>
  );
};
ExternallyOverwriting.storyName = "Externally overwriting the editor's content";
ExternallyOverwriting.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OnSave: Story = () => {
  const [data, setData] = useState<EditorFormattedValues>({
    htmlString: "<p><br></p>",
    json: undefined,
  });
  const [showData, setShowData] = useState(false);
  return (
    <Box mx={2} my={0}>
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
    </Box>
  );
};
OnSave.storyName = "onSave Handler";
OnSave.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SettingInitialValues: Story = () => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const value = createFromHTML(initialValue); // Use JSON.stringify(initialValue) when using JSON objects

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-withhtmlvalue"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
  );
};
SettingInitialValues.storyName = "Setting Initial Values";
SettingInitialValues.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Links: Story = () => {
  const defaultHTML = `<a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a>`;
  const value = createFromHTML(defaultHTML);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-links"
        labelText="Text Editor"
        initialValue={value}
      />
    </Box>
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
    <Box mx={2} my={0}>
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
    </Box>
  );
};
WithLinkAddedCallback.storyName = "Link Added Callback";
WithLinkAddedCallback.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithLinkPreviews: Story = () => {
  const initialValue = `<p><span data-lexical-text="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi ipsum, facilisis ut luctus non, gravida in orci. Aliquam risus massa, consequat non facilisis vel, bibendum quis nunc. Cras sit amet velit vel libero molestie accumsan. Integer id ipsum nec nunc porta bibendum. Aenean ut porta risus, eget dignissim felis. Praesent vitae tempus ante. Mauris nibh risus, congue ac augue ac, congue auctor metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vitae enim arcu. Integer quis mattis nunc, in porta neque. Proin sit amet purus congue, faucibus mauris id, consectetur justo. Vestibulum odio nisi, vehicula at odio ut, dapibus scelerisque tortor. Etiam vulputate massa orci, porttitor sollicitudin odio sollicitudin vitae. Mauris et eleifend dolor. Curabitur luctus lacinia sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus.</span></p>`;
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
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-complexlinkpreviews"
        labelText="Text Editor"
        previews={previews.current}
        initialValue={value}
      />
    </Box>
  );
};
WithLinkPreviews.storyName = "Link Previews";

export const Translations: Story = () => {
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
          underlineAria: () => "Underline text",
          hyperlink: {
            buttonAria: () => "Hyperlink",
            cancelButton: () => "Cancel",
            cancelButtonAria: () => "Cancel",
            dialogTitle: () => "Add link",
            linkFieldLabel: () => "Link",
            saveButton: () => "Save",
            saveButtonAria: () => "Save",
            textFieldLabel: () => "Text",
          },
          typography: {
            selectAria: () => "Heading type",
            paragraph: () => "Paragraph",
            title: () => "Title",
            subtitle: () => "Subtitle",
            sectionHeader: () => "Section header",
            sectionSubheader: () => "Section subheader",
          },
          mentions: {
            listAriaLabel: () => "List of mentionable people",
          },
        },
      }}
    >
      <Box mx={2} my={0}>
        <TextEditor
          namespace="storybook-customtranslations"
          characterLimit={10}
          labelText="Translated Text Editor"
          onCancel={() => {}}
          onSave={() => {}}
        />
      </Box>
    </I18nProvider>
  );
};
Translations.storyName = "Translations";

export const ReadOnly: Story = () => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is an HTML example.</span><br><a href="https://carbon.sage.com/?path=/story/welcome--welcome-page" rel="noreferrer" ><span data-lexical-text="true">Carbon</span></a></p>`;
  const value = createFromHTML(initialValue);
  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-readonly"
        labelText="Text Editor"
        readOnly
        initialValue={value}
      />
    </Box>
  );
};
ReadOnly.storyName = "Read-Only Mode";
ReadOnly.parameters = {
  chromatic: { disableSnapshot: true },
};

export const MultipleEditors: Story = () => {
  return (
    <Box mx={2} my={0}>
      <TextEditor labelText="Text Editor One" namespace="rte-one" />
      <TextEditor labelText="Text Editor Two" namespace="rte-two" />
    </Box>
  );
};
MultipleEditors.storyName = "Multiple Editors";

export const WithCustomPlugins: Story = () => {
  const CustomWordCountPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [wordCount, setWordCount] = useState(0);
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const text = $getRoot().getTextContent();
          const count = text.trim().split(/\s+/).filter(Boolean).length;
          setWordCount(count);
        });
      });
    }, [editor]);
    return <Typography m={1}>Word Count: {wordCount}</Typography>;
  };

  return (
    <Box mx={2} my={0}>
      <TextEditor
        placeholder="Example of a custom word count plugin that updates in real time, showing the number of words at the bottom left of the editor as you type."
        namespace="storybook-default"
        labelText="Text Editor"
        customPlugins={<CustomWordCountPlugin />}
      />
    </Box>
  );
};
WithCustomPlugins.storyName = "With Custom Plugin";

export const Mentions: Story = ({ ...args }) => {
  const mentionsData: Mention[] = [
    {
      id: "1",
      name: "Amanda Ball",
    },
    {
      id: "2",
      name: "Anaya Underwood",
      initials: "AU",
    },
    {
      id: "3",
      name: "Alastair Cox",
      initials: "AC",
    },
    {
      id: "4",
      name: "Anwar al-Awlaki",
      src: "https://loremfaces.net/24/id/2.jpg",
    },
    {
      id: "5",
      name: "Angela Alabaster",
      src: "https://loremfaces.net/24/id/1.jpg",
    },
    {
      id: "6",
      name: "Alfred Jones",
      iconType: "accessibility_web",
    },
  ];

  return (
    <Box mx={2} my={0}>
      <TextEditor
        namespace="storybook-mentions"
        labelText="Text Editor"
        inputHint="Press '@' to mention someone"
        onChange={action("onChange")}
        customPlugins={[
          <MentionsPlugin
            namespace="storybook-mentions"
            searchOptions={mentionsData}
          />,
        ]}
        {...args}
      />
    </Box>
  );
};
Mentions.storyName = "Mentions";
Mentions.parameters = {
  chromatic: { disableSnapshot: false },
};
Mentions.args = {
  characterLimit: 1000,
  error: "",
  inputHint: "Type '@' to mention someone",
  labelText: "Text Editor with Mentions support",
  namespace: "storybook-mentions",
  readOnly: false,
  size: "medium",
  warning: "",
};
