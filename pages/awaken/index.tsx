import Image from 'next/image';
import { ui } from './awaken.json';
import ChdImage from './ChdImage';
function Awaken() {
  console.log(ui.window);

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
    <div>
      {/* {ui.window.window[2].window?.map(
        (item: any, index) =>
          item.subAttr.baseImageFilename && <ChdImage key={index} {...(item.subAttr as any)} />
      )} */}
      <ChdImage {...(ui.window.subAttr as any)} />
      {/* {renderImage(ui.window)} */}
      {/* <ChdImage {...(ui.window.window[0].subAttr as any)} /> */}
      {/* <ChdImage {...(ui.window.window[1].subAttr as any)} /> */}
      {/* <ChdImage {...(ui.window.window[2].window[0] as any)} /> */}
    </div>
  );
}

export default Awaken;
