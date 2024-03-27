import React, { useState } from "react";
import CarbonProvider from "../carbon-provider";
import Textarea, { TextareaProps } from ".";
import Dialog from "../dialog";
import Form from "../form";
import Button from "../button";

interface TextareaTestProps extends TextareaProps {
  labelHelp?: string;
}

export const Default = ({
  placeholder,
  label,
  labelHelp,
  characterLimit,
  fieldHelp,
  ...args
}: TextareaTestProps) => {
  const [state, setState] = useState("");
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <Textarea
      {...args}
      name="textarea"
      onChange={handleChange}
      value={state}
      placeholder={placeholder}
      label={label}
      labelHelp={labelHelp}
      helpAriaLabel={labelHelp}
      characterLimit={characterLimit}
      fieldHelp={fieldHelp}
    />
  );
};

export const TextareaComponent = (props: Partial<TextareaProps>) => {
  const [state, setState] = React.useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Textarea label="Textarea" value={state} onChange={setValue} {...props} />
  );
};

export const InScrollableContainer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu. Pellentesque nec nam aliquam sem et tortor consequat. Nibh sit amet commodo nulla. Cursus metus aliquam eleifend mi. Mi proin sed libero enim sed faucibus turpis in. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Est lorem ipsum dolor sit amet consectetur. Morbi enim nunc faucibus a pellentesque sit. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Dapibus ultrices in iaculis nunc sed augue lacus viverra. Feugiat vivamus at augue eget arcu dictum varius. Eget velit aliquet sagittis id consectetur purus ut faucibus. Tincidunt arcu non sodales neque sodales. Ipsum faucibus vitae aliquet nec ullamcorper sit. Faucibus a pellentesque sit amet. Amet porttitor eget dolor morbi non. Arcu non odio euismod lacinia at quis risus sed vulputate. Blandit volutpat maecenas volutpat blandit. Purus ut faucibus pulvinar elementum integer enim neque. Viverra mauris in aliquam sem fringilla ut morbi. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Nibh mauris cursus mattis molestie a. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Consequat mauris nunc congue nisi vitae. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Eu facilisis sed odio morbi quis commodo. Ultrices vitae auctor eu augue ut lectus arcu. Ut tellus elementum sagittis vitae et leo duis ut. Sapien eget mi proin sed libero. Dictum non consectetur a erat nam at. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam. Pretium fusce id velit ut tortor pretium. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Semper quis lectus nulla at volutpat diam.Velit dignissim sodales ut eu sem integer. In massa tempor nec feugiat nisl pretium fusce id. Eu scelerisque felis imperdiet proin fermentum. Amet purus gravida quis blandit. Feugiat in fermentum posuere urna nec tincidunt praesent. Sit amet mauris commodo quis. Lorem sed risus ultricies tristique nulla aliquet enim tortor. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. A scelerisque purus semper eget duis. Ut faucibus pulvinar elementum integer enim neque. Integer feugiat scelerisque varius morbi enim nunc faucibus a. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Egestas purus viverra accumsan in nisl nisi. Sed turpis tincidunt id aliquet risus feugiat in ante. In mollis nunc sed id semper risus in hendrerit gravida. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Ornare arcu dui vivamus arcu felis bibendum ut. Tempor commodo ullamcorper a lacus vestibulum sed arcu non odio. Lacinia quis vel eros donec ac odio. Amet volutpat consequat mauris nunc congue nisi vitae. Ultrices dui sapien eget mi proin sed. Adipiscing bibendum est ultricies integer quis auctor elit. Sagittis nisl rhoncus mattis rhoncus urna neque. Integer enim neque volutpat ac tincidunt. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor."
  );
  return (
    <Dialog
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      title="Title"
      subtitle="Subtitle"
      size="small"
    >
      <Form
        stickyFooter
        height="300px"
        leftSideButtons={
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        }
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Textarea
          value={value}
          onChange={({ target }) => setValue(target.value)}
          expandable
          rows={5}
        />
      </Form>
    </Dialog>
  );
};

export const DisabledExample = () => {
  return <Textarea label="Textarea" disabled />;
};

export const LabelAlignExample = () => {
  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};

export const ReadOnlyExample = () => {
  return <Textarea label="Textarea" readOnly />;
};

export const AutoFocusExample = () => {
  return <Textarea label="Textarea" autoFocus />;
};

export const ExpandableExample = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};

export const CharacterLimitExample = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit={50}
    />
  );
};

export const LabelInlineExample = () => {
  return <Textarea label="Textarea" labelInline />;
};

export const CustomWidthExample = () => {
  return (
    <Textarea label="Textarea" labelInline labelWidth={50} inputWidth={50} />
  );
};

export const FieldHelpExample = () => {
  return <Textarea label="Textarea" fieldHelp="Help" />;
};

export const MaxWidthExample = () => {
  return <Textarea label="Textarea" maxWidth="70%" />;
};

export const InputHintExample = () => {
  return <Textarea label="Textarea" inputHint="Hint text (optional)." />;
};

export const LabelHelpExample = () => {
  return <Textarea label="Textarea" labelHelp="Help" helpAriaLabel="Help" />;
};

export const RequiredExample = () => {
  return <Textarea label="Textarea" required />;
};

export const ValidationStringExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationStringPositionExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </div>
      ))}
    </>
  );
};

export const ValidationLabelExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};

export const ValidationLabelPositionExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </div>
      ))}
    </>
  );
};

export const NewDesignValidationExample = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) => (
        <div
          style={{ width: "296px" }}
          key={`${validationType}-string-component`}
        >
          <Textarea
            label={`${validationType}`}
            inputHint="Hint text (optional)."
            {...{ [validationType]: "Message" }}
            m={4}
          />
          <Textarea
            label={`readOnly - ${validationType}`}
            inputHint="Hint text (optional)."
            readOnly
            {...{ [validationType]: "Message" }}
            m={4}
          />
        </div>
      ))}
    </CarbonProvider>
  );
};

export const ValidationBooleanExample = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <div key={`${validationType}-boolean-component`}>
          <Textarea label="Textarea" {...{ [validationType]: true }} mb={2} />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </div>
      ))}
    </>
  );
};
