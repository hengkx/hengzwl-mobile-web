import { Layout } from 'antd';
import { FC, ReactNode } from 'react';

const { Content } = Layout;

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout: FC<MyLayoutProps> = ({ children }) => {
  return (
    <Layout className="h-screen">
      <Content className="py-6 px-6">{children}</Content>
    </Layout>
  );
};

export default MyLayout;
