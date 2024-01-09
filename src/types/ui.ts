import { ReactNode } from 'react';

export interface TabValue {
  label: string;
  value: string;
  Form?: () => ReactNode;
}
