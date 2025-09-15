import React, { useState, useRef } from "react";
import Typography from "../../../components/typography";
import Content from "../../../components/content";
import {
  Select as SimpleSelect,
  Select,
  Option,
  SimpleSelectProps,
} from "../../../../src/components/select";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Box from "../../box";
import Icon from "../../icon";
import Dialog from "../../dialog";
import CarbonProvider from "../../carbon-provider";
import useMultiInput from "../../../hooks/use-multi-input";

export default {
  component: Select,
  title: "Select/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        "onChange",
        "onChangeDeferred",
        "onListScrollBottom",
        "onOpen",
        "onBlur",
        "onClick",
        "onFocus",
        "onKeyDown",
        "onMouseDown",
        "iconOnClick",
        "iconOnMouseDown",
        "children",
        "value",
        "defaultValue",
        "tableHeader",
        "multiColumn",
        "leftChildren",
        "as",
      ],
    },
  },
  argTypes: {
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    fieldHelp: {
      control: {
        type: "text",
      },
    },
    labelHelp: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (args: SimpleSelectProps) => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      label="simple select"
      {...args}
      value={value}
      onChange={onChangeHandler}
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
Default.storyName = "Default";

export const Validation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <>
      <Select
        name="simple-error"
        id="simple-error"
        label="Simple Select"
        error="Error message"
        mb={2}
        value={state["simple-error"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-warning"
        id="simple-warning"
        label="Simple Select"
        warning="Warning message"
        mb={2}
        value={state["simple-warning"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-info"
        id="simple-info"
        label="Simple Select"
        info="Info message"
        mb={2}
        value={state["simple-info"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>

      <Select
        name="simple-error-vol"
        id="simple-error-vol"
        label="Simple Select"
        error="Error message"
        validationOnLabel
        mb={2}
        value={state["simple-error-vol"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-warning-vol"
        id="simple-warning-vol"
        label="Simple Select"
        warning="Warning message"
        validationOnLabel
        mb={2}
        value={state["simple-warning-vol"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-info-vol"
        id="simple-info-vol"
        label="Simple Select"
        info="Info message"
        validationOnLabel
        mb={2}
        value={state["simple-info-vol"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>

      <Select
        name="simple-error-bool"
        id="simple-error-bool"
        label="Simple Select"
        error
        mb={2}
        value={state["simple-error-bool"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-warning-bool"
        id="simple-warning-bool"
        label="Simple Select"
        warning
        mb={2}
        value={state["simple-warning-bool"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-info-bool"
        id="simple-info-bool"
        label="Simple Select"
        info
        mb={2}
        value={state["simple-info-bool"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const { state, setValue } = useMultiInput();

  return (
    <CarbonProvider validationRedesignOptIn>
      <Select
        name="simple-error"
        id="simple-error"
        label="Simple Select"
        error="Error message"
        inputHint="Hint text"
        mb={2}
        value={state["simple-error"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="simple-warning"
        id="simple-warning"
        label="Simple Select"
        warning="Warning message"
        mb={2}
        value={state["simple-warning"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        validationMessagePositionTop={false}
        name="simple-error-bottom"
        id="simple-error-bottom"
        label="Simple Select"
        error="Error message"
        inputHint="Hint text"
        mb={2}
        value={state["simple-error-bottom"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        validationMessagePositionTop={false}
        name="simple-warning-bottom"
        id="simple-warning-bottom"
        label="Simple Select"
        warning="Warning message"
        mb={2}
        value={state["simple-warning-bottom"] || ""}
        onChange={setValue}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
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
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

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
            value={value}
            onChange={onChangeHandler}
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
            value={value}
            onChange={onChangeHandler}
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

DelayedReposition.storyName = "Delayed Reposition";

export const SimpleSelectWithLazyLoadingComponent = (
  props: Partial<SimpleSelectProps>,
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
  props: Partial<SimpleSelectProps>,
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
  props: Partial<SimpleSelectProps>,
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
    optionListValues[4],
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as Record<string, unknown>);
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
  props: Partial<SimpleSelectProps>,
) => {
  const [value, setValue] = useState("2");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      name="withMultipleColumns"
      id="withMultipleColumns"
      multiColumn
      value={value}
      onChange={onChangeHandler}
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
  props: Partial<SimpleSelectProps>,
) => {
  const [value, setValue] = useState("4");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      name="customOptionChildren"
      id="customOptionChildren"
      value={value}
      onChange={onChangeHandler}
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
  props: Partial<SimpleSelectProps>,
) => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      name="optGroups"
      id="optGroups"
      {...props}
      value={value}
      onChange={onChangeHandler}
    >
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

export const SimpleSelectWithLongWrappingTextComponent = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Box width={400}>
      <SimpleSelect
        name="simple"
        id="simple"
        label="label"
        labelInline
        value={value}
        onChange={onChangeHandler}
      >
        <Option
          text="Like a lot of intelligent animals, most crows are quite social.
        For instance, American crows spend most of the year living in pairs or small family groups.
        During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night."
          value="1"
        />
      </SimpleSelect>
    </Box>
  );
};

export const SimpleSelectWithManyOptionsAndVirtualScrolling = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      name="virtualised"
      id="virtualised"
      label="choose an option"
      labelInline
      enableVirtualScroll
      virtualScrollOverscan={10}
      value={value}
      onChange={onChangeHandler}
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
};

export const SimpleSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <SimpleSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
        value={value}
        onChange={onChangeHandler}
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
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

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
      <Select
        placeholder="Scroll does not reach the last option"
        value={value}
        onChange={onChangeHandler}
      >
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

export const ComplexCustomChildren = () => {
  return (
    <Box height={220}>
      <Select
        mb={0}
        key="key"
        id="id"
        label="Select"
        aria-label="aria label"
        name="name"
        value="value"
        isLoading={false}
        readOnly={false}
        placeholder="placeholder"
        onChange={() => {}}
        onOpen={() => {}}
        onListScrollBottom={() => {}}
      >
        <Option>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={3}
            flexDirection="column"
          >
            <Box display="flex" mx={2}>
              <Icon type="error" color="errorRed" />
              <Box ml={1} width="100%">
                <Box mb={1}>
                  <Typography variant="b" color="errorRed">
                    Something went wrong
                  </Typography>
                </Box>
                <Typography variant="p" color="errorRed" mb={0}>
                  We couldn't load the data. Please try again later.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Option>
      </Select>
    </Box>
  );
};

export const SimpleSelectWithAriaDescribedby = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Box m={3} width={300}>
      <Select
        name="simple"
        id="simple"
        label="color"
        aria-label="color"
        aria-describedby="combo-box-description"
        value={value}
        onChange={onChangeHandler}
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
      </Select>
      <Typography my={5} id="combo-box-description">
        This is a description of the select textbox
      </Typography>
    </Box>
  );
};

SimpleSelectWithAriaDescribedby.storyName =
  "SimpleSelect with aria-describedby";
