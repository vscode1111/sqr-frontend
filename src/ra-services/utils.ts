import { CreateParams } from "ra-core";
import { httpClientToken } from "./http";

export async function createUpdateData(params: CreateParams) {
  let data = params.data;
  return data;
}

export async function deleteRecord(
  apiUrl: string,
  resource: string,
  id: string | number,
) {
  const response = await httpClientToken(`${apiUrl}/${resource}/${id}`, {
    method: "DELETE",
  });
  return response;
}
