import useSWR from 'swr';

const useFetch = <T,>(url: string) => {
  const { data, isLoading } = useSWR<BaseResponse<T>>(url);
  return { data, isLoading };
};

export default useFetch;
