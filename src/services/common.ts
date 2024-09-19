import { AxiosRequestConfig } from 'axios';
import { stores } from '~stores';

export function getBaseUrl(route: string): string {
  return process.env.host ?? `${window.location.origin}/${route}/api`;
}

export function getCommonConfig(): AxiosRequestConfig {
  const token = stores.auth.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
