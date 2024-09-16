export function checkIfLocalhost(): boolean {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

export function getMainPath(path: string): string {
  return `/${path}/*`;
}
