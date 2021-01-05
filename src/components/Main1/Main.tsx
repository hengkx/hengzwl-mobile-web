import * as React from 'react';
import logo from './images/logo.png';
import './less/main.less';

const Main: React.FC = () => {
  const handleDownload = () => {
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    if (isAndroid) {
      window.location.href = 'https://privacy.hengzwl.com/app-release.apk';
    } else {
      window.location.href = 'https://apps.apple.com/cn/app/id1523682629';
    }
  };

  return (
    <div className="main">
      <img className="logo" src={logo} alt="logo" />
      <div className="title">恒记</div>

      <button className="btn" onClick={handleDownload} type="button">
        下载APP
      </button>
      <a className="btn" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.hengzwl.privacy">
        下载APP
      </a>
    </div>
  );
};

export default Main;
