import queryString from 'query-string';
import simpleRestProvider from 'ra-data-simple-rest';
import { DataProvider, fetchUtils } from 'react-admin';
import { createPath } from '~utils';
import { httpClient, httpClientToken } from './http';
import { deleteRecord } from './utils';

const { stringify } = queryString;

export const dataProvider0 = simpleRestProvider('http://test');

export function daServer(apiUrl: string): DataProvider {
  return {
    getList: async (resource, params) => {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
      const { field, order } = params.sort || { field: 'id', order: 'ASC' };

      const url = createPath({
        endpoint: `${apiUrl}/${resource}`,
        queryParams: { page, size: perPage, sort: `${field} ${order}` },
      });

      const { json } = await httpClient(url);
      return json;
    },

    getOne: async (resource, params) => {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
      return {
        data: json,
      };
    },

    getMany: async (resource, params) => {
      const query: { id: string[] } = {
        id: params.ids as string[],
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      const { json } = await httpClient(url);
      return {
        data: json.content,
      };
    },

    getManyReference: async (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...fetchUtils.flattenObject(params.filter),
        [params.target]: params.id,
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      const { headers, json } = await httpClient(url);
      if (!headers.has('x-total-count')) {
        throw new Error(
          'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?',
        );
      }

      return {
        data: json,
        total: parseInt(headers?.get('x-total-count')?.split('/').pop() || '0', 10),
      };
    },

    update: async (resource, params) => {
      const { id, data } = params;

      const { json } = await httpClientToken(`${apiUrl}/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      return json;
    },

    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    updateMany: async (resource, params) => {
      const responses = await Promise.all(
        params.ids.map((id) =>
          httpClientToken(`${apiUrl}/${resource}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
          }),
        ),
      );

      return {
        data: responses.map(({ json }) => json.id),
      };
    },

    create: async (resource, params) => {
      const { data } = params;

      console.log(111, data);

      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      return json;
    },

    delete: async (resource, params) => {
      const { json } = await deleteRecord(apiUrl, resource, params.id);
      return {
        data: json,
      };
    },

    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    deleteMany: async (resource, params) => {
      return Promise.all(params.ids.map((id) => deleteRecord(apiUrl, resource, id))).then(
        (responses) => ({ data: responses.map(({ json }) => json.id) }),
      );
    },
  };
}
