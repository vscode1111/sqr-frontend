import { SecurityStatusType } from '@/types';

interface SecurityStatusProps {
  value: SecurityStatusType;
}

export function SecurityStatus({ value }: SecurityStatusProps) {
  return <>{value}</>;
}
