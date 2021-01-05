import * as React from 'react';
import { useParams } from 'react-router';
import qs from 'qs';
import { Button, Space } from 'antd';
import { getAuthorizeUrl } from './utils';
import logo from '../../images/logo.png';
import './less/invite.less';

const redirectUri = 'https://m.hengzwl.com/wechat/invite/reuslt';

interface Params {
  id: string;
}

const Invite: React.FC = () => {
  const { id } = useParams<Params>();
  const { name } = qs.parse(window.location.search.substr(1));

  const handleReceive = () => {
    window.location.href = getAuthorizeUrl(redirectUri, id);
  };

  return (
    <div className="invite">
      <img className="logo" src={logo} alt="logo" />
      <Space direction="vertical" align="center">
        <div>好友 {name}</div>
        <div style={{ fontSize: 18 }}>送你7天恒记VIP</div>
      </Space>
      <Button block type="primary" size="large" style={{ marginTop: 50 }} onClick={handleReceive}>
        立即领取
      </Button>
    </div>
  );
};

export default Invite;
