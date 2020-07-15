/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import TweenOne from 'rc-tween-one';
import { Menu } from 'antd';
import { ReactComponent as Logo } from './images/logo.svg';

const { Item } = Menu;

interface NavProps {
  isMobile: boolean;
}

const Nav: React.FC<NavProps> = ({ isMobile }) => {
  const [phoneOpen, setPhoneOpen] = React.useState<any>(undefined);
  const phoneClick = () => {
    setPhoneOpen(!phoneOpen);
  };

  const moment = phoneOpen === undefined ? 300 : undefined;
  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      className="header0 home-page-wrapper"
    >
      <div className={`home-page${phoneOpen ? ' open' : ''}`}>
        <TweenOne
          className="header0-logo"
          animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
        >
          <Logo fill="#fff" style={{ verticalAlign: 'middle' }} />
        </TweenOne>
        {isMobile && (
          <div className="header0-mobile-menu" onClick={() => phoneClick()}>
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          className="header0-menu"
          animation={
            isMobile
              ? {
                  height: 0,
                  duration: 300,
                  onComplete: (e) => {
                    if (phoneOpen) {
                      e.target.style.height = 'auto';
                    }
                  },
                  ease: 'easeInOutQuad',
                }
              : undefined
          }
          moment={moment}
          reverse={!!phoneOpen}
        >
          <Menu mode={isMobile ? 'inline' : 'horizontal'} theme="dark">
            <Item className="header0-item">
              <a href="/" className="header0-item-block header0-item">
                首页
              </a>
            </Item>
            <Item className="header0-item">
              <a href="/" className="header0-item-block header0-item">
                定价
              </a>
            </Item>
            <Item className="header0-item">
              <a href="/" className="header0-item-block header0-item">
                关于我们
              </a>
            </Item>
          </Menu>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default Nav;
