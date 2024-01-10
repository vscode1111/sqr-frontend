import axios from 'axios';
import { SecurityStatusResponse, ServiceStats, VersionResponse } from '~types';
import { getBaseUrl, getCommonConfig } from './common';

export class ControlService {
  async fetchVersion(): Promise<VersionResponse> {
    const { data } = await axios.get(`${getBaseUrl()}/version`, getCommonConfig());
    return data;
  }

  async fetchSecurityStatus(): Promise<SecurityStatusResponse> {
    const { data } = await axios.get(`${getBaseUrl()}/security/status`, getCommonConfig());
    return data;
  }

  async sendSecurityShare(share: string): Promise<SecurityStatusResponse> {
    const { data } = await axios.post(
      `${getBaseUrl()}/security/send-share`,
      {
        share,
      },
      getCommonConfig(),
    );
    return data;
  }

  async stopSecurity(): Promise<SecurityStatusResponse> {
    const { data } = await axios.delete(`${getBaseUrl()}/security/stop`, {
      ...getCommonConfig(),
      withCredentials: false,
    });
    return data;
  }

  async fetchStats(): Promise<ServiceStats> {
    const { data } = await axios.get(`${getBaseUrl()}/indexer/bsc/stats`, getCommonConfig());
    return data;
  }

  async softReset(): Promise<ServiceStats> {
    const { data } = await axios.delete(`${getBaseUrl()}/indexer/soft-reset`, getCommonConfig());
    return data;
  }

  async hardReset(): Promise<ServiceStats> {
    const { data } = await axios.delete(`${getBaseUrl()}/indexer/hard-reset`, getCommonConfig());
    return data;
  }
}
