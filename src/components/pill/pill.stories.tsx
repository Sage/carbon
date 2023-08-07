import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Pill from ".";
import Button from "../button";
import Box from "../box";

export const Default: ComponentStory<typeof Pill> = () => (
  <Box mb={1}>
    <Pill>default pill</Pill>
  </Box>
);

export const Wrapped: ComponentStory<typeof Pill> = () => (
  <Box mb={1}>
    <Pill maxWidth="55px" wrapText>
      Wrapped pill
    </Pill>
    <Pill ml={1} maxWidth="55px" wrapText>
      Hyphe&shy;nated&shy;pill
    </Pill>
  </Box>
);

export const WithRemoveButton: ComponentStory<typeof Pill> = () => {
  const [isPillVisible, setIsPillVisible] = useState(true);
  const hidePill = () => setIsPillVisible(false);
  const showPill = () => setIsPillVisible(true);
  return (
    <>
      <Button onClick={showPill}>Reset example</Button>
      <Box m={1}>{isPillVisible && <Pill onDelete={hidePill}>Pill</Pill>}</Box>
    </>
  );
};

export const WithCustomRemoveButtonAriaLabel: ComponentStory<
  typeof Pill
> = () => {
  const noop = () => {};
  return (
    <>
      <Pill onDelete={noop} ariaLabelOfRemoveButton="remove green">
        Green
      </Pill>
      <Pill onDelete={noop} ariaLabelOfRemoveButton="remove blue">
        Blue
      </Pill>
    </>
  );
};
WithCustomRemoveButtonAriaLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Status: ComponentStory<typeof Pill> = () => {
  const noop = () => {};
  return (
    <>
      <Box mb={1}>
        <Pill pillRole="status" size="S" mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="S" fill mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="S" onDelete={noop} mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="S" onDelete={noop} fill>
          neutral
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" fill mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" onDelete={noop} mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" onDelete={noop} fill>
          neutral
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" size="L" mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="L" fill mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="L" onDelete={noop} mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="L" onDelete={noop} fill>
          neutral
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" size="XL" mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="XL" fill mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="XL" onDelete={noop} mr={1}>
          neutral
        </Pill>
        <Pill pillRole="status" size="XL" onDelete={noop} fill>
          neutral
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="positive" size="S" mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" size="S" fill mr={1}>
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="S"
          onDelete={noop}
          mr={1}
        >
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="S"
          onDelete={noop}
          fill
        >
          positive
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="positive" mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" fill mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" onDelete={noop} mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" onDelete={noop} fill>
          positive
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="positive" size="L" mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" size="L" fill mr={1}>
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="L"
          onDelete={noop}
          mr={1}
        >
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="L"
          onDelete={noop}
          fill
        >
          positive
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="positive" size="XL" mr={1}>
          positive
        </Pill>
        <Pill pillRole="status" colorVariant="positive" size="XL" fill mr={1}>
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="XL"
          onDelete={noop}
          mr={1}
        >
          positive
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="positive"
          size="XL"
          onDelete={noop}
          fill
        >
          positive
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="negative" size="S" mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" size="S" fill mr={1}>
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="S"
          onDelete={noop}
          mr={1}
        >
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="S"
          onDelete={noop}
          fill
        >
          negative
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="negative" mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" fill mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" onDelete={noop} mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" onDelete={noop} fill>
          negative
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="negative" size="L" mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" size="L" fill mr={1}>
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="L"
          onDelete={noop}
          mr={1}
        >
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="L"
          onDelete={noop}
          fill
        >
          negative
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="negative" size="XL" mr={1}>
          negative
        </Pill>
        <Pill pillRole="status" colorVariant="negative" size="XL" fill mr={1}>
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="XL"
          onDelete={noop}
          mr={1}
        >
          negative
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="negative"
          size="XL"
          onDelete={noop}
          fill
        >
          negative
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="warning" size="S" mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" size="S" fill mr={1}>
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="S"
          onDelete={noop}
          mr={1}
        >
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="S"
          onDelete={noop}
          fill
        >
          warning
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="warning" mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" fill mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" onDelete={noop} mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" onDelete={noop} fill>
          warning
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill pillRole="status" colorVariant="warning" size="L" mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" size="L" fill mr={1}>
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="L"
          onDelete={noop}
          mr={1}
        >
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="L"
          onDelete={noop}
          fill
        >
          warning
        </Pill>
      </Box>
      <Box>
        <Pill pillRole="status" colorVariant="warning" size="XL" mr={1}>
          warning
        </Pill>
        <Pill pillRole="status" colorVariant="warning" size="XL" fill mr={1}>
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="XL"
          onDelete={noop}
          mr={1}
        >
          warning
        </Pill>
        <Pill
          pillRole="status"
          colorVariant="warning"
          size="XL"
          onDelete={noop}
          fill
        >
          warning
        </Pill>
      </Box>
    </>
  );
};

export const Tag: ComponentStory<typeof Pill> = () => {
  const noop = () => {};
  return (
    <>
      <Box mb={1}>
        <Pill size="S" mr={1}>
          tag
        </Pill>
        <Pill size="S" fill mr={1}>
          tag
        </Pill>
        <Pill size="S" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="S" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill mr={1}>tag</Pill>
        <Pill fill mr={1}>
          tag
        </Pill>
        <Pill onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill size="L" mr={1}>
          tag
        </Pill>
        <Pill size="L" fill mr={1}>
          tag
        </Pill>
        <Pill size="L" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="L" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box>
        <Pill size="XL" mr={1}>
          tag
        </Pill>
        <Pill size="XL" fill mr={1}>
          tag
        </Pill>
        <Pill size="XL" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="XL" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
    </>
  );
};

export const CustomColors: ComponentStory<typeof Pill> = () => {
  const noop = () => {};
  return (
    <>
      <Box mb={1}>
        <Pill borderColor="--colorsSemanticCaution500" mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="--colorsSemanticCaution500" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="blackOpacity65" mr={1}>
          tag
        </Pill>
        <Pill borderColor="blackOpacity65" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="blackOpacity65" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="blackOpacity65" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="brilliantGreenShade20" mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="brilliantGreenShade20" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="red" mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="red" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill borderColor="#123456" mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="#123456" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box>
        <Pill borderColor="rgb(0, 123, 10)" mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" fill mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill borderColor="rgb(0, 123, 10)" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
    </>
  );
};
CustomColors.parameters = { chromatic: { disableSnapshot: true } };
