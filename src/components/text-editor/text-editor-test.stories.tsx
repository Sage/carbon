import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TextEditor, {
  createFromHTML,
  Mention,
  MentionsPlugin,
  TextEditorProps,
} from ".";
import Box from "../box";
import Typography from "../typography";

import useDebounce from "../../hooks/__internal__/useDebounce";
import ReadOnlyEditor from "./__internal__/__ui__/ReadOnlyEditor/read-only-rte.component";
import createGuid from "../../__internal__/utils/helpers/guid";
import CarbonProvider from "../carbon-provider";
import Textbox from "../textbox";
import Link from "../link";

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
    <Box m={2}>
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
    </Box>
  );
};
Validation.storyName = "Validation";

export const MultipleInputs: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Textbox
        mb={2}
        label="Textbox"
        inputHint="Hint Text"
        error="error"
        onChange={setValue}
        value={state}
      />
      <TextEditor
        namespace="storybook-witherror"
        labelText="Text Editor"
        inputHint="Hint text"
        error="error"
        characterLimit={100}
        mb={2}
      />
      <Textbox
        mb={2}
        label="Textbox"
        inputHint="Hint Text"
        onChange={setValue}
        value={state}
      />
      <TextEditor
        namespace="storybook"
        labelText="Text Editor"
        inputHint="Hint text"
        characterLimit={100}
      />
    </CarbonProvider>
  );
};
MultipleInputs.storyName = "Multiple Inputs";

export const Playground: Story = {
  args: {
    characterLimit: 3000,
    error: "",
    inputHint: "",
    labelText: "Text Editor",
    namespace: "carbon-storybook-rte",
    placeholder: "Enter text here",
    readOnly: false,
    required: false,
    rows: 10,
    warning: "",
  },
};
Playground.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Functions = ({ ...props }: Partial<TextEditorProps>) => {
  const initialValue = `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists!</span></li></ol>`;
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
    `<p><span style="white-space: pre-wrap;">This is a HTML example.</span></p><ol><li value="1"><span style="white-space: pre-wrap;">Look, it has lists <strong>and formatting</strong>!</span></li></ol>`,
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
          <ReadOnlyEditor
            initialValue={defaultValue}
            useBackgroundColor={false}
          />
        </Box>
        <Box p={1} backgroundColor="lightgray">
          <ReadOnlyEditor initialValue={htmlValue} useBackgroundColor={false} />
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
        onChange={(_, { htmlString, json }) => {
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
      onChange={(value: string, formattedValues) => {
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
  chromatic: { disableSnapshot: true },
};

export const LargeMentionCount: Story = ({ ...args }) => {
  const mentionsData: Mention[] = [
    { id: "1", name: "Frodo Baggins" },
    { id: "2", name: "Samwise Gamgee" },
    { id: "3", name: "Gandalf the Grey" },
    { id: "4", name: "Aragorn" },
    { id: "5", name: "Legolas" },
    { id: "6", name: "Gimli" },
    { id: "7", name: "Boromir" },
    { id: "8", name: "Meriadoc Brandybuck" },
    { id: "9", name: "Peregrin Took" },
    { id: "10", name: "Gollum" },
    { id: "11", name: "Galadriel" },
    { id: "12", name: "Elrond" },
    { id: "13", name: "Saruman" },
    { id: "14", name: "Sauron" },
    { id: "15", name: "Éowyn" },
    { id: "16", name: "Éomer" },
    { id: "17", name: "Faramir" },
    { id: "18", name: "Denethor" },
    { id: "19", name: "Theoden" },
    { id: "20", name: "Treebeard" },
    { id: "21", name: "Bilbo Baggins" },
    { id: "22", name: "Thranduil" },
    { id: "23", name: "Glorfindel" },
    { id: "24", name: "Radagast" },
    { id: "25", name: "Shelob" },
    { id: "26", name: "Lurtz" },
    { id: "27", name: "Gríma Wormtongue" },
    { id: "28", name: "Beregond" },
    { id: "29", name: "Balin" },
    { id: "30", name: "Dáin Ironfoot" },
    { id: "31", name: "Kili" },
    { id: "32", name: "Fili" },
    { id: "33", name: "Bifur" },
    { id: "34", name: "Bofur" },
    { id: "35", name: "Bombur" },
    { id: "36", name: "Ori" },
    { id: "37", name: "Nori" },
    { id: "38", name: "Dori" },
    { id: "39", name: "Thorin Oakenshield" },
    { id: "40", name: "Beorn" },
    { id: "41", name: "Gothmog" },
    { id: "42", name: "Mouth of Sauron" },
    { id: "43", name: "Rosie Cotton" },
    { id: "44", name: "Haldir" },
    { id: "45", name: "Celeborn" },
    { id: "46", name: "Isildur" },
    { id: "47", name: "Anárion" },
    { id: "48", name: "Gil-galad" },
    { id: "49", name: "Círdan the Shipwright" },
    { id: "50", name: "Tom Bombadil" },
    { id: "51", name: "Goldberry" },
    { id: "52", name: "Barliman Butterbur" },
    { id: "53", name: "Farmer Maggot" },
    { id: "54", name: "Lobelia Sackville-Baggins" },
    { id: "55", name: "Gorbag" },
    { id: "56", name: "Shagrat" },
    { id: "57", name: "Uglúk" },
    { id: "58", name: "Bolg" },
    { id: "59", name: "Azog" },
    { id: "60", name: "Smaug" },
    { id: "61", name: "Théodred" },
    { id: "62", name: "Hama" },
    { id: "63", name: "Gamling" },
    { id: "64", name: "Déagol" },
    { id: "65", name: "Halbarad" },
    { id: "66", name: "Elladan" },
    { id: "67", name: "Elrohir" },
    { id: "68", name: "Arwen" },
    { id: "69", name: "Fredegar Bolger" },
    { id: "70", name: "Galdor of the Havens" },
    { id: "71", name: "Bard the Bowman" },
    { id: "72", name: "Alatar" },
    { id: "73", name: "Pallando" },
    { id: "74", name: "Tulkas" },
    { id: "75", name: "Melkor" },
    { id: "76", name: "Varda" },
    { id: "77", name: "Yavanna" },
    { id: "78", name: "Aulë" },
    { id: "79", name: "Manwë" },
    { id: "80", name: "Mandos" },
    { id: "81", name: "Ulmo" },
    { id: "82", name: "Vairë" },
    { id: "83", name: "Nienna" },
    { id: "84", name: "Eru Ilúvatar" },
    { id: "85", name: "Lúthien Tinúviel" },
    { id: "86", name: "Beren" },
    { id: "87", name: "Finrod Felagund" },
    { id: "88", name: "Thingol" },
    { id: "89", name: "Melian" },
    { id: "90", name: "Maedhros" },
    { id: "91", name: "Maglor" },
    { id: "92", name: "Celegorm" },
    { id: "93", name: "Curufin" },
    { id: "94", name: "Caranthir" },
    { id: "95", name: "Amrod" },
    { id: "96", name: "Amras" },
    { id: "97", name: "Fëanor" },
    { id: "98", name: "Turgon" },
    { id: "99", name: "Tuor" },
    { id: "100", name: "Eärendil" },
  ];

  return (
    <>
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
    </>
  );
};
LargeMentionCount.storyName = "Large Mention Count";
LargeMentionCount.parameters = {
  chromatic: { disableSnapshot: true },
};
LargeMentionCount.args = {
  characterLimit: 1000,
  error: "",
  inputHint: "Type '@' to mention someone",
  labelText: "Text Editor with Mentions support",
  namespace: "storybook-mentions",
  readOnly: false,
  size: "medium",
  warning: "",
};

export const LinkToEditor: Story = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="1200px"
    >
      <Link href="#test-text-editor" target="_self">
        Go To TextEditor
      </Link>
      <TextEditor
        validationMessagePositionTop
        namespace="storybook-error-bottom"
        labelText="Text Editor"
        inputHint="Hint text"
        characterLimit={100}
        id="test-text-editor"
      />
    </Box>
  );
};
LinkToEditor.storyName = "Link To Editor";
LinkToEditor.parameters = {
  chromatic: { disableSnapshot: true },
};
