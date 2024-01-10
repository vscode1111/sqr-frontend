export type SecurityStatusType = 'waiting' | 'running' | 'error';

export interface VersionResponse {
  name: string;
  version: string;
}

export interface SecurityStatusResponse {
  status: SecurityStatusType;
  sharesCount: number;
  sharesThreshold: number;
}

export interface ServiceStats {
  indexer: Indexer;
  tasks: Indexer;
  metrics: Metrics;
  db: DB;
}

export interface DB {
  _events: number;
  transactionItems: number;
}

export interface Indexer {
  executing: boolean;
  successCount: number;
  errorCount: number;
  executionTime: number;
  providerRequests: number;
  syncBlockNumber?: number;
  lastSuccess: Date;
  runningTasks?: number[];
}

export interface Metrics {
  executing: boolean;
  successCount: number;
  errorCount: number;
  executionTime: number;
  lastSuccess: Date;
  data: any;
}
