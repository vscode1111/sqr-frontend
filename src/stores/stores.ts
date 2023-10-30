import { RootStore } from './RootStore';

export const stores = new RootStore();

if (!process.env.prod) {
  window.stores = stores;
}
