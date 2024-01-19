import { Buffer } from 'buffer';
import sss from 'shamirs-secret-sharing';

export function getShares(secret: string, shares: number, threshold: number): string[] {
  const bufferSecret = Buffer.from(secret);
  const bufferShares = sss.split(bufferSecret, { shares, threshold });
  return bufferShares.map((share) => share.toString('base64'));
}
