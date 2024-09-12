import { NF } from '~common';

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

export interface ContractDTO {
  id: number;
  networkId: number;
  address: string;
  type: string;
  name: string | null;
  disable: boolean;
  syncBlockNumber: number;
  processBlockNumber: number;
  data: Object | null;
  createdAt: Date;
  updatedAt: Date;
}

export const FContractDTO = NF<ContractDTO>();
