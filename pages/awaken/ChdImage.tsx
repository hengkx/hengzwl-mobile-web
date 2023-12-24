import Image from 'next/image';
import { memo } from 'react';
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
}

function ChdImage({
  baseImageX,
  baseImageX2,
  baseImageY,
  baseImageY2,
  baseImageFilename,
  baseCoopX,
  baseCoopY,
  baseParent,
}: ChdImageProps) {
  const width = baseImageX2 - baseImageX;
  const height = baseImageY2 - baseImageY;
  return (
    <Image
      className={baseParent}
      style={{
        position: 'absolute',
        left: baseCoopX,
        top: baseCoopY,
        width: width,
        height: height,
      }}
      src={`https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${baseImageX},y_${baseImageY},w_${width},h_${height}`}
      width={width}
      height={height}
      alt=""
    />
  );
}

export default memo(ChdImage);
