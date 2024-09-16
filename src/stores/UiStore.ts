import { makeObservable, observable } from 'mobx';
import { ROUTE } from '~constants';
import { RootStore } from './RootStore';
import { BaseStore } from './StoreBase';

export class UiStore extends BaseStore {
  route: ROUTE;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.route = ROUTE.TOKEN;

    makeObservable(this, {
      route: observable,
      // setRoute: action,
    });
  }

  setRoute(token: ROUTE) {
    this.route = token;
  }
}
