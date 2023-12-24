import Image from 'next/image';
import { ui } from './awaken.json';
import ChdImage from './ChdImage';
function Awaken() {
  console.log(ui.window.subAttr);

  const { baseImageFilename, baseObjectSizeX } = ui.window.subAttr;

  const renderImage = (item: any) => {
    return item.window?.map((item: any, index: any) => {
      if (item.subAttr.baseImageFilename) {
        return <ChdImage key={index} {...(item.subAttr as any)} />;
      } else {
        return (
          <div
            key={index}
            className={item.classId}
            style={{
              width: item.baseObjectSizeX,
              height: item.baseObjectSizeY,
              // position: 'absolute',
              // left: item.baseCoopX,
              // top: item.baseCoopY,
            }}
          >
            {renderImage(item)}
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-[#f00] h-screen">
      {/* {ui.window.window[2].window?.map(
        (item: any, index) =>
          item.subAttr.baseImageFilename && <ChdImage key={index} {...(item.subAttr as any)} />
      )} */}
      <ChdImage {...(ui.window.subAttr as any)} />
      {/* <Image
        style={{
          position: 'absolute',
          // left: baseCoopX,
          // top: baseCoopY,
          width: 1000,
          height: 28,
          // height: 1,
        }}
        src={`https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${0},y_${0},w_${78},h_${28}`}
        width={78}
        height={28}
        alt=""
      /> */}
      <div className="flex">
        <div
          style={{
            width: 77,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${0},y_${0},w_${77},h_${28})`,
          }}
        />
        <div
          style={{
            width: 500,
            // width: baseObjectSizeX - 28 * 2,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${78},y_${0},w_${4},h_${28})`,
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div
          style={{
            width: 77,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${84},y_${0},w_${77},h_${28})`,
          }}
        />
      </div>
      <div className="flex">
        <div
          style={{
            width: 77,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${0},y_${34},w_${77},h_${28})`,
          }}
        />
        <div
          style={{
            width: 500,
            // width: baseObjectSizeX - 28 * 2,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${78},y_${34},w_${4},h_${28})`,
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div
          style={{
            width: 77,
            height: 28,
            backgroundImage: `url(https://oss.hengzwl.com/chd/${baseImageFilename}?x-oss-process=image/crop,x_${84},y_${34},w_${77},h_${28})`,
          }}
        />
      </div>
      {/* <Image
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
    /> */}
      {/* {renderImage(ui.window)} */}
      {/* <ChdImage {...(ui.window.window[0].subAttr as any)} /> */}
      {/* <ChdImage {...(ui.window.window[1].subAttr as any)} /> */}
      {/* <ChdImage {...(ui.window.window[2].window[0] as any)} /> */}
    </div>
  );
}

export default Awaken;
