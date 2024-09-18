import { controlService } from '~services';
import { AuthStore } from './AuthStore';
import { ControlStore } from './ControlStore';
import { UiStore } from './UiStore';

export class RootStore {
  public auth: AuthStore;
  public ui: UiStore;

  public control: ControlStore;

  constructor() {
    this.ui = new UiStore(this);
    this.auth = new AuthStore(this);
    this.control = new ControlStore(this, controlService);
  }
}
