import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import I18nProvider from "../i18n-provider/i18n-provider.component";
import Button from "../button";
import Form from "../form";
import Dialog from "../dialog";
import Typography from "../typography";
import Textarea from "../textarea";
import Box from "../box";
import Icon from "../icon";
import Image from "../image";
import pointSvg from "../../../.assets/point.svg";

import { StepFlow, StepFlowTitle, StepFlowHandle, Steps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof StepFlow> = {
  title: "Step Flow",
  component: StepFlow,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { controls: { disabled: true } },
};

export default meta;
type Story = StoryObj<typeof StepFlow>;

export const DefaultStory: Story = () => {
  return <StepFlow title="Step title" currentStep={1} totalSteps={6} />;
};
DefaultStory.storyName = "Default";

export const TitleNodeStory: Story = () => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <Icon type="bin" />
      <StepFlowTitle titleString="Step title" />
    </Box>
  );

  return <StepFlow title={titleNode} currentStep={1} totalSteps={6} />;
};
TitleNodeStory.storyName = "Title Node";

export const TitleNodeStoryWithScreenReaderOnlyTitle: Story = () => {
  const titleNode = (
    <Box display="flex" alignItems="center">
      <StepFlowTitle
        titleString="Step title"
        screenReaderOnlyTitle="Step Title with a pointer image"
      />
      <Image alt="" src={pointSvg} decorative size={50} />
    </Box>
  );

  return <StepFlow title={titleNode} currentStep={1} totalSteps={6} />;
};
TitleNodeStoryWithScreenReaderOnlyTitle.storyName =
  "Title Node with Screen Reader Only Title";
TitleNodeStoryWithScreenReaderOnlyTitle.parameters = {
  chromatic: { disableSnapshot: true },
};

export const CategoryStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
    />
  );
};
CategoryStory.storyName = "Category";

export const ShowProgressIndicatorStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showProgressIndicator
    />
  );
};
ShowProgressIndicatorStory.storyName = "Show Progress Indicator";

export const CurrentStepStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={6}
      showProgressIndicator
    />
  );
};
CurrentStepStory.storyName = "Current Step";

export const TotalStepsStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={5}
      totalSteps={8}
      showProgressIndicator
    />
  );
};
TotalStepsStory.storyName = "Total Steps";

export const ShowCloseIconStory: Story = () => {
  return (
    <StepFlow
      category="Main goal"
      title="Step title"
      currentStep={1}
      totalSteps={6}
      showCloseIcon
      onDismiss={() => ""}
    />
  );
};
ShowCloseIconStory.storyName = "Show Close Icon";

export const ExampleImplementation: Story = () => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Transaction Type", "Add refund", "Refund details"];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        showCloseIcon={false}
        title={
          <StepFlow
            category="Add client"
            title={stepTitles[step - 1]}
            currentStep={step as Steps}
            totalSteps={highestStep}
            ref={stepFlowHandle}
            showProgressIndicator
            showCloseIcon
            onDismiss={() => setIsOpen(false)}
            mb="20px"
          />
        }
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button buttonType="tertiary" onClick={() => handleClick("Back")}>
              Back
            </Button>
          }
          rightSideButtons={
            <Button
              buttonType="primary"
              onClick={() => handleClick("Continue")}
            >
              Continue
            </Button>
          }
        >
          <Typography>
            This is an example of a Dialog with a Form as content, with a Step
            Flow to help users complete tasks in a specific order.
          </Typography>
          <Textarea label="Reason For Refund" />
        </Form>
      </Dialog>
    </>
  );
};
ExampleImplementation.storyName = "Example Implementation";

export const ExampleImplementationWithTitleNode: Story = () => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = ["Transaction Type", "Add refund", "Refund details"];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  const titleNode = (
    <Box display="flex" alignItems="center">
      <Icon type="bin" />
      <StepFlowTitle titleString={stepTitles[step - 1]} />
    </Box>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        showCloseIcon={false}
        title={
          <StepFlow
            category="Add client"
            title={titleNode}
            currentStep={step as Steps}
            totalSteps={highestStep}
            ref={stepFlowHandle}
            showProgressIndicator
            showCloseIcon
            onDismiss={() => setIsOpen(false)}
            mb="20px"
          />
        }
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button buttonType="tertiary" onClick={() => handleClick("Back")}>
              Back
            </Button>
          }
          rightSideButtons={
            <Button
              buttonType="primary"
              onClick={() => handleClick("Continue")}
            >
              Continue
            </Button>
          }
        >
          <Typography>
            This is an example of a Dialog with a Form as content, with a Step
            Flow to help users complete tasks in a specific order.
          </Typography>
          <Textarea label="Reason For Refund" />
        </Form>
      </Dialog>
    </>
  );
};
ExampleImplementationWithTitleNode.storyName =
  "Example Implementation with title node";

export const ExampleImplementationWithTranslations: Story = () => {
  const lowestStep = 1;
  const highestStep = 3;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(lowestStep);
  const stepFlowHandle = useRef<StepFlowHandle>(null);

  const stepTitles = [
    "Type de transaction",
    "Ajouter un remboursement",
    "Détails du remboursement",
  ];

  function handleClick(clickType: string) {
    stepFlowHandle.current?.focus();

    if (clickType === "Back") {
      setStep(step > lowestStep ? step - 1 : step);
    } else {
      setStep(step < highestStep ? step + 1 : step);
    }
  }

  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        stepFlow: {
          stepLabel: (currentStep, totalSteps) =>
            `Étape ${currentStep} de ${totalSteps}`,
          screenReaderOnlyTitle: (title, currentStep, totalSteps, category) =>
            `${category}. ${title}. Étape ${currentStep} de ${totalSteps}.`,
          closeIconAriaLabel: () => "Fermer",
        },
      }}
    >
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          open={isOpen}
          showCloseIcon={false}
          title={
            <StepFlow
              category="Ajouter un client"
              title={stepTitles[step - 1]}
              currentStep={step as Steps}
              totalSteps={highestStep}
              ref={stepFlowHandle}
              showProgressIndicator
              showCloseIcon
              onDismiss={() => setIsOpen(false)}
              mb="20px"
            />
          }
        >
          <Form
            stickyFooter
            leftSideButtons={
              <Button buttonType="tertiary" onClick={() => handleClick("Back")}>
                Retour
              </Button>
            }
            rightSideButtons={
              <Button
                buttonType="primary"
                onClick={() => handleClick("Continue")}
              >
                Continuer
              </Button>
            }
          >
            <Typography>
              Il s'agit d'un exemple de boîte de dialogue avec un formulaire
              comme contenu, avec un flux d'étapes pour aider les utilisateurs à
              effectuer des tâches dans un ordre spécifique.
            </Typography>
            <Textarea label="Motif du remboursement" />
          </Form>
        </Dialog>
      </>
    </I18nProvider>
  );
};
ExampleImplementationWithTranslations.storyName =
  "Example Implementation with Translations";
