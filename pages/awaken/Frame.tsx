import Image from 'next/image';
import { ui } from './awaken.json';
import ChdImage from './ChdImage';

interface FrameProps {
  baseImageFilename: string;
  baseObjectSizeX: number;
  baseObjectSizeY: number;
}

function Frame({ baseImageFilename, baseObjectSizeX, baseObjectSizeY }: FrameProps) {
  const url = `https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop`;

  const edgeWidth = 77;
  const width = 500;

  return (
    <div
      className="bg-[#f00] h-screen relative"
      style={{
        width,
        height: 500,
      }}
    >
      <div className="flex">
        <div
          style={{
            width: edgeWidth,
            height: 28,
            backgroundImage: `url(${url},x_${0},y_${0},w_${77},h_${28})`,
          }}
        />
        <div
          style={{
            width,
            height: 28,
            backgroundImage: `url(${url},x_${78},y_${0},w_${4},h_${28})`,
            backgroundRepeat: 'repeat-x',
            position: 'absolute',
            left: edgeWidth,
            right: edgeWidth,
          }}
        />
        <div
          style={{
            width: edgeWidth,
            height: 28,
            backgroundImage: `url(${url},x_${84},y_${0},w_${77},h_${28})`,
            position: 'absolute',
            right: 0,
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <div
          style={{
            width: 28,
            height: 28,
            backgroundImage: `url(${url},x_${0},y_${34},w_${28},h_${4})`,
            backgroundRepeat: 'repeat-y',
          }}
        />
        <div
          style={{
            width: 28,
            height: 28,
            backgroundImage: `url(${url},x_${132},y_${34},w_${28},h_${4})`,
            backgroundRepeat: 'repeat-y',
          }}
        />
      </div>
      <div
        style={{
          width: edgeWidth,
          height: 28,
          backgroundImage: `url(${url},x_${0},y_${34},w_${77},h_${28})`,
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}
      />
      <div
        style={{
          width,
          height: 28,
          backgroundImage: `url(${url},x_${78},y_${34},w_${4},h_${28})`,
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
          height: 28,
          backgroundImage: `url(${url},x_${84},y_${34},w_${77},h_${28})`,
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
}

export default Frame;
