import { ReactNode } from 'react';
import { SUB_ROUTE } from '~constants';
import { ControlStore } from '~stores';

export interface TabValue {
  label: string;
  value: string;
  Form?: () => ReactNode;
  subMenus?: Partial<Record<SUB_ROUTE, boolean>>;
}
export interface ControlStoreProps {
  controlStore: ControlStore;
}
