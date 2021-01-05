export function getAuthorizeUrl(redirectUri: string, state?: string): string {
  const appId = 'wxf3540142fe43fbd9';
  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const redirect = `${encodeURIComponent(redirectUri)}`;
  return `${url}?appid=${appId}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
}

export default {};
