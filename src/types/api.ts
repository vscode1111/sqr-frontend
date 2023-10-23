export type SecurityStatusType = 'waiting' | 'running' | 'error';

export interface SecurityStatusResponse {
  status: SecurityStatusType;
  sharesCount: number;
  sharesThreshold: number;
}
