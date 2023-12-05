import useSWR from 'swr';

const useFetch = <T,>(url: string | undefined | null) => {
  const { data, isLoading } = useSWR<BaseResponse<T>>(url);
  return { data: data?.data, isLoading };
};

export default useFetch;
