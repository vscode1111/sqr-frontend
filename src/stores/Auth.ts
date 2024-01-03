import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';

export class AuthStore extends BaseStore {
  private token: string;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.token = '';
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }
}
