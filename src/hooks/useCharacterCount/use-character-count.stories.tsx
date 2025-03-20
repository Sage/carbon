import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import useCharacterCount from "./useCharacterCount";
import Textbox from "../../components/textbox";
import Textarea from "../../components/textarea";

/**
 * This file is used primarily as a means to generate the props table and examples.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta = {
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    value: {
      type: { name: "string", required: true },
      description: "The value of the input the character count is applied to.",
    },
    characterLimit: {
      type: "number",
      description: "The character limit of the input.",
    },
    characterCountAriaLive: {
      table: {
        type: { summary: '"off" | "polite"' },
      },
      description:
        "Set the value of the aria-live attribute on the character count element.",
    },
  },
};

export default meta;

export const WithTextbox: StoryObj = () => {
  const [value, setValue] = useState("");
  const [characterCount, characterCountId] = useCharacterCount(
    value,
    50,
    "polite",
  );

  return (
    <>
      <Textbox
        label="Textbox with character count"
        inputHint="Input hint"
        aria-describedby={characterCountId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {characterCount}
    </>
  );
};
WithTextbox.storyName = "With Textbox";

export const WithTextarea: StoryObj = () => {
  const [value, setValue] = useState("");
  const [characterCount, characterCountId] = useCharacterCount(
    value,
    50,
    "polite",
  );

  return (
    <>
      <Textarea
        label="Textarea with character count"
        inputHint="Input hint"
        aria-describedby={characterCountId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {characterCount}
    </>
  );
};
WithTextarea.storyName = "With Textarea";
