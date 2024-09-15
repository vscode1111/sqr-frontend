import type { ReactNode } from 'react';
import { CheckForApplicationUpdate, Layout as RALayout } from 'react-admin';
import { PageMenu } from '~components';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RALayout menu={PageMenu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
}
