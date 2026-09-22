import React from "react";
import Dl, { DlProps } from "./dl.component";
import Dt from "./dt/dt.component";
import Dd from "./dd/dd.component";
import Typography from "../typography";
import Box from "../box";
import Divider from "../divider";
import Link from "../link";
import Pill from "../pill";
import Button from "../button/__next__";
import { Tile } from "../tile";

export default {
  title: "Definition-list/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = (props: DlProps) => {
  return (
    <Dl {...props}>
      <Dt>First</Dt>
      <Dd>Description</Dd>
      <Dt>Second</Dt>
      <Dd>Description</Dd>
      <Dt>Third</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};

DefaultStory.story = {
  name: "default",
  args: {
    children: "This is an example of a Definition-list",
    w: 50,
    dtTextAlign: "right",
    ddTextAlign: "left",
    asSingleColumn: false,
  },
};

export const TextOverflowExamples = () => {
  const pairs = (
    <>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <Dt>Resize term text layers equally, as required</Dt>
      <Dd>
        Description text fills available space, but can be resized if needed
      </Dd>
      <Dt>Customize term-description pairs:</Dt>
      <Dd>
        Each term-desc. pair layer includes properties to control vertical
        spacing, additional elements, and divider
      </Dd>
      <Dt>Term-description pair height</Dt>
      <Dd>The term-desc. pair layer height automatically hugs the contents</Dd>
      <Dt>Add more pairs:</Dt>
      <Dd>
        Copy and paste a term-desc. pair layer to add more to the list. Pairs
        can be re-ordered by dragging.
      </Dd>
    </>
  );

  return (
    <Box display="flex" gap={6}>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl divider>{pairs}</Dl>
      </Box>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl asSingleColumn divider>
          {pairs}
        </Dl>
      </Box>
    </Box>
  );
};

export const TextOverflowWithLinks = () => {
  const pairs = (
    <>
      <Dt>Term</Dt>
      <Dd rightChildren={<Link href="#">View details</Link>}>Description</Dd>
      <Dt>Resize term text layers equally, as required</Dt>
      <Dd rightChildren={<Link href="#">View details</Link>}>
        Description text fills available space, but can be resized if needed
      </Dd>
      <Dt>Customize term-description pairs:</Dt>
      <Dd rightChildren={<Link href="#">View details</Link>}>
        Each term-desc. pair layer includes properties to control vertical
        spacing, additional elements, and divider
      </Dd>
      <Dt>Term-description pair height</Dt>
      <Dd rightChildren={<Link href="#">View details</Link>}>
        The term-desc. pair layer height automatically hugs the contents
      </Dd>
      <Dt>Add more pairs:</Dt>
      <Dd rightChildren={<Link href="#">View details</Link>}>
        Copy and paste a term-desc. pair layer to add more to the list. Pairs
        can be re-ordered by dragging.
      </Dd>
    </>
  );

  return (
    <Box display="flex" gap={6}>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl divider>{pairs}</Dl>
      </Box>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl asSingleColumn divider>
          {pairs}
        </Dl>
      </Box>
    </Box>
  );
};

export const TextOverflowWithButtonsAndPills = () => {
  const pairs = (
    <>
      <Dt>Term</Dt>
      <Dd rightChildren={<Pill>Manage</Pill>}>Description</Dd>
      <Dt>Resize term text layers equally, as required</Dt>
      <Dd
        rightChildren={
          <Button variantType="secondary" size="small">
            Edit
          </Button>
        }
      >
        Description text fills available space, but can be resized if needed
      </Dd>
      <Dt>Customize term-description pairs:</Dt>
      <Dd rightChildren={<Pill>Pending</Pill>}>
        Each term-desc. pair layer includes properties to control vertical
        spacing, additional elements, and divider
      </Dd>
      <Dt>Term-description pair height</Dt>
      <Dd
        rightChildren={
          <Button variantType="secondary" size="small">
            Manage
          </Button>
        }
      >
        The term-desc. pair layer height automatically hugs the contents
      </Dd>
      <Dt>Add more pairs:</Dt>
      <Dd rightChildren={<Pill>Available</Pill>}>
        Copy and paste a term-desc. pair layer to add more to the list. Pairs
        can be re-ordered by dragging.
      </Dd>
    </>
  );

  return (
    <Box display="flex" gap={6}>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl divider>{pairs}</Dl>
      </Box>
      <Box flex="1 1 0" width="368px">
        <Typography variant="h3" mb={2}>
          Section title
        </Typography>
        <Divider type="horizontal" />
        <Dl asSingleColumn divider>
          {pairs}
        </Dl>
      </Box>
    </Box>
  );
};

export const TextAlignExamples = () => {
  return (
    <>
      {(["left", "center", "right"] as const).map((textAlignValue) => {
        return (
          <Dl
            dtTextAlign={textAlignValue}
            ddTextAlign={textAlignValue}
            key={textAlignValue}
          >
            <Dt>Title</Dt>
            <Dd>Description</Dd>
          </Dl>
        );
      })}
    </>
  );
};

TextAlignExamples.parameters = {
  chromatic: { disableSnapshot: false },
};

export const SpacingExamples = () => {
  const pairs = (
    <>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
    </>
  );

  return (
    <Box display="flex" flexWrap="wrap" gap={6}>
      {(["small", "medium"] as const).map((spacingValue) =>
        [false, true].map((divider) =>
          [false, true].map((asSingleColumn) => (
            <Tile
              key={`${spacingValue}-${divider}-${asSingleColumn}`}
              width="368px"
            >
              <Dl
                spacing={spacingValue}
                divider={divider}
                asSingleColumn={asSingleColumn}
              >
                {pairs}
              </Dl>
            </Tile>
          )),
        ),
      )}
    </Box>
  );
};

SpacingExamples.parameters = {
  chromatic: { disableSnapshot: false },
};

export const CustomSpacingStylingDt = () => {
  return (
    <Dl>
      <Dt mb={4} pr={2}>
        Title
      </Dt>
      <Dd>Description</Dd>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};

export const AsSingleColumnCustomDtStyling = () => {
  return (
    <Box width="max-content">
      <Dl asSingleColumn>
        <Dt mb={3} pr={5}>
          Title
        </Dt>
        <Dd>Description</Dd>
        <Dt>Title</Dt>
        <Dd>Description</Dd>
      </Dl>
    </Box>
  );
};

export const customWidthExample = () => {
  return (
    <Dl w={45}>
      <Dt>Title</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};

customWidthExample.parameters = {
  chromatic: { disableSnapshot: false },
};
