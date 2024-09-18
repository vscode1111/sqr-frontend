import axios from 'axios';
import { ROUTE } from '~constants';
import { NetworkRecord, SecurityStatusResponse, ServiceStats, VersionResponse } from '~types';
import { getBaseUrl, getCommonConfig } from './common';

export class ControlService {
  private route: string;
  constructor() {
    this.route = '?';
  }

  setRoute(route: ROUTE) {
    this.route = route;
  }

  getRoute() {
    return this.route;
  }

  async fetchVersion(): Promise<VersionResponse> {
    const { data } = await axios.get(`${getBaseUrl(this.route)}/version`, getCommonConfig());
    return data;
  }

  async fetchSecurityStatus(): Promise<SecurityStatusResponse> {
    const { data } = await axios.get(
      `${getBaseUrl(this.route)}/security/status`,
      getCommonConfig(),
    );
    return data;
  }

  async sendSecurityShare(share: string): Promise<SecurityStatusResponse> {
    const { data } = await axios.post(
      `${getBaseUrl(this.route)}/security/send-share`,
      {
        share,
      },
      getCommonConfig(),
    );
    return data;
  }

  async stopSecurity(): Promise<SecurityStatusResponse> {
    const { data } = await axios.delete(`${getBaseUrl(this.route)}/security/stop`, {
      ...getCommonConfig(),
      withCredentials: false,
    });
    return data;
  }

  async fetchStats(): Promise<ServiceStats> {
    const { data } = await axios.get(
      `${getBaseUrl(this.route)}/indexer/bsc/stats`,
      getCommonConfig(),
    );
    return data;
  }

  async fetchContractTypes(): Promise<string[]> {
    const { data } = await axios.get(
      `${getBaseUrl(this.route)}/db/contract-types`,
      getCommonConfig(),
    );
    return data;
  }

  async fetchNetworks(): Promise<NetworkRecord[]> {
    const { data } = await axios.get(`${getBaseUrl(this.route)}/db/networks`, getCommonConfig());
    return data;
  }

  async reboot(): Promise<ServiceStats> {
    const { data } = await axios.delete(`${getBaseUrl(this.route)}/reboot`, getCommonConfig());
    return data;
  }

  async softReset(): Promise<ServiceStats> {
    const { data } = await axios.delete(
      `${getBaseUrl(this.route)}/indexer/soft-reset`,
      getCommonConfig(),
    );
    return data;
  }

  async hardReset(): Promise<ServiceStats> {
    const { data } = await axios.delete(
      `${getBaseUrl(this.route)}/indexer/hard-reset`,
      getCommonConfig(),
    );
    return data;
  }
}
