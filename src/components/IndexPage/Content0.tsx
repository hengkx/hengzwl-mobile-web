import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd';
import { OverPack } from 'rc-scroll-anim';

import { getChildrenToRender } from './utils';

interface ContentProps {
  dataSource: any;
  isMobile: boolean;
}

const Content0: React.FC<ContentProps> = ({ dataSource, isMobile, ...props }) => {
  const { wrapper, titleWrapper, page, OverPack: overPackData, childWrapper } = dataSource;

  return (
    <div {...props} {...wrapper}>
      <div {...page}>
        <div {...titleWrapper}>{titleWrapper.children.map(getChildrenToRender)}</div>
        <OverPack {...overPackData}>
          <QueueAnim
            type="bottom"
            key="block"
            leaveReverse
            component={Row}
            componentProps={childWrapper}
          >
            {childWrapper.children.map((block: any, i: number) => {
              const { children: item, ...blockProps } = block;
              return (
                <Col key={i.toString()} {...blockProps}>
                  <div {...item}>{item.children.map(getChildrenToRender)}</div>
                </Col>
              );
            })}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
};

export default Content0;
