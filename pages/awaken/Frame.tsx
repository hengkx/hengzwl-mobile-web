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
    <div className="bg-[#f00] h-screen">
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
          }}
        />
        <div
          style={{
            width: edgeWidth,
            height: 28,
            backgroundImage: `url(${url},x_${84},y_${0},w_${77},h_${28})`,
          }}
        />
      </div>
      <div className="flex">
        <div
          style={{
            width: edgeWidth,
            height: 28,
            backgroundImage: `url(${url},x_${0},y_${34},w_${77},h_${28})`,
          }}
        />
        <div
          style={{
            width,
            height: 28,
            backgroundImage: `url(${url},x_${78},y_${34},w_${4},h_${28})`,
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div
          style={{
            width: edgeWidth,
            height: 28,
            backgroundImage: `url(${url},x_${84},y_${34},w_${77},h_${28})`,
          }}
        />
      </div>
    </div>
  );
}

export default Frame;
