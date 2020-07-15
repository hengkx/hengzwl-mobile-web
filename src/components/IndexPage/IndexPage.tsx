import * as React from 'react';
import { enquireScreen } from 'enquire-js';
import Nav from './Nav';
import Banner5 from './Banner';
// import Content0 from './Content0';
// import Content1 from './Content1';
// import Content3 from './Content3';
import Footer0 from './Footer';
// import { Content00DataSource, Content10DataSource, Content30DataSource } from './data.source';
import './less/antMotionStyle.less';

let mobile: boolean;
enquireScreen((b: boolean) => {
  mobile = b;
});

const IndexPage: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(mobile);

  React.useEffect(() => {
    enquireScreen((b: boolean) => {
      setIsMobile(!!b);
    });
  }, []);

  return (
    <div className="templates-wrapper">
      <Nav isMobile={isMobile} />
      <Banner5 />
      {/* <Content0 dataSource={Content00DataSource} isMobile={isMobile} />
      <Content1 dataSource={Content10DataSource} isMobile={isMobile} />
      <Content3 dataSource={Content30DataSource} isMobile={isMobile} /> */}
      <Footer0 />
    </div>
  );
};

export default IndexPage;
