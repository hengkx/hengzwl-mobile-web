/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import * as React from 'react';
import logo from '../../images/logo.png';
import './less/main.less';

const Main: React.FC = () => {
  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    axios.get('https://api.privacy.hengzwl.com/api/version').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="main">
      <img className="logo" src={logo} alt="logo" />
      <div className="title">恒记{data.version}</div>
      <a className="btn" href="https://itunes.apple.com/cn/app/id1523682629">
        苹果下载
      </a>
      <a className="btn" href={data.downloadUrl}>
        安卓下载已在小米平台上架
      </a>
      <div>{data.description}</div>
      {/* <a className="btn" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.hengzwl.privacy">
        下载APP
      </a> */}
    </div>
  );
};

export default Main;
