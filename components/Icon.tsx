import Image from 'next/image';
import React, { memo, useMemo } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface IconProps {
  name?: string;
  icon: string;
  iconIndex: number;
  size?: number;
  width?: number;
  height?: number;
  column?: number;
  scale?: number;
  className?: string;
}

function ChdIcon({
  className,
  name,
  icon,
  iconIndex,
  size = 32,
  column,
  scale = 1,
  ...props
}: IconProps) {
  const width = useMemo(() => props.width || size, [props.width, size]);
  const height = useMemo(() => props.height || size, [props.height, size]);
  const rowCount = useMemo(() => column || (size === 32 ? 16 : 9), [size, column]);

  const x = useMemo(
    () => ((iconIndex % rowCount) - 1 < 0 ? rowCount - 1 : (iconIndex % rowCount) - 1) * width,
    [iconIndex, rowCount, width]
  );

  const y = useMemo(
    () => (Math.ceil(iconIndex / rowCount) - 1) * height,
    [iconIndex, rowCount, height]
  );

  if (!icon) {
    return <div />;
  }

  return (
    <div className={className}>
      <Image
        src={`https://oss.hengzwl.com/chd/${icon.replace(
          ' ',
          '%20'
        )}?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height},1/resize,p_${scale * 100}`}
        style={{
          width: width * scale,
          height: height * scale,
        }}
        width={width * scale}
        height={height * scale}
        alt={name || icon}
      />
      <Text>{name}</Text>
    </div>
  );
}

export default memo(ChdIcon);
