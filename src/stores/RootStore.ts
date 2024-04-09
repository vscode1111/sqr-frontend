import {
  claimControlService,
  lockupControlService,
  signatureControlService,
  stakingControlService,
  tokenControlService,
} from '~services';
import { AuthStore } from './Auth';
import { ControlStore } from './ControlStore';

export class RootStore {
  public auth: AuthStore;

  public tokenControl: ControlStore;
  public claimControl: ControlStore;
  public lockupControl: ControlStore;
  public stakingControl: ControlStore;
  public signatureControl: ControlStore;

  constructor() {
    this.auth = new AuthStore(this);

    this.tokenControl = new ControlStore(this, tokenControlService);
    this.claimControl = new ControlStore(this, claimControlService);
    this.lockupControl = new ControlStore(this, lockupControlService);
    this.stakingControl = new ControlStore(this, stakingControlService);
    this.signatureControl = new ControlStore(this, signatureControlService);
  }
}
