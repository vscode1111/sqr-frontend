import { useStores } from './useStores';

export function useControlStore() {
  const { control } = useStores();
  return control;
}
