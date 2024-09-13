import { useMemo } from 'react';
import { NetworkRecord } from '~types';
import { useInitEffect } from './useInitEffect';
import { useStores } from './useStores';

export function useSelectChoices() {
  const { launchpadControl: controlStore } = useStores();

  useInitEffect(() => {
    if (!controlStore.serviceContractTypes) {
      controlStore.fetchContractTypes();
    }

    if (!controlStore.serviceNetworks) {
      controlStore.fetchNetworks();
    }
  });

  const networksMap = useMemo(() => {
    const innerMap = new Map<number, NetworkRecord>();
    controlStore.serviceNetworks?.forEach((network) => innerMap.set(network.id, network));
    return innerMap;
  }, [controlStore.serviceNetworks]);

  const networksChoices = useMemo(
    () =>
      controlStore.serviceNetworks?.map(({ id, name }) => ({
        id,
        name,
      })),
    [controlStore.serviceNetworks],
  );

  const contractTypeChoices = useMemo(
    () =>
      controlStore.serviceContractTypes?.map((type) => ({
        id: type,
        name: type,
      })),
    [controlStore.serviceContractTypes],
  );

  return {
    networksMap,
    networksChoices,
    contractTypeChoices,
  };
}
