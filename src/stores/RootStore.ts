import {
  claimControlService,
  launchpadControlControlService,
  lockupControlService,
  signatureControlService,
  stakingControlService,
  tokenControlService,
} from '~services';
import { AuthStore } from './AuthStore';
import { ControlStore } from './ControlStore';
import { UiStore } from './UiStore';

export class RootStore {
  public auth: AuthStore;
  public ui: UiStore;

  public tokenControl: ControlStore;
  public claimControl: ControlStore;
  public lockupControl: ControlStore;
  public stakingControl: ControlStore;
  public signatureControl: ControlStore;
  public launchpadControl: ControlStore;

  constructor() {
    this.auth = new AuthStore(this);
    this.ui = new UiStore(this);

    this.tokenControl = new ControlStore(this, tokenControlService);
    this.claimControl = new ControlStore(this, claimControlService);
    this.lockupControl = new ControlStore(this, lockupControlService);
    this.stakingControl = new ControlStore(this, stakingControlService);
    this.signatureControl = new ControlStore(this, signatureControlService);
    this.launchpadControl = new ControlStore(this, launchpadControlControlService);
  }
}
