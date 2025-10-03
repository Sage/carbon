export interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  labelledBy: string;
}

export interface TabListProps {
  ariaLabel: string;
  children?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "medium" | "large";
}

export interface TabProps {
  controls: string;
  id: string;
  index: number;
  label: React.ReactNode;
  leftSlot?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  rightSlot?: React.ReactNode;
  size?: "medium" | "large";
}

export interface TabsProps {
  children?: React.ReactNode;
  labelledBy?: string;
  orientation?: "horizontal" | "vertical";
  size?: "medium" | "large";
}
