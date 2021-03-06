import * as React from 'react';
import { useParams } from 'react-router';
import qs from 'qs';
import { Button, Space } from 'antd';
import { getAuthorizeUrl } from './utils';
import logo from '../../images/logo.png';
import './less/invite.less';

const redirectUri = 'https://m.hengzwl.com/wechat/invite/result';

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
        <div style={{ fontSize: 18 }}>邀您体验 恒记 APP</div>
      </Space>
      <Button block type="primary" size="large" style={{ marginTop: 50 }} onClick={handleReceive}>
        立即体验
      </Button>
    </div>
  );
};

export default Invite;
