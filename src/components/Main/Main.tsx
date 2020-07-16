import * as React from 'react';
import { Menu, Layout, Modal, message } from 'antd';
import { Switch, Route, Link, useLocation, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import Task from '../Task';
import Shop from '../Shop';
import './less/main.less';
import api from '../../config/api';
import { ReactComponent as Logo } from '../IndexPage/images/logo.svg';

const { Header, Sider, Content } = Layout;

const Company = React.lazy(() => import('../Company'));
const MenuComponent = React.lazy(() => import('../Menu'));
const Student = React.lazy(() => import('../DS/StudentList'));
const StudentDetail = React.lazy(() => import('../DS/Detail'));
const navs = [{ name: '学员列表', url: '/student' }];

const adminNavs = [
  { name: '表单', url: '/form' },
  { name: '视图', url: '/view' },
  { name: '任务列表', url: '/task' },
  { name: '店铺列表', url: '/shop' },
  { name: '菜单', url: '/menu' },
  { name: '公司', url: '/company' },
];

interface User {
  name: string;
  username: string;
  unionId?: string;
}

const Main: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [collapsed, setCollapsed] = React.useState(false);
  const [bindUrl, setBindUrl] = React.useState<string>();
  const location = useLocation();
  const match = useRouteMatch();

  const init = async () => {
    const userRes = await axios.get<User>(api.getAccountInfo);
    setUser(userRes.data);
    if (!userRes.data.unionId) {
      const res = await axios.get(api.getBindWeChatQRCode);
      setBindUrl(res.data.url);
      const interval = setInterval(async () => {
        const { data } = await axios.get<User>(api.getAccountInfo);
        if (data.unionId) {
          clearInterval(interval);
          message.success('绑定成功');
          setBindUrl('');
          setUser(data);
        }
      }, 1000);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  if (!user) {
    return <div />;
  }

  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link to="/">
            <Logo fill="#1890ff" />
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]}>
          {navs.map((item) => (
            <Menu.Item key={`${match.url}${item.url}`} icon={<UserOutlined />}>
              <Link to={`${match.url}${item.url}`}>{item.name}</Link>
            </Menu.Item>
          ))}
          {user &&
            user.username === 'admin' &&
            adminNavs.map((item) => (
              <Menu.Item key={`${match.url}${item.url}`} icon={<UserOutlined />}>
                <Link to={`${match.url}${item.url}`}>{item.name}</Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Layout style={{ overflow: 'auto' }}>
        <Header className="header">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div style={{ flex: 1 }} />
          <div className="header-user">{user.name}</div>
        </Header>
        <Content style={{ margin: 24, minHeight: 'auto' }}>
          <Switch>
            <Route exact path={`${match.url}/task`} component={Task} />
            <Route exact path={`${match.url}/shop`} component={Shop} />
            <Route exact path={`${match.url}/company`} component={Company} />
            <Route exact path={`${match.url}/menu`} component={MenuComponent} />
            <Route exact path={`${match.url}/student`} component={Student} />
            <Route exact path={`${match.url}/student/:id`} component={StudentDetail} />
          </Switch>
        </Content>
      </Layout>
      <Modal
        visible={!!bindUrl}
        footer={null}
        closable={false}
        bodyStyle={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <img src={bindUrl} alt="" />
        <div style={{ color: '#f00' }}>请使用微信扫描绑定帐号</div>
      </Modal>
    </Layout>
  );
};

export default Main;
