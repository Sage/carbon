import React from "react";
import Content from "../content/content.component";
import Pod, { PodProps } from "./pod.component";
import Typography from "../typography/typography.component";

export const PodExample = (props: PodProps) => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      onDelete={() => {}}
      {...props}
    />
  );
};

export const PodDefault = (props: PodProps) => {
  return <Pod title="Title" {...props} />;
};

export const EditExample = (props: PodProps) => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onEdit={() => {}}
      {...props}
    />
  );
};

export const SoftDeleteExample = (props: PodProps) => {
  return (
    <Pod
      title="Title"
      subtitle="Subtitle"
      footer="Footer"
      onUndo={() => {}}
      softDelete
      {...props}
    />
  );
};

export const SoftDeleteExampleWithChildren = () => (
  <Pod softDelete onUndo={() => {}}>
    Content
    <Content>More content</Content>
  </Pod>
);

export const PodWithVariantTypes = (props: PodProps) => (
  <Pod
    title={<Typography variant="h1">Title</Typography>}
    subtitle={<Typography variant="h2">Subtitle</Typography>}
    {...props}
  >
    Content
  </Pod>
);

export const PodWithHeading = ({
  headingLevel,
}: {
  headingLevel: 1 | 2 | 3 | 4 | 5;
}) => (
  <Pod title={<Typography variant={`h${headingLevel}`}>Title</Typography>}>
    Content
  </Pod>
);
