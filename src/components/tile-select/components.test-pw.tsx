import React, { useState } from "react";
import {
  TileSelect,
  TileSelectGroup,
  TileSelectDeselectEvent,
  TileSelectProps,
  TileSelectGroupProps,
} from ".";

import flexibleSvg from "../../../.assets/flexible.svg";

import Pill from "../pill";
import Button from "../button";
import Box from "../box";
import Image from "../image";
import { CHARACTERS } from "../../../playwright/support/constants";
import Icon from "../icon";
import Typography from "../typography";

export const TileSelectComponent = ({
  multiSelect,
  ...props
}: Partial<TileSelectProps & TileSelectGroupProps>) => {
  const [value, setValue] = React.useState(false);
  return (
    <TileSelectGroup
      multiSelect={multiSelect}
      name="Tile Select"
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.checked)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
        {...props}
      />
    </TileSelectGroup>
  );
};

export const MultiTileSelectGroupComponent = (
  props: Partial<TileSelectGroupProps>,
) => {
  const [value1, setValue1] = React.useState(false);
  const [value2, setValue2] = React.useState(false);
  const [value3, setValue3] = React.useState(false);
  const [value4, setValue4] = React.useState(false);
  return (
    <TileSelectGroup name="TileSelectGroup" legend="Tile Select" {...props}>
      <TileSelect
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value1}
        onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={value2}
        onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
          />
        }
        description="Short and descriptive description"
        checked={value3}
        onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={value4}
        onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
};

export const AccordionTileSelectComponent = (
  props: Partial<TileSelectProps>,
) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={<Image height="40px" width="40px" />}
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box
            width="100%"
            height="100px"
            bg="primary"
            display="inline-block"
          />
          <Box
            width="100%"
            height="100px"
            bg="primary"
            display="inline-block"
          />
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
      {...props}
    />
  );
};

export const TileSelectGroupComponent = (
  props: Partial<TileSelectGroupProps>,
) => {
  const [value, setValue] = React.useState(false);
  return (
    <TileSelectGroup
      name="Tile Select"
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(
        e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
      ) => setValue(e.target.checked)}
      {...props}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setValue(e.target.checked)}
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title1"
        subtitle="Subtitle1"
        description="Short and descriptive description1"
        checked={value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
        ) => setValue(e.target.checked)}
      />
    </TileSelectGroup>
  );
};

export const PrefixAdornmentComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      prefixAdornment={
        <>
          <Pill fill mr={1} mb="4px">
            {CHARACTERS.DIACRITICS}
          </Pill>
          <Pill fill mr={1} mb="4px">
            {CHARACTERS.SPECIALCHARACTERS}
          </Pill>
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export const WithTitleAdornment = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      titleAdornment={
        <>
          <Icon type="add" />
          <Icon type="info" />
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export const SingleTile = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };

  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export const WithAFooter = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title Short and descriptive description"
      subtitle="Subtitle Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      description="Short and descriptive description"
      footer={
        <Box pt={1} display="flex" alignItems="baseline">
          Here is some &nbsp;
          <Typography variant="strong">footer text</Typography>
          <Button
            ml={1}
            buttonType="tertiary"
            iconPosition="after"
            iconType="home"
          >
            Footer Button
          </Button>
        </Box>
      }
    />
  );
};

export const WithAdditionalInformation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      titleAdornment={<Pill>Message</Pill>}
      description="Short and descriptive description"
      additionalInformation={
        <>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mr={1} mb="4px">
            Further information
          </Pill>
          <Pill fill mb={1}>
            Further information
          </Pill>
        </>
      }
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export const WithAccordionFooter = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => {
    const { value } = e.target;
    setIsChecked(value !== null);
  };
  return (
    <TileSelect
      value="1"
      id="single-1"
      aria-label="single-1"
      name="single"
      title="Title"
      subtitle="Subtitle"
      description="Short and descriptive description"
      checked={isChecked}
      onChange={handleChange}
      prefixAdornment={
        <Image
          height="40px"
          width="40px"
          backgroundImage={`url("${flexibleSvg}")`}
        />
      }
      accordionContent={
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow={1} pr={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
          <Box flexGrow={1} pl={1}>
            <Box
              width="100%"
              height="100px"
              bg="primary"
              display="inline-block"
            />
          </Box>
        </Box>
      }
      accordionControl={(controlId, contentId) => (
        <Button
          buttonType="tertiary"
          iconPosition="before"
          iconType="chevron_down"
          data-element="accordion-button"
          onClick={() => setExpanded((expandedState) => !expandedState)}
          px={1}
          mt={2}
          aria-controls={contentId}
          id={controlId}
        >
          {expanded ? "Close" : "Open"} accordion
        </Button>
      )}
      accordionExpanded={expanded}
    />
  );
};

export const WithCustomSpacing = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
      m={6}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="3"
        id="3"
        aria-label="3"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
      <TileSelect
        value="4"
        id="4"
        aria-label="4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        mt={1}
      />
    </TileSelectGroup>
  );
};

export const WithCustomActionButton = () => {
  const [value, setValue] = useState<string | null>(null);
  const [activated, setActivated] = useState(false);
  const [removed, setRemoved] = useState(false);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            {activated ? "Active" : "Inactive"}
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={
          activated
            ? undefined
            : () => (
                <Button
                  onClick={() => {
                    setValue("1");
                    setActivated(true);
                  }}
                  buttonType="tertiary"
                  type="button"
                  size="small"
                >
                  Reactivate
                </Button>
              )
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          removed ? undefined : (
            <Pill pillRole="status" colorVariant="neutral">
              Active
            </Pill>
          )
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={() => {
              setRemoved(true);
              onClick();
            }}
            buttonType="tertiary"
            type="button"
            size="small"
            destructive
            disabled={removed}
          >
            Remove
          </Button>
        )}
      />
    </TileSelectGroup>
  );
};

export const WithActionButtonAdornment = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <TileSelectGroup
      name="Tile Select"
      value={value}
      legend="Tile Select"
      description="Pick one of the available options"
      onChange={(e) => setValue(e.target.value)}
    >
      <TileSelect
        value="1"
        id="1"
        aria-label="1"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Pill pillRole="status" colorVariant="neutral">
            Inactive
          </Pill>
        }
        description="Short and descriptive description"
        customActionButton={() => (
          <Button
            onClick={() => setValue("1")}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            disabled
          >
            Reactivate
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="info"
            tooltipMessage="This tile cannot be reactivated at this time"
          />
        }
      />
      <TileSelect
        value="2"
        id="2"
        aria-label="2"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        customActionButton={(onClick) => (
          <Button
            onClick={onClick}
            buttonType="tertiary"
            type="button"
            px={1}
            size="small"
            destructive
            disabled
          >
            Reactivate
          </Button>
        )}
        actionButtonAdornment={
          <Icon
            type="add"
            tooltipMessage="This tile cannot be removed at this time"
          />
        }
      />
    </TileSelectGroup>
  );
};
