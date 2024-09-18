import { useStores } from './useStores';

export function useControlStore() {
  const {
    ui: { route },
    control,
  } = useStores();

  console.log(222, route);
  return control;
}
