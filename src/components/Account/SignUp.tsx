// import React from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { useHistory, Link } from 'react-router-dom';
// import './less/signIn.less';

// const SignIn = () => {
//   const [form] = Form.useForm();
//   const history = useHistory();
//   const onFinish = (values) => {
//     axios.post(`/api/account/register`, values).then((res) => {
//       if (res.code === 0) {
//         message.success('密码已发送到邮箱');
//         history.push('/account/login');
//       }
//     });
//   };
//   return (
//     <div className="account">
//       <div className="login-top">数据提取</div>
//       <div className="login-main">
//         <Form form={form} onFinish={onFinish}>
//           <Form.Item name="email" rules={[{ required: true }]}>
//             <Input placeholder="邮箱" />
//           </Form.Item>
//           {
//             //   <Form.Item name="password" rules={[{ required: true }]}>
//             //   <Input type="password" placeholder="密码" />
//             // </Form.Item>
//           }
//           <Form.Item shouldUpdate>
//             {() => (
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 disabled={form.getFieldsError().filter(({ errors }) => errors.length).length}
//                 block
//               >
//                 注册
//               </Button>
//             )}
//           </Form.Item>
//           <Form.Item>
//             其他登录方式
//             <Link to="/account/login" className="login-form-forgot" style={{ float: 'right' }}>
//               使用已有账户登录
//             </Link>
//           </Form.Item>
//         </Form>
//       </div>
//       <footer className="footer">
//         <div className="footer-links">
//           <a title="github" target="_blank" href="https://github.com/hengkx">
//             <GithubOutlined />
//           </a>
//         </div>
//         <div className="footer-copyright">
//           Copyright <CopyrightOutlined />
//           2020 hengkx
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SignIn;

import React from 'react';

const SignUp = () => {
  return <div />;
};

export default SignUp;
