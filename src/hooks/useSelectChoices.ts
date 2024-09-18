import { useMemo } from 'react';
import { NetworkRecord } from '~types';
import { useInitEffect } from './useInitEffect';
import { useStores } from './useStores';

export function useSelectChoices() {
  const { control } = useStores();

  useInitEffect(() => {
    if (!control.serviceContractTypes) {
      control.fetchContractTypes();
    }

    if (!control.serviceNetworks) {
      control.fetchNetworks();
    }
  });

  const networksMap = useMemo(() => {
    const innerMap = new Map<number, NetworkRecord>();
    control.serviceNetworks?.forEach((network) => innerMap.set(network.id, network));
    return innerMap;
  }, [control.serviceNetworks]);

  const networksChoices = useMemo(
    () =>
      control.serviceNetworks?.map(({ id, name }) => ({
        id,
        name,
      })),
    [control.serviceNetworks],
  );

  const contractTypeChoices = useMemo(
    () =>
      control.serviceContractTypes?.map((type) => ({
        id: type,
        name: type,
      })),
    [control.serviceContractTypes],
  );

  return {
    networksMap,
    networksChoices,
    contractTypeChoices,
  };
}
