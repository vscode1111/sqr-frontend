import { AxiosRequestConfig } from 'axios';
import { stores } from '~stores';

export function getBaseUrl(): string {
  return process.env.host ?? `${window.location.href}claim/api`;
}

export function getCommonConfig(): AxiosRequestConfig {
  const token = stores.auth.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
