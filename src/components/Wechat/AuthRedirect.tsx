import * as React from 'react';
import { useParams } from 'react-router';

const appId = 'wxf3540142fe43fbd9';
const redirectUri = 'http://task.hengzwl.com/wechat/auth';

const AuthRedirect = () => {
  const { inviteId } = useParams();
  React.useEffect(() => {
    const state = inviteId ? `inviteId${inviteId}` : '';
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    window.location.href = url;
  }, []);

  return <div />;
};

export default AuthRedirect;
