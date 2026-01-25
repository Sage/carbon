import { render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { HyperlinkButton } from ".";
// import TestEditor from "../../../TestEditor.component";
// import Dialog from "../../../../../dialog";
// import Form from "../../../../../form";
// import Button from "../../../../../button";
// import Textbox from "../../../../../textbox";

import TextEditor from '../../../../text-editor.component'

// Reusable JSON object for testing the default state
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
            text: "Sample text",
            type: "text",
            version: 1,
          },
        ],
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],

    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

// const HyperlinkDemo = ({
//   firstButtonOverride = false,
//   namespace = "test",
// }: {
//   firstButtonOverride?: boolean;
//   namespace?: string;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [linkText, setLinkText] = useState("");
//   const [linkUrl, setLinkUrl] = useState("");

//   return (
//     <TestEditor>
//       <HyperlinkButton
//         namespace="test"
//         setDialogOpen={setIsOpen}
//         isFirstButton={firstButtonOverride}
//       />
//       <Dialog
//         open={isOpen}
//         onCancel={() => {
//           setLinkText("");
//           setLinkUrl("");
//           setIsOpen(false);
//         }}
//         title={"Add link"}
//         data-role={`${namespace}-hyperlink-dialog`}
//         aria-label={"Add link"}
//         size="small"
//       >
//         <Form
//           leftSideButtons={
//             <Button
//               data-role={`${namespace}-hyperlink-cancel-button`}
//               onClick={() => {
//                 setLinkText("");
//                 setLinkUrl("");
//                 setIsOpen(false);
//               }}
//             >
//               Cancel
//             </Button>
//           }
//           saveButton={
//             <Button
//               buttonType="primary"
//               type="submit"
//               disabled={!linkText || !linkUrl}
//               data-role={`${namespace}-hyperlink-save-button`}
//             >
//               Save
//             </Button>
//           }
//           onSubmit={(e) => {
//             e.preventDefault();

//             setLinkText("");
//             setLinkUrl("");
//             setIsOpen(false);
//           }}
//         >
//           <Textbox
//             label={"Text"}
//             name="text"
//             required
//             data-role={`${namespace}-hyperlink-text-field`}
//             value={linkText}
//             onChange={(e) => setLinkText(e.target.value)}
//           />
//           <Textbox
//             label={"URL"}
//             name="link"
//             required
//             data-role={`${namespace}-hyperlink-link-field`}
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//           />
//         </Form>
//       </Dialog>
//     </TestEditor>
//   );
// };

describe("Hyperlink button", () => {
  it("should render the hyperlink button correctly", () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" />
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveStyleRule("background-color", "transparent");
  });

  it("should render the dialog correctly when the button is clicked", async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" />
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    await userEvent.click(linkButton);
    const dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const dialogContent = within(dialog);
    const title = dialogContent.getByText("Add link");
    expect(title).toBeInTheDocument();

    const input = dialogContent.getAllByRole("textbox");
    expect(input).toHaveLength(2);

    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeInTheDocument();
    const addButton = dialogContent.getByRole("button", { name: "Save" });
    expect(addButton).toBeInTheDocument();
  });

  it("should close the dialog when the cancel button is clicked", async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" />
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    await userEvent.click(linkButton);
    const dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const dialogContent = within(dialog);
    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it(`should focus the hyperlink button when isFirstButton is set to true`, async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" toolbarControls={['link']}/>
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "0");
    await userEvent.tab();
    await userEvent.tab();

    const textbox = screen.getByRole("textbox");

    expect(textbox).toHaveFocus();
  });

  it.skip(`should not focus the hyperlink button when isFirstButton is set to false`, async () => {
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" toolbarControls={['bold', 'link']}/>
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();

    expect(linkButton).toHaveAttribute("tabindex", "-1");
    await userEvent.tab();
    await userEvent.tab();

    expect(linkButton).not.toHaveFocus();
  }); 

  it.skip(`should not persist data between modals when the close button is pressed`, async () => {
    const user = userEvent.setup({delay: null})

    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" initialValue={JSON.stringify(initialValue)}/>
    );
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await user.click(linkButton);

    let dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    let dialogContent = within(dialog);

    const textInput = dialogContent.getAllByRole("textbox")[0];
    const urlInput = dialogContent.getAllByRole("textbox")[1];

    await user.type(urlInput, "https://carbon.sage.com");

    await user.type(textInput, "Carbon");

    const cancelButton = dialogContent.getByRole("button", {
      name: "Cancel",
    });

    await user.click(cancelButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    await user.click(linkButton);

    dialog = screen.getByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    dialogContent = within(dialog);

    const newTextInput = dialogContent.getAllByRole("textbox")[0];
    const newUrlInput = dialogContent.getAllByRole("textbox")[1];

    expect(newUrlInput).toHaveValue("");
    expect(newTextInput).toHaveValue("");
  });

  it.skip(`should not persist data between modals when the ESC key is pressed`, async () => {
    const user = userEvent.setup({delay: null});

    render(<TextEditor labelText="Test Editor" namespace="test-rte" initialValue={JSON.stringify(initialValue)}/>);
    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await userEvent.click(linkButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const dialogContent = within(dialog);
    
    const urlInput = dialogContent.getAllByRole("textbox")[1];

    // await waitFor(async () => {
      // await user.click(urlInput)
      await user.type(urlInput, "https://carbon.sage.com");
    // });

    // await act(async () => {
    //   await user.click(urlInput)
    //   await user.keyboard("https://carbon.sage.com");

    // })
    
    await waitFor(() =>
      expect(urlInput).toHaveValue("https://carbon.sage.com"),
    );
    
    // const textInput = dialogContent.getAllByRole("textbox")[0]; 
    // await user.click(textInput);
    // await user.keyboard("Carbon");

    // await waitFor(() =>
    //   expect(textInput).toHaveValue("Carbon"),
    // );

    // await user.keyboard("{Escape}");

    // await waitFor(() =>
    //   expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    // );

    // await user.click(linkButton);

    // const newDialog = screen.getByRole("dialog");

    // await waitFor(() => 
    //   expect(newDialog).toBeInTheDocument(),
    // );

    // const newDialogContent = within(dialog);

    // const newTextInput = newDialogContent.getAllByRole("textbox")[0];
    // const newUrlInput = newDialogContent.getAllByRole("textbox")[1];

    // await waitFor(() =>
    //   expect(newUrlInput).toHaveValue(""),
    //   {timeout: 2000}
    // );

    // expect(newUrlInput).toHaveValue("");
    // expect(newTextInput).toHaveValue("");
  });

  it("should submit the form when the save button is clicked", async () => {
    const user = userEvent.setup();
    
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" initialValue={JSON.stringify(initialValue)}/>
    );

    const editor = screen.getByRole("textbox");

    await user.tripleClick(editor);

    await user.type(editor, "Hello");

    await user.tripleClick(editor);

    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    expect(linkButton).toBeInTheDocument();
    await user.click(linkButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const dialogContent = within(dialog);

    const textInput = dialogContent.getByLabelText("Text");
    const urlInput = dialogContent.getByLabelText("Link");

    await user.click(urlInput);
    await user.paste("https://carbon.sage.com");

    await user.click(textInput);
    await user.paste("Carbon");

    await waitFor(() =>
      expect(urlInput).toHaveValue("https://carbon.sage.com"),
    );
    await waitFor(() => expect(textInput).toHaveValue("Carbon"));

    const saveButton = dialogContent.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("should add a URL to the editor", async () => {
    const user = userEvent.setup();
    render(
      <TextEditor labelText="Test Editor" namespace="test-rte" initialValue={JSON.stringify(initialValue)}/>
    );

    const editor = screen.getByRole("textbox");

    await user.click(editor);
    await user.tripleClick(editor);
    await user.keyboard("Hello");
    await user.tripleClick(editor);

    const linkButton = screen.getByTestId(`test-rte-hyperlink-button`);
    await user.click(linkButton);

    
    const dialog = await screen.findByRole("dialog");

    await waitFor(() => {
      expect(dialog).toBeInTheDocument();
    });

    const dialogContent = within(dialog);
    
    const textInput = await dialogContent.findByLabelText("Text");
    const urlInput = await dialogContent.findByLabelText("Link");

    await user.click(urlInput);
    await user.paste("https://carbon.sage.com");
    await user.click(textInput);
    await user.paste("Carbon");

    // Wait for the values to be set
    await waitFor(() => {
      expect(urlInput).toHaveValue("https://carbon.sage.com");
    });
    
    await waitFor(() => {
      expect(textInput).toHaveValue("Carbon");
    });

    const saveButton = dialogContent.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("defaults isFirstButton to false when rendered with LexicalComposer", () => {
    const initialConfig = {
      namespace: "test-bold-composer",
      nodes: [],
      onError: () => {},
    };

    render(
      <LexicalComposer initialConfig={initialConfig}>
        <HyperlinkButton namespace="test-bold-composer" setDialogOpen={() => {}}/>
      </LexicalComposer>,
    );

    const hyperlinkButton = screen.getByRole("button", { name: "Hyperlink" });
    expect(hyperlinkButton).toHaveAttribute("tabindex", "-1");
  });
});