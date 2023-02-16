import React from "react";
import Link from ".";
import Box from "../box";
import { Menu, MenuItem } from "../menu";
import Typography from "../typography";

export const DefaultStory = () => (
  <Link
    href="https://carbon.sage.com"
    target="_blank"
    rel="noreferrer noopener"
  >
    This is a link
  </Link>
);

export const WithDisabled = () => (
  <Link disabled>This is a disabled anchor link</Link>
);

export const WithIcon = () => (
  <Link icon="settings" href="#foo">
    This is a link
  </Link>
);

WithIcon.parameters = { chromatic: { disable: true } };

export const WithIconAlign = () => {
  return (["left", "right"] as const).map((align) => (
    <Box key={align} m="64px">
      <Link icon="settings" iconAlign={align} href="#foo">
        This is a link
      </Link>
    </Box>
  ));
};

export const WithTooltip = () => (
  <Box m="64px">
    <Link
      icon="settings"
      tooltipMessage="This is a tooltip message"
      href="#foo"
    >
      This is a link
    </Link>
  </Box>
);

WithTooltip.parameters = { chromatic: { disable: true } };

export const WithIsSkipLink = () => (
  <>
    <Link href="#main-content" isSkipLink />
    <Menu>
      <MenuItem href="#">Menu Item 1</MenuItem>
      <MenuItem href="#">Menu Item 2</MenuItem>
      <MenuItem href="#">Menu Item 3</MenuItem>
      <MenuItem href="#">Menu Item 4</MenuItem>
      <MenuItem href="#">Menu Item 5</MenuItem>
    </Menu>
    <Box py={2} id="main-content">
      <Typography mb={1} variant="h1">
        {" "}
        This is header of main content container{" "}
      </Typography>
      <Typography variant="p">
        Laborum anim magna pariatur ea mollit elit cillum exercitation irure
        consectetur. Lorem qui dolor reprehenderit reprehenderit ut ad. Esse
        magna aliquip ea culpa nulla laborum deserunt cupidatat ullamco fugiat
        in enim. Sunt velit tempor anim occaecat. Culpa ut consectetur sunt
        tempor eu est deserunt veniam. Voluptate commodo consequat ipsum aliquip
        elit aute pariatur occaecat eiusmod culpa dolore voluptate Lorem
        commodo. Consectetur anim exercitation esse irure est amet adipisicing
        cupidatat laborum non commodo id. Ex id nostrud aute deserunt. Qui non
        aute ea eu commodo anim labore dolor minim enim cillum eiusmod commodo
        ipsum. Consectetur ipsum consectetur Lorem tempor proident cillum eu
        minim. Adipisicing in nostrud sit Lorem ex aute tempor aliquip aute.
        Duis dolore laboris labore exercitation enim dolore anim occaecat anim
        laboris dolor ut. Lorem ullamco adipisicing duis aute non minim.
        Adipisicing consequat labore non aliquip anim.
      </Typography>
      <Link href="https://carbon.sage.com">Carbon Page</Link>
    </Box>
  </>
);

WithIsSkipLink.parameters = { chromatic: { disable: true } };

export const WithOnClick = () => (
  <Link onClick={() => {}}>
    This is actually a button but looks like a link
  </Link>
);

WithOnClick.parameters = { chromatic: { disable: true } };

export const Variants = () => (
  <Box display="flex" flexDirection="column" gap="20px">
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
      variant="negative"
    >
      This is a link
    </Link>
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
      variant="neutral"
    >
      This is a link
    </Link>
  </Box>
);

export const OnADarkBackground = () => (
  <Box
    backgroundColor="var(--colorsYin100)"
    width="max-content"
    p="20px 10px"
    display="flex"
    flexDirection="column"
    gap="20px"
    alignItems="center"
  >
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
      isDarkBackground
    >
      This is a link
    </Link>
    {(["left", "right"] as const).map((align) => (
      <React.Fragment key={`${align}-default-variant`}>
        <Link icon="settings" isDarkBackground iconAlign={align} href="#foo">
          This is a link
        </Link>
      </React.Fragment>
    ))}
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
      isDarkBackground
      variant="negative"
    >
      This is a link
    </Link>
    {(["left", "right"] as const).map((align) => (
      <React.Fragment key={`${align}-negative-variant`}>
        <Link
          icon="settings"
          isDarkBackground
          variant="negative"
          iconAlign={align}
          href="#foo"
        >
          This is a link
        </Link>
      </React.Fragment>
    ))}
    <Link
      href="https://carbon.sage.com"
      target="_blank"
      rel="noreferrer noopener"
      isDarkBackground
      variant="neutral"
    >
      This is a link
    </Link>
    {(["left", "right"] as const).map((align) => (
      <React.Fragment key={`${align}-neutral-variant`}>
        <Link
          icon="settings"
          isDarkBackground
          variant="neutral"
          iconAlign={align}
          href="#foo"
        >
          This is a link
        </Link>
      </React.Fragment>
    ))}
    <Link href="#foo" isDarkBackground disabled>
      This is a link
    </Link>
  </Box>
);
