import { ControlStore } from './ControlStore';

export class RootStore {
  public control: ControlStore;

  constructor() {
    this.control = new ControlStore(this);
  }
}
