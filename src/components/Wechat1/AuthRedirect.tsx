import * as React from 'react';
import { useParams } from 'react-router';

const appId = 'wxf3540142fe43fbd9';
const redirectUri = 'https://m.hengzwl.com/wechat/auth';

interface Params {
  inviteId?: string;
}

const AuthRedirect: React.FC = () => {
  const { inviteId } = useParams<Params>();

  React.useEffect(() => {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=snsapi_userinfo&state=${inviteId}#wechat_redirect`;
    window.location.href = url;
  }, [inviteId]);

  return <div />;
};

export default AuthRedirect;
