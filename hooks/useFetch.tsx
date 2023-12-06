import useSWR from 'swr';

const useFetch = <T,>(url: string | undefined | null) => {
  const { data, isLoading, mutate } = useSWR<BaseResponse<T>>(url);
  return { data: data?.data, mutate, isLoading };
};

export default useFetch;
