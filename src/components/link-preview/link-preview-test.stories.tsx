import React from "react";
import { action } from "storybook/actions";

import LinkPreview from "./link-preview.component";

export default {
  title: "Link Preview/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = () => (
  <LinkPreview
    as="div"
    onClose={(url) => action("close icon clicked")(url)}
    title="This is an example of a title"
    url="https://www.sage.com"
    description="Captain, why are we out here chasing comets? I'd like to think that I haven't changed those things, sir. Computer, lights up! Not if I weaken first. Damage report! Yesterday I did not know how to eat gagh. The Federation's gone; the Borg is everywhere! We know you're dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Our neural pathways have become accustomed to your sensory input patterns. Wouldn't that bring about chaos?"
  />
);

Default.storyName = "default";
