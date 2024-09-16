import { MainAppBar } from '../MainAppBar';
import { PageMenu } from '../PageMenu';
import type { ReactNode } from 'react';
import { CheckForApplicationUpdate, Layout as RALayout } from 'react-admin';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <RALayout appBar={MainAppBar} menu={PageMenu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
}
