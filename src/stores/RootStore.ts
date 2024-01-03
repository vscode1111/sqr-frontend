import { AuthStore } from './Auth';
import { ControlStore } from './ControlStore';

export class RootStore {
  public control: ControlStore;
  public auth: AuthStore;

  constructor() {
    this.control = new ControlStore(this);
    this.auth = new AuthStore(this);
  }
}
