import React from "react";
import Box, { BoxProps } from ".";
import Typography from "../typography";
import Button from "../button";

export const Default = (props: Partial<BoxProps>) => {
  return (
    <Box
      m={3}
      p={3}
      width={400}
      height={400}
      data-element="box"
      bg="primary"
      color="white"
      {...props}
    >
      This is some sample text
    </Box>
  );
};

export const BoxComponentMulti = (props: Partial<BoxProps>) => {
  return (
    <div>
      <Box display="flex" data-element="box" bg="blue" {...props}>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxone"
          {...props}
        >
          Supercalifrajilisticexpialidocious Word
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxtwo"
          {...props}
        >
          Box Two Box Two Box Two Box Two Box Two
        </Box>
        <Box
          width="100px"
          height="100px"
          bg="primary"
          color="yellow"
          data-element="boxthree"
          {...props}
        >
          Box Three Box Three Box Three Box Three
        </Box>
      </Box>
    </div>
  );
};

export const Spacing = () => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box height="100px" bg="primary" />
    </Box>
  );
};

export const Position = () => {
  return (
    <Box>
      <Box
        display="inline-block"
        size="350px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
        bg="secondary"
      >
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          top="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
        <Box size="500px" />
        <Box
          width="400px"
          height="80px"
          m={2}
          bg="primary"
          position="sticky"
          bottom="0"
        >
          <Typography color="white">This box has position sticky</Typography>
          <Button buttonType="primary" destructive>
            Button
          </Button>
        </Box>
      </Box>
      <Box size="500px" position="fixed" right="0" bg="primary">
        <Box>
          <Typography color="white">This box has position fixed</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Color = () => {
  return (
    <Box m={3} p={3} bg="secondary">
      <Box width="100px" height="100px" bg="primary" color="yellow">
        This is some sample text
      </Box>
    </Box>
  );
};

export const BoxShadow = () => {
  return (
    <Box m={3} p={3} height="100px" bg="secondary" boxShadow="boxShadow200" />
  );
};

export const Flex = () => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="stretch"
        height="400px"
        m="5px"
      >
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};

export const Gap = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" columnGap={1}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={3}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={4}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={6}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={7}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
        <Box display="flex" flexDirection="column" rowGap={8}>
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
          <Box width="100px" height="100px" bg="primary" />
        </Box>
      </Box>
      <Box display="flex" gap={4}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap={8}>
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
      <Box display="flex" gap="72px">
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
        <Box width="100px" height="100px" bg="primary" />
      </Box>
    </Box>
  );
};

export const Layout = () => {
  return (
    <Box display="block" size="150px" overflow="hidden">
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
      <Box
        width="100px"
        height="100px"
        bg="primary"
        display="inline-block"
        m="5px"
      />
    </Box>
  );
};

export const OverflowWrap = () => {
  return (
    <Box display="inline-flex">
      <div
        style={{
          border: "solid 1px #00815D",
          width: "min-content",
          marginRight: "20px",
        }}
      >
        <Box p={1} overflowWrap="break-word" width="100px">
          WithOverflowWrap
        </Box>
      </div>
      <div style={{ border: "solid 1px #00815D", width: "min-content" }}>
        <Box p={1} width="100px">
          WithoutOverflowWrap
        </Box>
      </div>
    </Box>
  );
};

export const Scroll = () => {
  return (
    <div>
      <Box
        display="inline-block"
        size="150px"
        overflow="auto"
        scrollVariant="light"
        mr="20px"
      >
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
        <Box
          width="100px"
          height="100px"
          bg="primary"
          display="inline-block"
          m="5px"
        />
      </Box>
      <Box backgroundColor="rgb(0, 26, 37)" display="inline-block">
        <Box
          display="inline-block"
          size="150px"
          overflow="auto"
          scrollVariant="dark"
        >
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
          <Box
            width="100px"
            height="100px"
            bg="primary"
            display="inline-block"
            m="5px"
          />
        </Box>
      </Box>
    </div>
  );
};
