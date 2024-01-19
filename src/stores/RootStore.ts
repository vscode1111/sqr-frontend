import { claimControlService, lockupControlService, tokenControlService } from '~services';
import { AuthStore } from './Auth';
import { ControlStore } from './ControlStore';

export class RootStore {
  public tokenControl: ControlStore;
  public claimControl: ControlStore;
  public lockupControl: ControlStore;
  public auth: AuthStore;

  constructor() {
    this.tokenControl = new ControlStore(this, tokenControlService);
    this.claimControl = new ControlStore(this, claimControlService);
    this.lockupControl = new ControlStore(this, lockupControlService);
    this.auth = new AuthStore(this);
  }
}
