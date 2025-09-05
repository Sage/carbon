/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextEditor, { createFromHTML, TextEditorProps } from ".";
import Box from "../box";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__/__ui__/ReadOnlyEditor/read-only-rte.component";
import createGuid from "../../__internal__/utils/helpers/guid";
import MentionsPlugin from "./__internal__/__ui__/Mentions/mentions.component";

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor/Test",
  component: TextEditor,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

export const Validation: Story = () => {
  return (
    <>
      <TextEditor
        validationMessagePositionTop
        namespace="storybook-error-bottom"
        labelText="Text Editor"
        inputHint="Hint text"
        error="error"
        characterLimit={100}
        mb={2}
      />
      <TextEditor
        validationMessagePositionTop
        namespace="storybook-warning-bottom"
        labelText="Text Editor"
        warning="warning"
        characterLimit={100}
      />
      <TextEditor
        namespace="storybook-error-top"
        labelText="Text Editor"
        inputHint="Hint text"
        error="error"
        characterLimit={100}
        mb={2}
      />
      <TextEditor
        namespace="storybook-warning-top"
        labelText="Text Editor"
        warning="warning"
        characterLimit={100}
        mb={2}
      />
    </>
  );
};
Validation.storyName = "Validation";

export const Functions = ({ ...props }: Partial<TextEditorProps>) => {
  const initialValue = `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
  const defaultValue = createFromHTML(initialValue);

  const handleChange = useDebounce<NonNullable<TextEditorProps["onChange"]>>(
    (...args) => {
      action("onChange")(args);
    },
    2000,
  );

  return (
    <Box p={1}>
      <TextEditor
        labelText="Text Editor"
        {...props}
        onCancel={action("onCancel")}
        onChange={handleChange}
        onLinkAdded={action("onLinkAdded")}
        onSave={action("onSave")}
        initialValue={defaultValue}
      />
    </Box>
  );
};

Functions.storyName = "Functions";
Functions.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ReadOnlyEditorForNotes = () => {
  const defaultValue = `This is a plain text example`;

  const htmlValue = createFromHTML(
    `<p dir="ltr"><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists <strong>and formatting</strong>!</span></li></ol>`,
  );

  return (
    <Box p={1}>
      <Typography>
        This version of the editor is provided exclusively for use in the `Note`
        component and as such is not available to consumers. It is
        stripped-down, simplified implementation akin to Lexical's most basic
        editor, and it's sole purpose is to display the content of `Note` in the
        correct display format. The light gray background is used to indicate
        the position of the editor, and is purely decorative for this story; it
        will not appear in the actual component.
      </Typography>
      <Box p={1} display="flex" gap={2} flexDirection="column">
        <Box p={1} backgroundColor="lightgray">
          <ReadOnlyEditor initialValue={defaultValue} />
        </Box>
        <Box p={1} backgroundColor="lightgray">
          <ReadOnlyEditor initialValue={htmlValue} />
        </Box>
      </Box>
    </Box>
  );
};

export const OnChangeFormattedValues: Story = () => {
  const [valueJSON, setValueJSON] = React.useState<string | undefined>(
    undefined,
  );
  const [valueHTML, setValueHTML] = React.useState<string | undefined>(
    undefined,
  );
  return (
    <>
      <TextEditor
        namespace="storybook-onchange-formatted-values"
        labelText="Text Editor"
        onChange={(_: any, { htmlString, json }: any) => {
          setValueJSON(JSON.stringify(json, null, 2));
          setValueHTML(htmlString);
          action("onChange")({ htmlString, json });
        }}
      />
      <div>
        <b>JSON formatted content:</b>
        <br /> {valueJSON}
      </div>
      <br />
      <br />
      <div>
        <b>HTML formatted content:</b>
        <br />
        {valueHTML}
      </div>
    </>
  );
};
OnChangeFormattedValues.storyName = "Change Handler With Formatted Values";
OnChangeFormattedValues.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ExternalOverwrite: Story = () => {
  const [, setValue] = useState("");
  const [resetKey, setResetKey] = useState(createGuid);

  useEffect(() => {
    setTimeout(() => {
      setValue(createFromHTML("<p>Message Changed</p>"));
      setResetKey(createGuid()); // Reset editor by changing its key
    }, 3000);
  }, []);

  return (
    <TextEditor
      key={resetKey}
      labelText="Message"
      initialValue={createFromHTML("<p>Hello world</p>")}
      onChange={(value: string, formattedValues: any) => {
        action("onChange")({ value, formattedValues });
        setValue(createFromHTML(value));
      }}
    />
  );
};
ExternalOverwrite.storyName = "Externally overwrite editor content";
ExternalOverwrite.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Mentions: Story = ({ ...args }) => {
  const mentionsCache = new Map();
  const [queryString, setQueryString] = useState<string | null>(null);

  const dummyMentionsData = [
    "Damien Robson",
    "Daniel Dipper",
    "Darius Bercea",
    "Debra Toranska",
    "Divya Jindel",
    "Ed Leeks",
    "James Parslow",
    "Mihai Albu",
    "Nick Titchmarsh",
    "Nuria Torres Ramon",
    "Paul Robinson",
    "Robin Zigmond",
    "Sian Ford",
    "Stephen O'Gorman",
    "Tom Davies",
    "Will Seabrook",
  ];

  const dummyLookupService = {
    search(string: string, callback: (results: Array<string>) => void): void {
      setTimeout(() => {
        const results = dummyMentionsData.filter((mention) =>
          mention.toLowerCase().includes(string.toLowerCase()),
        );
        callback(results);
      }, 500);
    },
  };

  function useMentionLookupService(mentionString: string | null) {
    const [results, setResults] = useState<Array<string>>([]);

    useEffect(() => {
      const cachedResults = mentionsCache.get(mentionString);

      if (mentionString == null) {
        setResults([]);
        return;
      }

      if (cachedResults === null) {
        return;
      }
      if (cachedResults !== undefined) {
        setResults(cachedResults);
        return;
      }

      mentionsCache.set(mentionString, null);
      dummyLookupService.search(mentionString, (newResults) => {
        mentionsCache.set(mentionString, newResults);
        setResults(newResults);
      });
    }, [mentionString]);

    return results;
  }

  const results = useMentionLookupService(queryString);

  return (
    <>
      <TextEditor
        namespace="storybook-mentions"
        labelText="Text Editor"
        initialValue={`
          { "root": { "children": [ { "children": [ { "detail": 0, "format": 0, "mode": "normal", "style": "", "text": "Title", "type": "styled-span", "version": 1, "fontWeight": "700", "fontSize": "30px", "lineHeight": "37.5px" } ], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1, "textFormat": 0, "textStyle": "" }, { "children": [ { "detail": 0, "format": 0, "mode": "normal", "style": "", "text": "Some body content, what I have wrote.", "type": "styled-span", "version": 1, "fontWeight": "400", "fontSize": "14px", "lineHeight": "14px" } ], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1, "textFormat": 0, "textStyle": "" } ], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1 } }
          `}
        inputHint="Hint text"
        onChange={action("onChange")}
        customPlugins={[
          <MentionsPlugin results={results} setQueryString={setQueryString} />,
        ]}
        {...args}
      />
    </>
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

export const EmptyToolbar: Story = () => (
  <TextEditor
    validationMessagePositionTop
    namespace="storybook-error-bottom"
    labelText="Text Editor"
    inputHint="Hint text"
    error="error"
    characterLimit={100}
    mb={2}
    toolbarControls={[]}
  />
);
EmptyToolbar.storyName = "Empty Toolbar";
EmptyToolbar.parameters = {
  chromatic: { disableSnapshot: false },
};
