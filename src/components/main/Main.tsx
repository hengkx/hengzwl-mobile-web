/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import logo from '../../images/logo.png';
import './less/main.less';

const Main: React.FC = () => (
  <div className="main">
    <img className="logo" src={logo} alt="logo" />
    <div className="title">恒记</div>
    <a className="btn" href="https://itunes.apple.com/cn/app/id1523682629">
      苹果下载
    </a>
    <a
      className="btn"
      href="http://file.market.xiaomi.com/download/AppStore/00154380655a2474e8d5db35fd17d922e2b9129db/com.hengzwl.privacy_1.9.51.apk"
    >
      安卓下载已在小米平台上架
    </a>
    <div>已测试在小米手机上可以正常收到通知</div>
    {/* <a className="btn" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.hengzwl.privacy">
      下载APP
    </a> */}
  </div>
);

export default Main;
