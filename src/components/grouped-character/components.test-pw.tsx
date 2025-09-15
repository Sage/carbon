import React, { useState } from "react";
import GroupedCharacter, {
  CustomEvent,
  GroupedCharacterProps,
} from "./grouped-character.component";
import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export const GroupedCharacterComponent = ({
  onChange,
  groups,
  separator,
  ...props
}: Partial<GroupedCharacterProps>) => {
  const [state, setState] = React.useState("");

  const setValue = (event: CustomEvent) => {
    setState(event.target.value.rawValue);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={groups || [2, 2, 3]}
      separator={separator || "-"}
      {...props}
    />
  );
};

export const Validations = (
  args: Partial<GroupedCharacterProps> & { message?: string | boolean },
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            groups={[2, 2, 3]}
            separator="-"
            {...{ [validationType]: args.message }}
            mb={2}
            {...args}
          />
          <GroupedCharacter
            label="GroupedCharacter - readOnly"
            value="1231231"
            groups={[2, 2, 3]}
            onChange={() => {}}
            separator="-"
            readOnly
            {...{ [validationType]: args.message }}
            mb={2}
            {...args}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsStringComponent = (
  args: Partial<GroupedCharacterProps> & { message?: string | boolean },
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            groups={[2, 2, 3]}
            separator="-"
            {...{ [validationType]: "Message" }}
            mb={2}
            {...args}
          />
          <GroupedCharacter
            label="GroupedCharacter - readOnly"
            value="1231231"
            groups={[2, 2, 3]}
            onChange={() => {}}
            separator="-"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
            {...args}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsStringLabel = (
  args: Partial<GroupedCharacterProps> & { message?: string | boolean },
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            groups={[2, 2, 3]}
            separator="-"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            {...args}
          />
          <GroupedCharacter
            label="GroupedCharacter - readOnly"
            value="1231231"
            groups={[2, 2, 3]}
            onChange={() => {}}
            separator="-"
            readOnly
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            {...args}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsBoolean = (
  args: Partial<GroupedCharacterProps> & { message?: string | boolean },
) => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
    info: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <>
      {(["error", "warning", "info"] as const).map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <GroupedCharacter
            label="GroupedCharacter"
            value={state[validationType]}
            onChange={handleChange(validationType)}
            groups={[2, 2, 3]}
            separator="-"
            {...{ [validationType]: true }}
            mb={2}
            {...args}
          />
          <GroupedCharacter
            label="GroupedCharacter - readOnly"
            value="1231231"
            groups={[2, 2, 3]}
            onChange={() => {}}
            separator="-"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
            {...args}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationsRedesign = () => {
  const [state, setState] = useState({
    error: "1231231",
    warning: "1231231",
  });

  const handleChange = (validation: string) => (e: CustomEvent) => {
    setState({ ...state, [validation]: e.target.value.rawValue });
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      {(["error", "warning"] as const).map((validationType) =>
        (["small", "medium", "large"] as const).map((size) => (
          <Box width="296px" key={`${size}-${validationType}-string-component`}>
            <GroupedCharacter
              label={`${size} - ${validationType}`}
              value={state[validationType]}
              onChange={handleChange(validationType)}
              groups={[2, 2, 3]}
              size={size}
              separator="-"
              {...{ [validationType]: "Message" }}
              m={4}
            />
            <GroupedCharacter
              label={`readOnly - ${size} - ${validationType}`}
              value="1231231"
              onChange={() => {}}
              groups={[2, 2, 3]}
              size={size}
              separator="-"
              readOnly
              {...{ [validationType]: "Message" }}
              m={4}
            />
          </Box>
        )),
      )}
    </CarbonProvider>
  );
};
