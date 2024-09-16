import { TabValue } from '~types';
import { ROUTE } from '../constants/routers';

export const TabValueList: TabValue[] = [
  {
    label: 'Token',
    value: ROUTE.TOKEN,
    subMenus: {
      monitoring: true,
    },
  },
  {
    label: 'Claim',
    value: ROUTE.CLAIM,
    subMenus: {
      shares: true,
      monitoring: true,
    },
  },
  {
    label: 'Lockup',
    value: ROUTE.LOCKUP,
    subMenus: {
      shares: true,
      monitoring: true,
      contracts: true,
    },
  },
  {
    label: 'Staking',
    value: ROUTE.STAKING,
    subMenus: {
      monitoring: true,
      contracts: true,
    },
  },
  {
    label: 'Signature',
    value: ROUTE.SIGNATURE,
    subMenus: {
      monitoring: true,
    },
  },
  {
    label: 'Launchpad',
    value: ROUTE.LAUNCHPAD,
    subMenus: {
      monitoring: true,
      contracts: true,
    },
  },
  {
    label: 'Shares',
    value: ROUTE.GENERATE_SHARES,
  },
];

export const TabValueMap = new Map<string, TabValue>();
TabValueList.map((item) => TabValueMap.set(item.value, item));
