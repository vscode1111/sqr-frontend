import { makeObservable, observable } from 'mobx';
import { NF } from '~common';
import { ROUTE } from '~constants';
import { ControlStore } from './ControlStore';
import { RootStore } from './RootStore';
import { BaseStore } from './StoreBase';

export class UiStore extends BaseStore {
  route: ROUTE;
  currentControlStore: ControlStore | undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.route = ROUTE.TOKEN;

    makeObservable(this, {
      route: observable,
      // setRoute: action,
    });
  }

  setRoute(route: ROUTE) {
    this.route = route;
  }
}

export const FUiStore = NF<UiStore>();
