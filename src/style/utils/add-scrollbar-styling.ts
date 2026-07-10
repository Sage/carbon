export default () => `
  scrollbar-gutter: stable;
  scrollbar-color: var(--container-scrollbar-fg-default)
    var(--container-scrollbar-bg-default);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: var(--container-scrollbar-bg-default);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--container-scrollbar-fg-default);
    background-clip: padding-box;
    border: var(--global-space-comp-2-xs) solid
      var(--container-scrollbar-bg-default);
    border-radius: var(--global-radius-container-circle);
  }
`;
