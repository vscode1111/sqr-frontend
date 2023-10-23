import axios from 'axios';
import { SecurityStatusResponse } from '~types';
import { getBaseUrl } from './common';

export class ControlService {
  async fetchSecurityStatus(): Promise<SecurityStatusResponse> {
    const response = await axios.get(`${getBaseUrl()}/security/status`);
    return response.data;
  }

  async sendSecurityShare(share: string): Promise<SecurityStatusResponse> {
    const response = await axios.post(`${getBaseUrl()}/security/send-share`, { share });
    return response.data;
  }

  async stopSecurity(): Promise<SecurityStatusResponse> {
    const response = await axios.delete(`${getBaseUrl()}/security/stop`, {
      withCredentials: false,
    });
    return response.data;
  }
}
