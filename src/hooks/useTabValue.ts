import { useMemo } from 'react';
import { TabValueMap } from '~configs';
import { ROUTE, SUB_ROUTE } from '~constants';

export function useTabValue(route: ROUTE) {
  const currentTabValue = useMemo(() => TabValueMap.get(route), [route]);

  const firstView = useMemo(() => {
    const subMenus = currentTabValue?.subMenus ?? {};
    const keys = Object.keys(subMenus);
    return keys.find((key) => subMenus[key as SUB_ROUTE]);
  }, [currentTabValue]) as SUB_ROUTE;

  return {
    currentTabValue,
    firstView,
  };
}
