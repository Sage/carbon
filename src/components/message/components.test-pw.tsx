import React, { useState, useRef, useEffect } from "react";
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

const MessageComponentWithRef = (props: MessageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const messageRef: React.Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isOpen) messageRef.current?.focus();
  });

  return (
    <div>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        ref={messageRef}
        {...props}
      >
        Some custom message
      </Message>
    </div>
  );
};

export { MessageComponent, MessageComponentWithRef };
