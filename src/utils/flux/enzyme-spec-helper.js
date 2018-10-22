import reducerRegistry from './reducer-registry';

export const wrapEnzyme = function(Enzyme) {
  reducerRegistry.createStore({ foo: () => ({ bar: true }) });
  const originalShallow = Enzyme.shallow;
  const originalMount = Enzyme.mount;
  Enzyme.shallow = (comp, opts) => {
    if (comp.type._legacyConnect) {
      return originalShallow(comp, { context: { store: reducerRegistry.store } }).dive();
    } else {
      return originalShallow(comp, opts);
    }
  }
  Enzyme.mount = (comp, opts) => {
    if (comp.type._legacyConnect) {
      return originalMount(comp, { context: { store: reducerRegistry.store } }).dive();
    } else {
      return originalMount(comp, opts);
    }
  }
}
