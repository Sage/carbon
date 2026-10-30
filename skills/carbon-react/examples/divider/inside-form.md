# Divider: Inside Form

```tsx
import { useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import Textbox from "carbon-react/lib/components/textbox";
import Divider from "carbon-react/lib/components/divider";

export const DividerInsideFormExample = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Form
      leftSideButtons={<Button variantType="secondary">Cancel</Button>}
      saveButton={<Button type="submit">Save</Button>}
      stickyFooter={false}
    >
      <Textbox
        label="First name"
        value={firstName}
        onChange={(ev) => setFirstName(ev.target.value)}
      />
      <Textbox
        label="Last name"
        value={lastName}
        onChange={(ev) => setLastName(ev.target.value)}
      />
      <Divider type="horizontal" mb={7} mt={7} />
      <Textbox
        label="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
    </Form>
  );
};
```
