import { usePageLayoutStyles } from './usePageLayoutStyles';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  short?: boolean;
}

export function PageLayout({ children, short = false }: PageLayoutProps) {
  const { classes } = usePageLayoutStyles({ short });

  return (
    <div className={classes.root}>
      <div className={classes.children}>{children}</div>
    </div>
  );
}
