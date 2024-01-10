import { action, makeObservable, observable } from 'mobx';
import { controlService } from '~services';
import { SecurityStatusResponse, ServiceStats, VersionResponse } from '~types';
import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';
import { NormalizedError, StatusFetching } from './types';

export class ControlStore extends BaseStore {
  serviceVersion: VersionResponse;
  securityStatus: SecurityStatusResponse;
  serviceStats: ServiceStats | null;

  fetchStatus: StatusFetching;
  fetchError: NormalizedError;

  sendActionStatus: StatusFetching;
  sendActionError: NormalizedError;

  stopActionStatus: StatusFetching;
  stopActionError: NormalizedError;

  softResetActionStatus: StatusFetching;
  softResetActionError: NormalizedError;

  hardResetActionStatus: StatusFetching;
  hardResetActionError: NormalizedError;

  fetchingStatus: boolean;
  fetchingStats: boolean;

  constructor(rootStore: RootStore) {
    super(rootStore);

    this.serviceVersion = {
      name: '',
      version: '',
    };

    this.securityStatus = {
      status: 'waiting',
      sharesCount: 0,
      sharesThreshold: 0,
    };

    this.serviceStats = null;

    this.fetchStatus = 'init';
    this.sendActionStatus = 'init';
    this.stopActionStatus = 'init';
    this.softResetActionStatus = 'init';
    this.hardResetActionStatus = 'init';

    this.fetchingStatus = false;
    this.fetchingStats = false;

    makeObservable(this, {
      // ...baseStoreProps,
      securityStatus: observable,
      serviceStats: observable,
      fetchStatus: observable,
      fetchError: observable,
      sendActionStatus: observable,
      sendActionError: observable,
      stopActionStatus: observable,
      stopActionError: observable,
      softResetActionStatus: observable,
      softResetActionError: observable,
      hardResetActionStatus: observable,
      hardResetActionError: observable,
      fetchVersion: action,
      fetchSecurityStatus: action,
      sendSecurityShare: action,
      stopSecurity: action,
      softReset: action,
      hardReset: action,
    });

    setInterval(() => {
      if (this.fetchingStatus) {
        this.fetchSecurityStatus();
      }
      if (this.fetchingStats) {
        this.fetchStats();
      }
    }, 1000);
  }

  async fetchVersion() {
    await this.statusHandler(
      async () => {
        this.serviceVersion = await controlService.fetchVersion();
      },
      'fetchStatus',
      'fetchError',
    );
  }

  async fetchSecurityStatus() {
    if (this.fetchStatus === 'fetching') {
      return;
    }

    await this.statusHandler(
      async () => {
        this.securityStatus = await controlService.fetchSecurityStatus();
      },
      'fetchStatus',
      'fetchError',
    );
  }

  async fetchStats() {
    if (this.fetchStatus === 'fetching') {
      return;
    }

    await this.statusHandler(
      async () => {
        try {
          this.serviceStats = await controlService.fetchStats();
        } catch (e) {
          this.serviceStats = null;
          throw e;
        }
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

  async softReset() {
    await this.statusHandler(
      async () => {
        await controlService.softReset();
      },
      'softResetActionStatus',
      'softResetActionError',
    );
  }

  async hardReset() {
    await this.statusHandler(
      async () => {
        await controlService.hardReset();
      },
      'hardResetActionStatus',
      'hardResetActionError',
    );
  }
}
