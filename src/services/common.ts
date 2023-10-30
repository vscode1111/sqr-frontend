export function getBaseUrl() {
  return process.env.host ?? `${window.location.href}api`;
}
