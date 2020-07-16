import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MD5 from 'md5.js';
import { Store } from 'rc-field-form/lib/interface';
import api from '../../config/api';
import './less/signIn.less';

const SignIn: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [verifyId, setVerifyId] = React.useState('');

  const onFinish = async (values: Store) => {
    const res = await axios.post(api.signIn, {
      ...values,
      verify: true,
      verifyId,
      password: new MD5().update(values.password).digest('hex'),
    });
    if (res.code === 0) {
      if (res.data.verifyId) {
        setVerifyId(res.data.verifyId);
      } else {
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      }
    }
  };

  return (
    <div className="account">
      <div className="login-top">用户登录</div>
      <div className="login-main">
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="account" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          {verifyId && (
            <Form.Item name="verifyCode" rules={[{ required: true }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入验证码"
              />
            </Form.Item>
          )}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
                block
              >
                登录
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a
            title="github"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hengkx"
          >
            <GithubOutlined />
          </a>
        </div>
        <div className="footer-copyright">
          Copyright
          <CopyrightOutlined />
          2020 恒志网络
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
