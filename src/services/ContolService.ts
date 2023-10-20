import { SecurityStatusResponse } from '@/types';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export class ControlService {
  async fetchSecurityStatus(): Promise<SecurityStatusResponse> {
    const response = await axios.get(`${baseUrl}/security/status`);
    return response.data;
  }

  async sendSecurityShare(share: string): Promise<SecurityStatusResponse> {
    const response = await axios.post(`${baseUrl}/security/set-share`, { share });
    return response.data;
  }

  async stopSecurity(): Promise<SecurityStatusResponse> {
    const response = await axios.delete(`${baseUrl}/security/stop`);
    return response.data;
  }
}
