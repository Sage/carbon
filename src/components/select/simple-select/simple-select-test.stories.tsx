import React, { useState, useRef } from "react";
import Typography from "../../../components/typography";
import Content from "../../../components/content";
import { Select as SimpleSelect } from "../../../../src/components/select";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Box from "../../box";
import Icon from "../../icon";
import Dialog from "../../dialog";
import { Select, Option, SimpleSelectProps } from "..";

export default {
  component: Select,
  title: "Select/Test",
  excludeStories: [""],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    value: { table: { disable: true }, control: false },
    defaultValue: { table: { disable: true }, control: false },
    children: { table: { disable: true }, control: false },
    openOnFocus: { table: { disable: true }, control: false },
    transparent: { table: { disable: true }, control: false },
    tableHeader: { table: { disable: true }, control: false },
    multiColumn: { table: { disable: true }, control: false },
    isLoading: { table: { disable: true }, control: false },
    onListScrollBottom: { table: { disable: true }, control: false },
    tooltipPosition: { table: { disable: true }, control: false },
    "data-component": { table: { disable: true }, control: false },
    "data-element": { table: { disable: true }, control: false },
    "data-role": { table: { disable: true }, control: false },
    listPlacement: {
      options: ["bottom", "top"],
      control: {
        type: "select",
      },
    },
    onOpen: {
      action: "onOpen",
      table: { disable: true },
      control: false,
    },
    onChange: {
      action: "onChange",
      table: { disable: true },
      control: false,
    },
    onClick: {
      action: "onClick",
      table: { disable: true },
      control: false,
    },
    onFocus: {
      action: "onFocus",
      table: { disable: true },
      control: false,
    },
    onBlur: {
      action: "onBlur",
      table: { disable: true },
      control: false,
    },
    onKeyDown: {
      action: "onKeyDown",
      table: { disable: true },
      control: false,
    },
  },
};

export const Default = (args: SimpleSelectProps) => {
  return (
    <Box width={400}>
      <Select name="simple" id="simple" label="label" labelInline {...args}>
        <Option
          text="Like a lot of intelligent animals, most crows are quite social. 
          For instance, American crows spend most of the year living in pairs or small family groups.
          During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night."
          value="1"
        />
      </Select>
    </Box>
  );
};

Default.storyName = "default";
Default.args = {
  mt: 0,
  listPlacement: undefined,
  flipEnabled: true,
};

export const DelayedReposition = () => {
  const [displayContent, setDisplayContent] = useState(false);

  const onOpenWithTimeOut = () => {
    setTimeout(() => {
      setDisplayContent(!displayContent);
    }, 500);
  };

  const onOpen = () => {
    setDisplayContent(!displayContent);
  };
  return (
    <Dialog size="medium" open title="Title">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        margin="25px"
      >
        <Box width="50%">
          <Select
            label="noTimeOut"
            name="noTimeOut"
            id="noTimeOut"
            onOpen={onOpen}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
        </Box>
        <Box width="50%">
          <Select
            label="timeOut"
            name="timeOut"
            id="timeOut"
            onOpen={onOpenWithTimeOut}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
        </Box>
      </Box>
      {displayContent && (
        <Box mb={1} display="flex" alignItems="center">
          <Icon type="error" color="errorRed" />
          Error displayed
        </Box>
      )}
    </Dialog>
  );
};

DelayedReposition.storyName = "delayed reposition";

export const SimpleSelectComponent = (props: Partial<SimpleSelectProps>) => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      label="simple select"
      labelInline
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option
        text="Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night"
        value="8"
      />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

export const SimpleSelectWithLazyLoadingComponent = (
  props: Partial<SimpleSelectProps>
) => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState("black");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = useState([
    <Option text="Black" value="black" key="Black" />,
  ]);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }

  return (
    <SimpleSelect
      name="isLoading"
      id="isLoading"
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </SimpleSelect>
  );
};

export const SimpleSelectWithInfiniteScrollComponent = (
  props: Partial<SimpleSelectProps>
) => {
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];

  const getLazyLoaded = () => {
    const counter = lazyLoadingCounter.current;
    return [
      <Option
        text={`Lazy Loaded A${counter}`}
        value={`lazyA${counter}`}
        key={`lazyA${counter}`}
      />,
      <Option
        text={`Lazy Loaded B${counter}`}
        value={`lazyB${counter}`}
        key={`lazyB${counter}`}
      />,
      <Option
        text={`Lazy Loaded C${counter}`}
        value={`lazyC${counter}`}
        key={`lazyC${counter}`}
      />,
    ];
  };

  const [optionList, setOptionList] = useState([
    <Option text="" value="" key="" />,
  ]);
  useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function loadList() {
    if (preventLoading.current) {
      return;
    }

    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }

  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }

    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setIsLoading(false);
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
    }, 2000);
  }

  return (
    <SimpleSelect
      name="infiniteScroll"
      id="infiniteScroll"
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      onListScrollBottom={onLazyLoading}
      {...props}
    >
      {optionList}
    </SimpleSelect>
  );
};

export const SimpleSelectObjectAsValueComponent = (
  props: Partial<SimpleSelectProps>
) => {
  const optionListValues = [
    { id: "Amber", value: 1, text: "Amber" },
    { id: "Black", value: 2, text: "Black" },
    { id: "Blue", value: 3, text: "Blue" },
    { id: "Brown", value: 4, text: "Brown" },
    { id: "Green", value: 5, text: "Green" },
    { id: "Orange", value: 6, text: "Orange" },
    { id: "Pink", value: 7, text: "Pink" },
    { id: "Purple", value: 8, text: "Purple" },
    { id: "Red", value: 9, text: "Red" },
    { id: "White", value: 10, text: "White" },
    { id: "Yellow", value: 11, text: "Yellow" },
  ];

  const [value, setValue] = useState<Record<string, unknown>>(
    optionListValues[4]
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue((event.target.value as unknown) as Record<string, unknown>);
  }
  return (
    <SimpleSelect
      id="withObject"
      name="withObject"
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </SimpleSelect>
  );
};

export const SimpleSelectMultipleColumnsComponent = (
  props: Partial<SimpleSelectProps>
) => {
  return (
    <SimpleSelect
      name="withMultipleColumns"
      id="withMultipleColumns"
      multiColumn
      defaultValue="2"
      {...props}
      tableHeader={
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Occupation</th>
        </tr>
      }
    >
      <OptionRow id="1" value="1" text="John Doe">
        <td>John</td>
        <td>Doe</td>
        <td>Welder</td>
      </OptionRow>
      <OptionRow id="2" value="2" text="Joe Vick">
        <td>Joe</td>
        <td>Vick</td>
        <td>Accountant</td>
      </OptionRow>
      <OptionRow
        id="3"
        value="3"
        text="Jane Poe"
        data-component="option-row"
        data-role="option-row"
        data-element="option-row"
      >
        <td>Jane</td>
        <td>Poe</td>
        <td>Accountant</td>
      </OptionRow>
      <OptionRow id="4" value="4" text="Jill Moe">
        <td>Jill</td>
        <td>Moe</td>
        <td>Engineer</td>
      </OptionRow>
      <OptionRow id="5" value="5" text="Bill Zoe">
        <td>Bill</td>
        <td>Zoe</td>
        <td>Astronaut</td>
      </OptionRow>
    </SimpleSelect>
  );
};

export const SimpleSelectCustomOptionChildrenComponent = (
  props: Partial<SimpleSelectProps>
) => {
  return (
    <SimpleSelect
      name="customOptionChildren"
      id="customOptionChildren"
      defaultValue="4"
      label="Pick your favourite color"
      {...props}
    >
      <Option
        id="option1"
        text="Orange"
        value="1"
        data-component="option"
        data-role="option"
        data-element="option"
      >
        <Icon type="favourite" color="orange" mr={1} /> Orange
      </Option>
      <Option id="option2" text="Black" value="2">
        <Icon type="money_bag" color="black" mr={1} /> Black
      </Option>
      <Option id="option3" text="Blue" value="3">
        <Icon type="gift" color="blue" mr={1} /> Blue
      </Option>
    </SimpleSelect>
  );
};

export const SimpleSelectGroupComponent = (
  props: Partial<SimpleSelectProps>
) => {
  return (
    <SimpleSelect name="optGroups" id="optGroups" {...props}>
      <OptionGroupHeader
        id="groupHeader1"
        label="Group one"
        icon="individual"
        data-component="group-header"
        data-role="group-header"
        data-element="group-header"
      />
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <OptionGroupHeader id="groupHeader2" label="Group two" icon="shop" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <OptionGroupHeader id="groupHeader3" label="Group three" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

export const SimpleSelectEventsComponent = ({
  onChange,
  ...props
}: Partial<SimpleSelectProps>) => {
  const [state, setState] = useState("");

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <SimpleSelect
      label="color"
      value={state}
      labelInline
      onChange={setValue}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

export const SimpleSelectWithLongWrappingTextComponent = () => (
  <Box width={400}>
    <SimpleSelect name="simple" id="simple" label="label" labelInline>
      <Option
        text="Like a lot of intelligent animals, most crows are quite social. 
        For instance, American crows spend most of the year living in pairs or small family groups.
        During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night."
        value="1"
      />
    </SimpleSelect>
  </Box>
);

export const SimpleSelectWithManyOptionsAndVirtualScrolling = () => (
  <SimpleSelect
    name="virtualised"
    id="virtualised"
    label="choose an option"
    labelInline
    enableVirtualScroll
    virtualScrollOverscan={10}
  >
    {Array(10000)
      .fill(undefined)
      .map((_, index) => (
        <Option
          key={`option-${index + 1}`}
          value={`${index}`}
          text={`Option ${index + 1}.`}
        />
      ))}
  </SimpleSelect>
);

export const SimpleSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <SimpleSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </SimpleSelect>
    </Dialog>
  );
};

export const SelectWithOptionGroupHeader = () => {
  const reportGroup = [
    { id: 1, title: "There are 2 more options", content: "content" },
    { id: 2, title: "There is 1 more below", content: "content" },
    {
      id: 3,
      title: "This is the last",
      content: "content",
    },
  ];
  return (
    <Box p={10}>
      <Select placeholder="Scroll does not reach the last option">
        <OptionGroupHeader label="Scroll does not reach the last option" />
        {reportGroup.map(({ id, title, content }) => {
          return (
            <Option key={id} value={title} tabIndex={0} text={title}>
              <Content title={title}>
                <Typography>{content}</Typography>
              </Content>
            </Option>
          );
        })}
      </Select>
    </Box>
  );
};

SelectWithOptionGroupHeader.storyName = "Select with OptionGroupHeader";
SelectWithOptionGroupHeader.args = {
  mt: 0,
  listPlacement: undefined,
  flipEnabled: true,
};

export const SimpleSelectWithDisabledOption = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Select
      name="testing"
      value={value}
      onChange={onChangeHandler}
      openOnFocus
      label="Test"
      placeholder=" "
    >
      <Option value="1" text="One" />
      <Option value="2" text="Two" disabled />
      <Option value="3" text="Three" />
      <Option value="4" text="Four" />
    </Select>
  );
};

export const SimpleSelectWithTruncatedText = () => {
  const longValueText =
    "Like a lot of intelligent animals, most crows are quite social." +
    "For instance, American crows spend most of the year living in pairs or small family groups." +
    "During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night.";
  const [value, setValue] = useState("1");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Select
      name="testing"
      value={value}
      onChange={onChangeHandler}
      openOnFocus
      label="Test"
      maxWidth="70%"
    >
      <Option value="1" text={longValueText} />
      <Option value="2" text={longValueText} />
    </Select>
  );
};
