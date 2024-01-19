import { ControlService } from './ContolService';

export * from './ContolService';

export const tokenControlService = new ControlService('token');
export const claimControlService = new ControlService('claim');
export const lockupControlService = new ControlService('lockup');
