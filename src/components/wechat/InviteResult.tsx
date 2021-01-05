import * as React from 'react';
import { Button, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import './less/inviteResult.less';

const Wechat: React.FC = () => {
  const { code, state } = qs.parse(window.location.search.substr(1));

  const [user, setUser] = React.useState<any>();
  const [result, setResult] = React.useState<number>();

  React.useEffect(() => {
    (async () => {
      const res = await axios.post('/api/wechat/invite/signup', { code, state });
      setResult(res.code);
      if (res.code === 0) {
        setUser(res.data);
      } else if (res.code !== 2000 && res.message) {
        message.error(res.message);
      }
    })();
  }, [code, state]);

  return (
    <div className="invite-result">
      {user && <div>{user.name}</div>}
      {result === 2000 && <div style={{ fontSize: 18, margin: '30px 0' }}>您已经是恒记用户</div>}
      <Button
        block
        type="primary"
        href="https://a.app.qq.com/o/simple.jsp?pkgname=com.hengzwl.privacy"
      >
        {result === 2000 ? '打开APP' : '下载APP'}
      </Button>
    </div>
  );
};

export default Wechat;
