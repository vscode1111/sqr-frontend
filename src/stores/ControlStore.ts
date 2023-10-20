import { controlService } from '@/services';
import { SecurityStatusResponse } from '@/types';
import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';
import { NormalizedError, StatusFetching } from './types';

export class ControlStore extends BaseStore {
  public securityStatus: SecurityStatusResponse;

  public fetchStatus: StatusFetching;
  public fetchError: NormalizedError;

  public sendActionStatus: StatusFetching;
  public sendActionError: NormalizedError;

  public stopActionStatus: StatusFetching;
  public stopActionError: NormalizedError;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.securityStatus = {
      status: 'waiting',
      sharesCount: 0,
      sharesThreshold: 0,
    };

    this.fetchStatus = 'init';
    this.sendActionStatus = 'init';
    this.stopActionStatus = 'init';

    makeObservable(this, {
      // ...baseStoreProps,
      securityStatus: observable,
      fetchStatus: observable,
      fetchError: observable,
      sendActionStatus: observable,
      sendActionError: observable,
      stopActionStatus: observable,
      stopActionError: observable,
      fetchSecurityStatus: action,
    });

    this.fetchSecurityStatus();

    setInterval(() => {
      this.fetchSecurityStatus();
    }, 1000);
  }

  public async fetchSecurityStatus() {
    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.fetchSecurityStatus();
      },
      'fetchStatus',
      'fetchError',
    );
  }

  public async sendSecurityShare(share: string) {
    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.sendSecurityShare(share);
      },
      'sendActionStatus',
      'sendActionError',
    );
  }

  public async stopSecurity() {
    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.stopSecurity();
      },
      'stopActionStatus',
      'stopActionError',
    );
  }
}
