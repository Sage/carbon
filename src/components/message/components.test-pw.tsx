import React, { useState } from "react";
import Button from "../button";
import Message, { MessageProps } from "./message.component";

const MessageComponent = (props: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
        Some custom message
      </Message>
    </div>
  );
};

export default MessageComponent;
