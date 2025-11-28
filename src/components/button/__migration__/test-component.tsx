import React from "react";
import Button from "..";

const MyApp = () => {
  return (
    <>
      <Button buttonType="primary" isWhite destructive href="/link">
        Delete
      </Button>
      <Button size="large" subtext={"Some subtext"}>
        foo
      </Button>
    </>
  );
};

export default MyApp;
