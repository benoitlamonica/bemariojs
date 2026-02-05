import { marioState } from '@/core/reactivity';
import axios, { CreateAxiosDefaults, type AxiosInstance } from 'axios';

const api = marioState<AxiosInstance>();

export type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: object;
}

export async function marioFetch<T>(url: string, options?: ApiOptions): Promise<T> {
  const response = await api.value.request<T>({
    method: options?.method || 'GET',
    url,
    headers: options?.headers,
    data: options?.body,
    params: options?.method === 'GET' ? options?.body : undefined,
  });

  return response.data;
}

export function createApi(baseUrl: string, config: Omit<CreateAxiosDefaults, 'baseURL'> = {}) {
  api.value = axios.create({
    baseURL: baseUrl,
    ...config,
  });
}
