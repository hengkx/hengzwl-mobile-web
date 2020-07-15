import React from 'react';
import { Divider } from 'antd';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className="home-page-wrapper footer0-wrapper">
        <OverPack className="home-page footer0" playScale={0.05}>
          <TweenOne animation={{ y: '+=30', opacity: 0, type: 'from' }} className="copyright">
            <a
              style={{ color: '#999' }}
              href="http://www.beian.miit.gov.cn/"
              rel="noopener noreferrer"
              target="_blank"
            >
              鄂ICP备19031177号-1
            </a>
            <Divider type="vertical" style={{ backgroundColor: '#999' }} />
            <span>©2019-2020&nbsp;襄阳恒志网络科技有限公司 版权所有</span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer;
