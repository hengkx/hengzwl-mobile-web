import { Popover } from 'antd';
import Image from 'next/image';
import { CSSProperties, memo, useMemo } from 'react';
import classNames from 'classnames';
import { Item } from '@/types';
import { Icon } from '@/components';

interface ChdImageProps {
  baseImageX: number;
  baseImageX2: number;
  baseImageY: number;
  baseImageY2: number;
  baseImageFilename: string;
  baseCoopX: number;
  baseCoopY: number;
  baseParent: string;
  baseObjectSizeX: number;
  baseObjectSizeY: number;
  title: string;
  content: string;
  baseInstanceid: number;
  staticFrame1X: number;
  staticFrame1Y: number;
  active?: boolean;
  style?: CSSProperties;
  equipItem?: Item;
  equipItemAttr?: {
    baseCoopX: number;
    baseCoopY: number;
  };
  staticDefaultText: string;
  staticFontColor: string;
  staticAlign: keyof typeof AlignMap;
}

const AlignMap = {
  0: 'left',
  1: 'center',
  2: 'right',
} as const;

function ChdImage({
  baseImageX,
  baseImageX2,
  baseImageY,
  baseImageY2,
  baseImageFilename,
  baseCoopX,
  baseCoopY,
  baseParent,
  title,
  content,
  baseObjectSizeX,
  baseObjectSizeY,
  baseInstanceid,
  staticFrame1X,
  staticFrame1Y,
  active,
  style,
  equipItem,
  equipItemAttr,
  staticDefaultText,
  staticFontColor,
  staticAlign,
}: ChdImageProps) {
  const width = baseImageX2 - baseImageX;
  const height = baseImageY2 - baseImageY;

  const x = useMemo(
    () => (active ? staticFrame1X : baseImageX) || baseImageX,
    [active, baseImageX, staticFrame1X]
  );

  const y = useMemo(
    () => (active ? staticFrame1Y : baseImageY) || baseImageY,
    [active, baseImageY, staticFrame1Y]
  );

  const children = useMemo(
    () => (
      <>
        {baseImageFilename ? (
          <div
            style={{
              width: baseObjectSizeX,
              height: baseObjectSizeY,
              backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height})`,
              backgroundRepeat: 'repeat',
            }}
          />
        ) : (
          <div
            style={{
              width: baseObjectSizeX,
              height: baseObjectSizeY,
              color: `#${staticFontColor}`,
              fontSize: 12,
              textAlign: AlignMap[staticAlign],
            }}
          >
            {staticDefaultText}
          </div>
        )}
        {equipItem && equipItemAttr && (
          <div
            className="absolute"
            style={{ top: equipItemAttr.baseCoopX, left: equipItemAttr.baseCoopY }}
          >
            <Icon icon={equipItem.icon} iconIndex={equipItem.iconIndex} />
          </div>
        )}
      </>
    ),
    [
      baseImageFilename,
      baseObjectSizeX,
      baseObjectSizeY,
      height,
      width,
      x,
      y,
      equipItem,
      equipItemAttr,
      staticDefaultText,
      staticFontColor,
      staticAlign,
    ]
  );

  return (
    <div
      className={classNames('absolute', baseParent, baseInstanceid)}
      style={{
        left: baseCoopX,
        top: baseCoopY,
        // width: width,
        // height: height,
        ...style,
      }}
    >
      {title ? (
        <Popover
          title={title}
          content={
            <div style={{ width: 200 }}>
              {content?.split('\\n').map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          }
          // arrow={false}
          placement="bottomLeft"
        >
          {children}
        </Popover>
      ) : (
        children
      )}
    </div>
  );
}

export default memo(ChdImage);
