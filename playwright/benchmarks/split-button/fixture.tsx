import React, { useRef } from "react";
import SplitButton from "../../../src/components/split-button";
import Button from "../../../src/components/button/__next__";

const SplitButtonFixture = () => {
  const actionRef = useRef<HTMLOutputElement>(null);
  // Record callbacks without adding a fixture state update to the profile.
  const recordAction = (action: string) => {
    const output = actionRef.current;
    if (!output) return;
    output.dataset.action = action;
    output.dataset.count = String(Number(output.dataset.count ?? 0) + 1);
  };

  return (
    <>
      <SplitButton
        text="Save"
        aria-label="Save options"
        onClick={() => recordAction("save")}
      >
        <Button onClick={() => recordAction("save-draft")}>Save draft</Button>
        <Button onClick={() => recordAction("save-copy")}>Save a copy</Button>
      </SplitButton>
      <output hidden ref={actionRef} data-fixture-action data-count="0" />
    </>
  );
};

export default SplitButtonFixture;
