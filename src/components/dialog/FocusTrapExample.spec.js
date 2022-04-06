import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../form";
import Textbox from "../textbox";
import { Select, Option } from "../select";
import Dialog from ".";

test("Focus trap issue", () => {
  render(
    <Dialog open>
      <Form>
        <Textbox id="552c29ad-6058-4e80-9460-4c5c6a696dc2" label="Email" />
        <Select id="c0499f86-d5a7-4a72-a0b7-753a2d218c54" label="the dropdown">
          <Option value="1" text="Option 1" />
        </Select>
      </Form>
    </Dialog>
  );
  userEvent.click(screen.getByRole("combobox", { name: "the dropdown" }));
  userEvent.click(screen.getByRole("option", { name: "Option 1" }));
});
