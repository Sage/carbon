import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import CarbonProvider from "../carbon-provider";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import I18nProvider from "../i18n-provider";
import Button from "../button";
import EditorLinkPreview from "../link-preview";
import Box from "../box";
import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
} from "./text-editor.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof TextEditor> = {
  title: "Text Editor",
  component: TextEditor,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor>;

export const Default: Story = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
      />
    </Box>
  );
};
Default.storyName = "Default";

export const WithContent: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("Some initial content"),
    ),
  );
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
      />
    </Box>
  );
};
WithContent.storyName = "With Content";

export const WithOptionalButtons: Story = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        toolbarElements={[
          <Button key="cancel button" buttonType="tertiary" onClick={() => {}}>
            Cancel
          </Button>,
          <Button
            key="save button"
            buttonType="primary"
            type="button"
            onClick={() => {}}
          >
            Save
          </Button>,
        ]}
        labelText="Text Editor Label"
      />
    </Box>
  );
};
WithOptionalButtons.storyName = "With Optional Buttons";

export const WithOptionalCharacterLimit: Story = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  const limit = 100;
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        characterLimit={limit}
      />
    </Box>
  );
};
WithOptionalCharacterLimit.storyName = "With Optional Character Limit";

export const CharacterCounterTranslations: Story = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  const limit = 100;
  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        characterCount: {
          charactersLeft: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère restant`
              : `${formattedCount} caractères restants`,
          tooManyCharacters: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère de trop`
              : `${formattedCount} caractères de trop`,
          visuallyHiddenHint: (formattedCount) =>
            `Vous pouvez saisir jusqu'à ${formattedCount} caractères`,
        },
      }}
    >
      <Box padding={1}>
        <TextEditor
          onChange={(newValue) => {
            setValue(newValue);
          }}
          value={value}
          labelText="Text Editor Label"
          characterLimit={limit}
        />
      </Box>
    </I18nProvider>
  );
};
CharacterCounterTranslations.storyName = "Character Counter Translations";

export const WithValidation: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content")),
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={limit - contentLength <= 5 ? "There is an error" : undefined}
        warning={limit - contentLength <= 10 ? "There is a warning" : undefined}
        info={limit - contentLength <= 15 ? "There is an info" : undefined}
        inputHint="Some additional hint text"
      />
    </Box>
  );
};
WithValidation.storyName = "With Validation";

export const WithMultilineValidation: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content")),
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  const error =
    limit - contentLength <= 5
      ? `There is an error.
The content is too long.
Maybe try writing a little bit less?`
      : undefined;
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={error}
      />
    </Box>
  );
};
WithMultilineValidation.storyName = "With Multiline Validation";

export const WithNewValidation: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content")),
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  return (
    <CarbonProvider validationRedesignOptIn>
      <Box padding={2}>
        <TextEditor
          onChange={(newValue) => {
            setValue(newValue);
          }}
          value={value}
          labelText="Text Editor Label"
          characterLimit={limit}
          error={limit - contentLength <= 5 ? "There is an error" : undefined}
          warning={
            limit - contentLength <= 10 ? "There is a warning" : undefined
          }
          inputHint="Some additional hint text"
        />
      </Box>
    </CarbonProvider>
  );
};
WithNewValidation.storyName = "With New Validation";

export const WithCustomRowHeight: Story = () => {
  const [value, setValue] = useState(EditorState.createEmpty());

  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        rows={2}
      />
    </Box>
  );
};
WithCustomRowHeight.storyName = "With Custom Row Height";

export const WithLinkPreviews: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("www.sage.com")),
  );
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
        title="This is an example of a title"
        url="https://www.sage.com"
        description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
        key="key - 1"
      />,
    );
  }
  const checkValidDomain = (url: string) => {
    const domainsWhitelist = [".com", ".co.uk", ".org", ".net"];
    const result = domainsWhitelist.filter((domain) =>
      url.endsWith(domain),
    ).length;
    return !!result;
  };
  const addUrl = (reportedUrl: string) => {
    if (
      !previews.current.some((preview) => reportedUrl === preview.props.url) &&
      checkValidDomain(reportedUrl)
    ) {
      const previewConfig = {
        title: "This is an example of a title",
        isLoading: false,
        url: reportedUrl,
        image: undefined,
        description:
          "Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?",
      };
      const preview = (
        <EditorLinkPreview
          onClose={(urlString) => removeUrl(urlString)}
          {...previewConfig}
        />
      );
      previews.current.push(preview);
    }
  };
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        previews={previews.current}
        onLinkAdded={addUrl}
      />
    </Box>
  );
};
WithLinkPreviews.storyName = "With Link Previews";

export const Required: Story = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("Some initial content"),
    ),
  );
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        required
      />
    </Box>
  );
};

Required.storyName = "Required";

export const IsOptional = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("Some initial content"),
    ),
  );
  return (
    <Box padding={1}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        isOptional
      />
    </Box>
  );
};
IsOptional.storyName = "IsOptional";
