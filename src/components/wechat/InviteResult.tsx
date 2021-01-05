import * as React from 'react';
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';

const Wechat: React.FC = () => {
  const [user, setUser] = React.useState<any>();
  const { code, state } = qs.parse(window.location.search.substr(1));

  React.useEffect(() => {
    (async () => {
      const res = await axios.post('/api/wechat/invite/signup', { code, state });
      if (res.code === 0) {
        setUser(res.data);
      } else if (res.message) {
        message.error(res.message);
      }
    })();
  }, [code, state]);

  return <div>{user && <div>{user.name}</div>}</div>;
};

export default Wechat;
