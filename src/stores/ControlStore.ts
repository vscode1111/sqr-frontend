import { controlService } from '@/services';
import { SecurityStatusResponse } from '@/types';
import { action, makeObservable, observable } from 'mobx';
import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';
import { NormalizedError, StatusFetching } from './types';

export class ControlStore extends BaseStore {
  securityStatus: SecurityStatusResponse;

  fetchStatus: StatusFetching;
  fetchError: NormalizedError;

  sendActionStatus: StatusFetching;
  sendActionError: NormalizedError;

  stopActionStatus: StatusFetching;
  stopActionError: NormalizedError;

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
      sendSecurityShare: action,
      stopSecurity: action,
    });

    this.fetchSecurityStatus();

    setInterval(() => {
      this.fetchSecurityStatus();
    }, 1000);
  }

  async fetchSecurityStatus() {
    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.fetchSecurityStatus();
      },
      'fetchStatus',
      'fetchError',
    );
  }

  async sendSecurityShare(share: string) {
    await this.statusHandler(
      async () => {
        // await sleep(1000);
        this.securityStatus = await controlService.sendSecurityShare(share);
      },
      'sendActionStatus',
      'sendActionError',
    );
  }

  async stopSecurity() {
    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.stopSecurity();
      },
      'stopActionStatus',
      'stopActionError',
    );
  }
}
