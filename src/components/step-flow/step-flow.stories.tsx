import React, { useState, useRef } from "react";
import { ComponentStory } from "@storybook/react";
import { StepFlow } from ".";
import Button from "../button";
import Form from "../form";
import Dialog from "../dialog";
import Typography from "../typography";
import Textarea from "../textarea";
import I18nProvider from "../i18n-provider/i18n-provider.component";
import { Steps, StepFlowHandle } from "./step-flow.component";

export const DefaultStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow title="Step title" currentStep={1} totalSteps={6} />
);

export const CategoryStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
  />
);

export const ShowProgressIndicatorStory: ComponentStory<
  typeof StepFlow
> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
    showProgressIndicator
  />
);

export const CurrentStepStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={5}
    totalSteps={6}
    showProgressIndicator
  />
);

export const TotalStepsStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={5}
    totalSteps={8}
    showProgressIndicator
  />
);

export const ShowCloseIconStory: ComponentStory<typeof StepFlow> = () => (
  <StepFlow
    category="Main goal"
    title="Step title"
    currentStep={1}
    totalSteps={6}
    showCloseIcon
    onDismiss={() => ""}
  />
);

export const ExampleImplementation: ComponentStory<typeof StepFlow> = () => {
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

export const ExampleImplementationWithTranslations: ComponentStory<
  typeof StepFlow
> = () => {
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
