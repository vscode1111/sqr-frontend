import { ControlService } from './ControlService';

export * from './common';
export * from './ControlService';

export const tokenControlService = new ControlService('token');
export const claimControlService = new ControlService('claim');
export const lockupControlService = new ControlService('lockup');
export const stakingControlService = new ControlService('staking');
export const signatureControlService = new ControlService('signature');
export const launchpadControlControlService = new ControlService('launchpad');
