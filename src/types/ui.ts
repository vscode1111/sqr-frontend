import { ReactNode } from 'react';
import { ControlStore } from '~stores';

export interface TabValue {
  label: string;
  value: string;
  Form?: () => ReactNode;
}

export interface ControlStoreProps {
  controlStore: ControlStore;
}
