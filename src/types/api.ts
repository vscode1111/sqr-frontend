export enum BLOG_CATEGORY {
  BLOG = 'BLOG',
  IMPORTANT = 'IMPORTANT',
  NEWS = 'NEWS',
}

export type SecurityStatusType = 'waiting' | 'running' | 'error';

export interface SecurityStatusResponse {
  status: SecurityStatusType;
  sharesCount: number;
  sharesThreshold: number;
}
