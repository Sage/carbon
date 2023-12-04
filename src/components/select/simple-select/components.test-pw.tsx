import React, { useState, useRef } from "react";
import Typography from "../../../components/typography";
import Content from "../../../components/content";
import {
  CustomSelectChangeEvent,
  Select as SimpleSelect,
} from "../../../../src/components/select";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Box from "../../box";
import Icon from "../../icon";
import Dialog from "../../dialog";
import { Select, Option, SimpleSelectProps } from "..";

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
  const [value, setValue] = useState<Record<string, unknown>>({
    id: "Green",
    value: 5,
    text: "Green",
  });
  const optionList = useRef([
    <Option
      text="Amber"
      key="Amber"
      value={{
        id: "Amber",
        value: "1",
        text: "Amber",
      }}
    />,
    <Option
      text="Black"
      key="Black"
      value={{
        id: "Black",
        value: "2",
        text: "Black",
      }}
    />,
    <Option
      text="Blue"
      key="Blue"
      value={{
        id: "Blue",
        value: "3",
        text: "Blue",
      }}
    />,
    <Option
      text="Brown"
      key="Brown"
      value={{
        id: "Brown",
        value: "4",
        text: "Brown",
      }}
    />,
    <Option
      text="Green"
      key="Green"
      value={{
        id: "Green",
        value: "5",
        text: "Green",
      }}
    />,
    <Option
      text="Orange"
      key="Orange"
      value={{
        id: "Orange",
        value: "6",
        text: "Orange",
      }}
    />,
    <Option
      text="Pink"
      key="Pink"
      value={{
        id: "Pink",
        value: "7",
        text: "Pink",
      }}
    />,
    <Option
      text="Purple"
      key="Purple"
      value={{
        id: "Purple",
        value: "8",
        text: "Purple",
      }}
    />,
    <Option
      text="Red"
      key="Red"
      value={{
        id: "Red",
        value: "9",
        text: "Red",
      }}
    />,
    <Option
      text="White"
      key="White"
      value={{
        id: "White",
        value: "10",
        text: "White",
      }}
    />,
    <Option
      text="Yellow"
      key="Yellow"
      value={{
        id: "Yellow",
        value: "11",
        text: "Yellow",
      }}
    />,
  ]);
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
      {optionList.current}
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
      disablePortal
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
        label="choose an option"
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
    {
      id: 1,
      title: "There are 2 more options",
      content: "content",
    },
    {
      id: 2,
      title: "There is 1 more below",
      content: "content",
    },
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

export const SelectionConfirmed = () => {
  const [value, setValue] = useState("");
  const [confirmedSelection, setConfirmedSelection] = useState("");
  const handleChange = (event: CustomSelectChangeEvent) => {
    setValue(event.target.value);
    if (event.selectionConfirmed) {
      setConfirmedSelection(event.target.value);
    }
  };
  return (
    <>
      <Select
        name="testing"
        value={value}
        onChange={handleChange}
        openOnFocus
        label="Test"
        placeholder=" "
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
        <Option value="4" text="Four" />
        <Option value="5" text="Five" />
        <Option value="6" text="Six" />
        <Option value="7" text="Seven" />
        <Option value="8" text="Eight" />
        <Option value="9" text="Nine" />
      </Select>

      {confirmedSelection ? (
        <span data-element={`confirmed-selection-${confirmedSelection}`}>
          {confirmedSelection}
        </span>
      ) : null}
    </>
  );
};
