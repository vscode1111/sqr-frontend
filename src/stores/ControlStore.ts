import { action, makeObservable, observable } from 'mobx';
import { ControlService } from '~services';
import { SecurityStatusResponse, ServiceStats, VersionResponse } from '~types';
import { RootStore } from './RootStore';
import { BaseStore as StoreBase } from './StoreBase';
import { NormalizedError, StatusFetching } from './types';

export class ControlStore extends StoreBase {
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

  constructor(
    rootStore: RootStore,
    private controlService: ControlService,
  ) {
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
      // ...(baseStoreProps as any),
      // statusHandler: action,
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
        this.serviceVersion = await this.controlService.fetchVersion();
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
        this.securityStatus = await this.controlService.fetchSecurityStatus();
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
          this.serviceStats = await this.controlService.fetchStats();
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
        this.securityStatus = await this.controlService.sendSecurityShare(share);
      },
      'sendActionStatus',
      'sendActionError',
    );
  }

  async stopSecurity() {
    await this.statusHandler(
      async () => {
        this.securityStatus = await this.controlService.stopSecurity();
      },
      'stopActionStatus',
      'stopActionError',
    );
  }

  async softReset() {
    await this.statusHandler(
      async () => {
        await this.controlService.softReset();
      },
      'softResetActionStatus',
      'softResetActionError',
    );
  }

  async hardReset() {
    await this.statusHandler(
      async () => {
        await this.controlService.hardReset();
      },
      'hardResetActionStatus',
      'hardResetActionError',
    );
  }
}
