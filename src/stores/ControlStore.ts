import { action, makeObservable, observable } from 'mobx';
import { ROUTE } from '~constants';
import { ControlService } from '~services';
import { NetworkRecord, SecurityStatusResponse, ServiceStats, VersionResponse } from '~types';
import { RootStore } from './RootStore';
import { BaseStore as StoreBase } from './StoreBase';
import { NormalizedError, StatusFetching } from './types';

export class ControlStore extends StoreBase {
  serviceVersion: VersionResponse;
  securityStatus: SecurityStatusResponse;
  serviceStats: ServiceStats | null;
  serviceContractTypes: string[] | null;
  serviceNetworks: NetworkRecord[] | null;

  fetchStatus: StatusFetching;
  fetchError: NormalizedError;

  sendActionStatus: StatusFetching;
  sendActionError: NormalizedError;

  stopActionStatus: StatusFetching;
  stopActionError: NormalizedError;

  rebootActionStatus: StatusFetching;
  rebootActionError: NormalizedError;

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
      name: '-',
      version: '-',
    };

    this.securityStatus = {
      status: 'waiting',
      sharesCount: 0,
      sharesThreshold: 0,
    };

    this.serviceStats = null;
    this.serviceContractTypes = null;
    this.serviceNetworks = null;

    this.fetchStatus = 'init';
    this.sendActionStatus = 'init';
    this.stopActionStatus = 'init';
    this.rebootActionStatus = 'init';
    this.softResetActionStatus = 'init';
    this.hardResetActionStatus = 'init';

    this.fetchingStatus = false;
    this.fetchingStats = false;

    makeObservable(this, {
      // ...(baseStoreProps as any),
      // statusHandler: action,
      securityStatus: observable,
      serviceStats: observable,
      serviceContractTypes: observable,
      serviceNetworks: observable,
      fetchStatus: observable,
      fetchError: observable,
      sendActionStatus: observable,
      sendActionError: observable,
      stopActionStatus: observable,
      stopActionError: observable,
      rebootActionStatus: observable,
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

    // setTimeout(() => {
    //   console.log(111, this.controlService.getRouter());
    //   this.fetchNetworks();
    // });

    // observe(this.rootStore.ui, (change) => {
    //   console.log(300, change.type, change.name, 'to', change.object[change.name]);
    //   if (change.type === 'update' && change.name === FUiStore('route')) {
    //     const value = change.object[change.name] as ROUTE;
    //     console.log(301, value);
    //     this.controlService.setRoute(value);
    //   }
    // });

    setInterval(() => {
      if (this.fetchingStatus) {
        this.fetchSecurityStatus();
      }
      if (this.fetchingStats) {
        this.fetchStats();
      }
    }, 1000);
  }

  setRoute(route: ROUTE) {
    this.controlService.setRoute(route);
    this.serviceStats = null;
    this.serviceNetworks = null;
    this.serviceContractTypes = null;
  }

  async fetchVersion() {
    console.log(333, this.rootStore.ui.route);

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

  async fetchContractTypes() {
    await this.statusHandler(
      async () => {
        try {
          this.serviceContractTypes = await this.controlService.fetchContractTypes();
        } catch (e) {
          this.serviceContractTypes = null;
          throw e;
        }
      },
      'fetchStatus',
      'fetchError',
    );
  }

  async fetchNetworks() {
    await this.statusHandler(
      async () => {
        try {
          this.serviceNetworks = await this.controlService.fetchNetworks();
        } catch (e) {
          this.serviceNetworks = null;
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

  async reboot() {
    await this.statusHandler(
      async () => {
        await this.controlService.reboot();
      },
      'softResetActionStatus',
      'softResetActionError',
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
