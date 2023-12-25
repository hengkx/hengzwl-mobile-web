import { memo } from 'react';

interface FrameProps {
  baseImageFilename: string;
  baseObjectSizeX: number;
  baseObjectSizeY: number;
  children?: React.ReactNode;
}

function Frame({ baseImageFilename, baseObjectSizeX, baseObjectSizeY, children }: FrameProps) {
  const url = `https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop`;

  const edgeWidth = 77;
  const borderWidth = 28;

  return (
    <div
      className="relative mx-auto"
      style={{
        width: baseObjectSizeX,
        height: baseObjectSizeY,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: edgeWidth,
          height: borderWidth,
          backgroundImage: `url(${url},x_${0},y_${0},w_${77},h_${borderWidth})`,
        }}
      />
      <div
        style={{
          height: borderWidth,
          backgroundImage: `url(${url},x_${78},y_${0},w_${4},h_${borderWidth})`,
          backgroundRepeat: 'repeat-x',
          position: 'absolute',
          left: edgeWidth,
          right: edgeWidth,
          top: 0,
        }}
      />
      <div
        style={{
          width: edgeWidth,
          height: borderWidth,
          backgroundImage: `url(${url},x_${84},y_${0},w_${77},h_${borderWidth})`,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
      <div
        style={{
          backgroundImage: `url(${url},x_${78},y_${34},w_${4},h_${4})`,
          backgroundRepeat: 'repeat',
          position: 'absolute',
          left: edgeWidth,
          right: edgeWidth,
          top: borderWidth,
          bottom: borderWidth,
        }}
      />
      <div
        style={{
          width: edgeWidth,
          backgroundImage: `url(${url},x_${0},y_${34},w_${edgeWidth},h_${4})`,
          backgroundRepeat: 'repeat-y',
          position: 'absolute',
          left: 0,
          top: borderWidth,
          bottom: borderWidth,
        }}
      />
      <div
        style={{
          width: edgeWidth,
          backgroundImage: `url(${url},x_${84},y_${34},w_${edgeWidth},h_${4})`,
          backgroundRepeat: 'repeat-y',
          position: 'absolute',
          right: 0,
          top: 28,
          bottom: 28,
        }}
      />
      <div
        style={{
          width: edgeWidth,
          height: borderWidth,
          backgroundImage: `url(${url},x_${0},y_${34},w_${77},h_${borderWidth})`,
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}
      />
      <div
        style={{
          height: borderWidth,
          backgroundImage: `url(${url},x_${78},y_${34},w_${4},h_${borderWidth})`,
          backgroundRepeat: 'repeat-x',
          position: 'absolute',
          left: edgeWidth,
          right: edgeWidth,
          bottom: 0,
        }}
      />
      <div
        style={{
          width: edgeWidth,
          height: borderWidth,
          backgroundImage: `url(${url},x_${84},y_${34},w_${77},h_${borderWidth})`,
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      />
      {children}
    </div>
  );
}

export default memo(Frame);
