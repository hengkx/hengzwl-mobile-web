import useSWR from 'swr';

interface UserInfo {
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  kyc: boolean;
}

const useUser = () => {
  const { data, isLoading } = useSWR<BaseResponse<UserInfo>>('/api/user/info');
  return { user: data?.data, isUserLoading: isLoading };
};

export default useUser;
