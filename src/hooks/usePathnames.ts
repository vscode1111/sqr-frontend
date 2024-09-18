import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function usePathnames() {
  const location = useLocation();

  const result = useMemo(() => {
    const pathnames = location.pathname.split('/');

    const firstPathname = pathnames.length > 0 ? pathnames[1] : undefined;
    const secondPathname = pathnames.length > 1 ? pathnames[2] : undefined;

    return {
      firstPathname,
      secondPathname,
    };
  }, [location.pathname]);

  return result;
}
