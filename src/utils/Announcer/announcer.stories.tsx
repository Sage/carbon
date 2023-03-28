import React from "react";
import { StoryFn } from "@storybook/react";

import Announcer from ".";

import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from "../../components/flat-table";
import Form from "../../components/form";
import Textbox from "../../components/textbox";
import Button from "../../components/button";
import Textarea from "../../components/textarea";
import Box from "../../components/box";
import Typography from "../../components/typography";
import Loader from "../../components/loader";
import Preview from "../../components/preview";
import CarbonProvider from "../../components/carbon-provider";
import { sageTheme } from "../../style/themes";
import Message from "../../components/message";

// Remove once re-design styles become the default
const newValidationDecorator = (Story: React.FunctionComponent) => (
  <CarbonProvider theme={sageTheme} validationRedesignOptIn>
    <Story />
  </CarbonProvider>
);

// Wrap around stories where a screen reader announcements would be made immediately on load otherwise
const startDemoDecorator = (Story: React.FunctionComponent) => {
  const StartDemoWrapper = ({ children }: { children: JSX.Element }) => {
    const [beginDemo, setBeginDemo] = React.useState(false);

    return beginDemo ? (
      children
    ) : (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="b" mb={2}>
          Open this story in a separate canvas with your screen reader of
          choice, then press button to begin.
        </Typography>
        <Button onClick={() => setBeginDemo(true)}>Begin demo</Button>
      </Box>
    );
  };

  return (
    <StartDemoWrapper>
      <Story />
    </StartDemoWrapper>
  );
};

export const AnnouncePageLoad: StoryFn = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) window.setTimeout(() => setIsLoading(false), 5000);
  }, [isLoading]);

  React.useEffect(() => {
    if (isLoading)
      Announcer.announcePolitely("Retrieving reports, please wait.");
    else Announcer.announcePolitely("Reports loaded.");
  }, [isLoading]);

  const LoadingPage = () => (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1">Retrieving reports</Typography>
      <Typography mb={4}>Please wait...</Typography>
      <Loader />
    </Box>
  );

  const ReportsPage = () => {
    const reports = [
      {
        id: 0,
        report: "Monthly expenses",
        description: "Summary of all company expenses per calendar month",
        lastUpdated: "01/03/2023",
      },
      {
        id: 1,
        report: "Monthly profits",
        description: "Summary of net returns calendar month",
        lastUpdated: "02/03/2023",
      },
    ];

    return (
      <>
        <Typography variant="h1" mb={2}>
          Reports
        </Typography>
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Report</FlatTableHeader>
              <FlatTableHeader>Description</FlatTableHeader>
              <FlatTableHeader>Last updated</FlatTableHeader>
              <FlatTableHeader>Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {reports.map((report) => (
              <FlatTableRow key={report.id}>
                <FlatTableCell>{report.report}</FlatTableCell>
                <FlatTableCell>{report.description}</FlatTableCell>
                <FlatTableCell>{report.lastUpdated}</FlatTableCell>
                <FlatTableCell>
                  <Button onClick={() => {}} my={1}>
                    Open
                  </Button>
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
        <Button mt={2} onClick={() => setIsLoading(true)}>
          Run demo again
        </Button>
      </>
    );
  };

  return <Box m={2}>{isLoading ? <LoadingPage /> : <ReportsPage />}</Box>;
};
AnnouncePageLoad.decorators = [newValidationDecorator, startDemoDecorator];

export const AnnounceContentLoad: StoryFn = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const contacts = [
    {
      id: 0,
      name: "Cecile Newman",
      occuptation: "Senior QA",
      location: "Newcastle",
    },
    {
      id: 1,
      name: "Lakisha Simon",
      occuptation: "Team Lead",
      location: "Vancouver",
    },
    {
      id: 2,
      name: "Mikel Lutz",
      occuptation: "Graduate Software Engineer",
      location: "Reading",
    },
  ];

  React.useEffect(() => {
    if (isLoading) window.setTimeout(() => setIsLoading(false), 5000);
  }, [isLoading]);

  React.useEffect(() => {
    if (isLoading) Announcer.announcePolitely("Loading contacts, please wait.");
    else Announcer.announcePolitely("Contacts loaded.");
  }, [isLoading]);

  return (
    <Box m={2}>
      <Typography variant="h1" mb={2}>
        Contacts
      </Typography>
      <Preview loading={isLoading} lines={10}>
        <FlatTable>
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Name</FlatTableHeader>
              <FlatTableHeader>Occuptation</FlatTableHeader>
              <FlatTableHeader>Location</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {contacts.map((contact) => (
              <FlatTableRow key={contact.id}>
                <FlatTableCell>{contact.name}</FlatTableCell>
                <FlatTableCell>{contact.occuptation}</FlatTableCell>
                <FlatTableCell>{contact.location}</FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </Preview>
      {!isLoading && (
        <Button mt={2} onClick={() => setIsLoading(true)}>
          Run demo again
        </Button>
      )}
    </Box>
  );
};
AnnounceContentLoad.decorators = [newValidationDecorator, startDemoDecorator];

export const FormValidation: StoryFn = () => {
  interface IFieldValues {
    name: string;
    email: string;
    address: string;
  }

  interface IFieldErrors {
    name?: string;
    email?: string;
  }

  const [input, setInput] = React.useState<IFieldValues>({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = React.useState<IFieldErrors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const numOfErrors = React.useMemo(
    () => Object.keys(errors).filter((field) => field !== undefined).length,
    [errors]
  );

  const summaryMessage = (errorNum: number) =>
    errorNum > 0
      ? `${errorNum} error${
          errorNum > 1 ? "s" : ""
        } found. Please correct the form errors before resubmitting.`
      : "Successfully submitted form!";

  const updateField = (field: keyof IFieldValues, value: string) => {
    setInput({ ...input, [field]: value });
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);

    const fieldErrors: IFieldErrors = {};
    const fields = ["name", "email"] as const;
    fields.forEach((field) => {
      if (input[field].length < 1)
        fieldErrors[field] = "This field cannot be empty";
    });

    const summary = summaryMessage(Object.keys(fieldErrors).length);
    Announcer.announcePolitely(summary);
    setErrors(fieldErrors);
  };

  return (
    <Box m={2}>
      {submitted && (
        <Message mb={2} open variant={numOfErrors > 0 ? "error" : "success"}>
          {summaryMessage(numOfErrors)}
        </Message>
      )}
      <Form
        onSubmit={handleSubmit}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
      >
        <Textbox
          label="Name"
          labelHelp="Please write your full name."
          required
          value={input.name}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            updateField("name", target.value)
          }
          error={errors.name}
        />
        <Textbox
          label="Email"
          required
          value={input.email}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            updateField("email", target.value)
          }
          error={errors.email}
        />
        <Textarea
          label="Address"
          labelHelp="This will be used for sending you updates on our products via post."
          value={input.address}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
            updateField("address", target.value)
          }
        />
      </Form>
    </Box>
  );
};
FormValidation.decorators = [newValidationDecorator];
