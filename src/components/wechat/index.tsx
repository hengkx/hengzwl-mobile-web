import * as React from 'react';
import axios from 'axios';
import SHA1 from 'crypto-js/sha1';
import qs from 'qs';

const Wechat: React.FC = () => {
  const [user, setUser] = React.useState<any>();
  React.useEffect(() => {
    const { code, state } = qs.parse(window.location.search.substr(1));
    (async () => {
      const res = await axios.get('/wechat/getJSTicket');
      if (res.code === 0) {
        const { ticket } = res.data;
        const params: any = {
          timestamp: Math.round(Date.now() / 1000),
          nonceStr: `${Date.now()}`, // 必须是字符串
          url: window.location.href,
          jsapi_ticket: ticket,
        };
        const temp = Object.keys(params)
          .map((key) => `${key.toLocaleLowerCase()}=${params[key]}`)
          .sort()
          .join('&');
        params.signature = SHA1(temp).toString();
        const wxParams = {
          ...params,
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxf3540142fe43fbd9',
          jsApiList: ['updateAppMessageShareData'],
        };
        wx.config(wxParams);
        const { data } = await axios.get('/wechat/getUserInfo', { params: { code, state } });
        if (data) {
          setUser(data);
          wx.ready(() => {
            // 需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
              title: '任务市场 - 邀您注册',
              desc: '一个会赚钱的APP', // 分享描述
              link: `https://task.hengzwl.com/wx/${data.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: encodeURI('https://task.hengzwl.com/logo.png'),
              success() {
                // 设置成功
              },
            });
          });
        }
      }
    })();
  }, []);

  return <div>{user && <div>{user.name}</div>}</div>;
};

export default Wechat;
