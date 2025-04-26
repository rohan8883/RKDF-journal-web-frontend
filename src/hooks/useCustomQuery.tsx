import {
  useQuery,
  UseQueryResult,
  UndefinedInitialDataOptions,
  QueryKey,
  UseMutationOptions,
  useMutation
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { axios } from '@/lib';

// const APITYPE = {
//   ...apis
// };

// type API = (typeof APITYPE)[keyof typeof APITYPE];
type API = string;

// ===================================================useQuery start=================================================================
type USE_QUERY_TYPE = {
  api: API;
  options: Partial<
    UndefinedInitialDataOptions<unknown, Error, unknown, QueryKey>
  >;
  key?: string;
  value?: any[];
  config?: {
    [key: string]: any;
  };
};

export type QUERY_RESULT<T> = UseQueryResult<T, Error>;
// ==================== fetch data via get method ====================

export const apiFetcherGet = async (url: string, config?: any) => {
  const res = await axios.get(url, {
    ...config
  });
  return res.data;
};

export function useApi<T>({
  key,
  api,
  options,
  value,
  config
}: USE_QUERY_TYPE) {
  const result = useQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => await apiFetcherGet(api, config),
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options
  });
  return result as UseQueryResult<T, Error>;
}

// ==================== fetch data via post method ====================
export function useApiPost<T>({
  key,
  api,
  options,
  value,
  config
}: USE_QUERY_TYPE) {
  const result: UseQueryResult<any, Error> = useQuery<any, Error>({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axios.post(api, {
        ...config
      });
      return res.data;
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options
  });
  return result as UseQueryResult<T, Error>;
}
// ===================================================useQuery end=================================================================

// ==================== useMutation method start ====================

export type USE_MUTATION_TYPE = {
  options?: Promise<
    UseMutationOptions<AxiosResponse<any, any>, Error, void, unknown>
  >;
};

const postApi = (api: API, data: {}) => {
  return axios.post(api, data);
};

export const usePostMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: {} }) => postApi(api, data),
    ...options
  });
};
// ==================== useMutation method end ====================

// =================== usePutMutation method start ====================
const putApi = (api: API, data: {}) => {
  return axios.put(api, data);
};

export const usePutMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: {} }) => putApi(api, data),
    ...options
  });
};
