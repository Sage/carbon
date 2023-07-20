import React, { useState, useRef } from "react";

import TextEditor, {
  TextEditorState as EditorState,
  TextEditorContentState as ContentState,
} from "./text-editor.component";
import Button from "../button";
import EditorLinkPreview from "../link-preview";

export const Default = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
      />
    </div>
  );
};

Default.storyName = "default";

export const WithContent = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(
      ContentState.createFromText("Some initial content")
    )
  );
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        required
      />
    </div>
  );
};

WithContent.storyName = "with content";

export const WithOptionalButtons = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  const ref = useRef(null);
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        toolbarElements={[
          <Button key="cancel button" buttonType="tertiary" onClick={() => {}}>
            Cancel
          </Button>,
          <Button
            key="save button"
            buttonType="primary"
            type="button"
            onClick={() => {}}
            ml={2}
          >
            Save
          </Button>,
        ]}
        labelText="Text Editor Label"
      />
    </div>
  );
};

WithOptionalButtons.storyName = "with optional buttons";

export const WithUserDefinedCharacterLimit = () => {
  const [value, setValue] = useState(EditorState.createEmpty());
  const limit = 100;
  const ref = useRef(null);
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        characterLimit={limit}
      />
    </div>
  );
};

WithUserDefinedCharacterLimit.storyName = "with optional character limit";

export const WithValidation = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content"))
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  const ref = useRef(null);
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={limit - contentLength <= 5 ? "There is an error" : undefined}
        warning={
          limit - contentLength <= 10 ? "There is an warning" : undefined
        }
        info={limit - contentLength <= 15 ? "There is an info" : undefined}
      />
    </div>
  );
};

WithValidation.storyName = "with validation";

export const WithMultilineValidation = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("Add content"))
  );
  const limit = 16;
  const contentLength = value.getCurrentContent().getPlainText().length;
  const ref = useRef(null);
  const error =
    limit - contentLength <= 5
      ? `There is an error.
The content is too long.
Maybe try writing a little bit less?`
      : undefined;
  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        ref={ref}
        labelText="Text Editor Label"
        characterLimit={limit}
        error={error}
      />
    </div>
  );
};

WithMultilineValidation.storyName = "with multiline validation";

export const WithCustomRowHeight = () => {
  const [value, setValue] = useState(EditorState.createEmpty());

  return (
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        rows={2}
      />
    </div>
  );
};

WithCustomRowHeight.storyName = "with custom row height";

export const WithLinkPreviews = () => {
  const [value, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText("www.sage.com"))
  );
  const previews = useRef<React.JSX.Element[]>([]);
  const removeUrl = (reportedUrl: string | undefined) => {
    previews.current = previews.current.filter(
      (preview) => reportedUrl !== preview.props.url
    );
  };
  previews.current.push(
    <EditorLinkPreview
      onClose={(urlString) => removeUrl(urlString)}
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
      key="key - 1"
    />
  );
  const checkValidDomain = (url: string) => {
    const domainsWhitelist = [".com", ".co.uk", ".org", ".net"];
    const result = domainsWhitelist.filter((domain) => url.endsWith(domain))
      .length;
    return !!result;
  };
  const addUrl = (reportedUrl: string) => {
    if (
      !previews.current.filter((preview) => reportedUrl === preview.props.url)
        .length &&
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
    <div style={{ padding: "4px" }}>
      <TextEditor
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
        labelText="Text Editor Label"
        required
        previews={previews.current}
        onLinkAdded={addUrl}
      />
    </div>
  );
};
