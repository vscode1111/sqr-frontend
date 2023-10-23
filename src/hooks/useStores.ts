import { createContext, useContext } from 'react';
import { stores } from '~stores';

export const StoreContext = createContext(stores);

export const useStores = () => {
  return useContext<typeof stores>(StoreContext);
};
