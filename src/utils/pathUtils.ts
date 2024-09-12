interface PathConfig {
  endpoint: string;
  queryParams?: { [key: string]: string | number | undefined };
}

export function createPath({ endpoint, queryParams }: PathConfig) {
  let searchString = null;
  if (queryParams) {
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((paramName) => {
      if (queryParams[paramName] != null) {
        params.append(paramName, String(queryParams[paramName]));
      }
    });
    searchString = params.toString();
  }
  if (searchString) {
    return `${endpoint}?${searchString}`;
  }
  return endpoint;
}

export type QueryParams = Array<{
  key: string;
  value: string | number | undefined | null;
}>;

export interface PathConfigEx {
  endpoint: string;
  queryParams?: QueryParams;
}

export function createPathEx({ endpoint, queryParams }: PathConfigEx) {
  let searchString = null;
  if (queryParams) {
    const params = new URLSearchParams();
    queryParams.forEach((param) => {
      if (param.value !== undefined && param.value !== null)
        params.append(param.key, String(param.value));
    });
    searchString = params.toString();
  }
  if (searchString) {
    return `${endpoint}?${searchString}`;
  }
  return endpoint;
}
