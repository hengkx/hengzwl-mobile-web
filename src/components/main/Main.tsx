import * as React from 'react';
import logo from '../../images/logo.png';
import './less/main.less';

const Main: React.FC = () => (
  <div className="main">
    <img className="logo" src={logo} alt="logo" />
    <div className="title">恒记</div>
    <a className="btn" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.hengzwl.privacy">
      下载APP
    </a>
  </div>
);

export default Main;
