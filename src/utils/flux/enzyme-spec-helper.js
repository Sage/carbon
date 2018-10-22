import reducerRegistry from './reducer-registry';

export const wrapEnzyme = function(Enzyme) {
  const originalShallow = Enzyme.shallow;
  const originalMount = Enzyme.mount;

  Enzyme.shallow = (comp, opts) => {
    if (comp.type._requiresReduxStore) {
      const wrapper = originalShallow(comp, { context: { store: reducerRegistry.store } });

      if (comp.type._legacyConnect) {
        return wrapper.dive();
      } else {
        return wrapper;
      }
    } else {
      return originalShallow(comp, opts);
    }
  }

  Enzyme.mount = (comp, opts) => {
    if (comp.type._requiresReduxStore) {
      const wrapper = originalShallow(comp, { context: { store: reducerRegistry.store } });

      if (comp.type._legacyConnect) {
        return originalMount(wrapper.get(0));
      } else {
        return originalMount(wrapper);
      }
    } else {
      return originalMount(comp, opts);
    }
  }
}
