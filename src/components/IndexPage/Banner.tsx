import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

const Banner5: React.FC = () => {
  return (
    <div className="home-page-wrapper banner5">
      <div className="home-page banner5-page">
        <QueueAnim
          type="bottom"
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          className="banner5-title-wrapper"
        >
          <h1 key="title" className="banner5-title">
            云系统
          </h1>
          <div key="explain" className="banner5-explain">
            简单 快捷 高效
          </div>
          <div key="content" className="banner5-content">
            详细说明
          </div>
          <div key="button" className="banner5-button-wrapper">
            <Button className="banner5-button" type="primary" href="dashboard">
              开始使用
            </Button>
          </div>
        </QueueAnim>
        <TweenOne
          animation={{
            y: '+=30',
            opacity: 0,
            type: 'from',
            ease: 'easeOutQuad',
          }}
          className="banner5-image"
        >
          <img
            src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*-wAhRYnWQscAAAAAAAAAAABkARQnAQ"
            width="100%"
            alt="img"
          />
        </TweenOne>
      </div>
    </div>
  );
};

export default Banner5;
