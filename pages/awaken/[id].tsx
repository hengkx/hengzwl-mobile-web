import Image from 'next/image';
import { ui } from './awaken.json';
import ChdImage from './ChdImage';
import { getMap } from '@/utils';
import { AwakenSkill, AwakenTree, ClassMap } from '@/constants';
import { Popover, Watermark } from 'antd';
import { useMemo } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Item } from '@/types';
import { Frame } from '@/components';
import { version } from '../_app';

const awakenTreeMap = getMap(AwakenTree);
const awakenTreeIconMap = getMap(AwakenTree, 'iconInstance') as any;
const awakenSkillMap = getMap(AwakenSkill);

interface RoleAwaken {
  id: string;
  name: string;
  server: string;
  uLv: number;
  awakenUsePoint: number;
  awakenRemainPoint: number;
  currentClassId: keyof typeof ClassMap;
  awakenTrees: number[];
  awakens: Item[];
}

function AwakenPage({ data }: { data: RoleAwaken }) {
  const classId = data.currentClassId;

  const lineInstanceMap = useMemo(() => {
    const lineInstanceIds: number[] = _.flatten(
      data.awakenTrees.map((p) => [
        awakenTreeMap[p].lineInstance1,
        awakenTreeMap[p].lineInstance2,
        awakenTreeMap[p].lineInstance3,
        awakenTreeMap[p].lineInstance4,
      ])
    );
    const group = _.groupBy(lineInstanceIds);
    const result: Record<string, number> = {};
    Object.keys(group).map((p) => {
      result[p] = group[p].length;
    });
    return result;
  }, [data]);

  const renderImage = (item: any) => {
    return item.window?.map((item: any, index: any) => {
      if (item.subAttr.baseImageFilename) {
        if (
          item.subAttr.baseParent === 'Awaken_Skill_Line_Group' &&
          !lineInstanceMap[item.subAttr.baseInstanceid]
        ) {
          return;
        }
        const id = parseInt(item.instanceId.replace('Awaken_Skill_Icon_', ''));
        const awaken = awakenTreeIconMap[item.subAttr.baseInstanceid];
        const skillId = awaken?.[classId];
        const equipItem = awaken?.equipItem;
        const skill = awakenSkillMap[skillId];
        const active = data.awakenTrees.includes(id);
        let equip;
        if (equipItem && active) {
          equip = data.awakens.find((p) => p.index === awaken.itemNumber - 1);
        }
        return (
          <ChdImage
            key={index}
            title={skill?.name}
            content={skill?.description}
            active={data.awakenTrees.includes(id)}
            {...(item.subAttr as any)}
            equipItem={equip}
            equipItemAttr={item.window?.subAttr}
            style={{
              opacity:
                item.subAttr.baseParent === 'Awaken_Skill_Line_Group'
                  ? lineInstanceMap[item.subAttr.baseInstanceid] > 1
                    ? 1
                    : 0.5
                  : 1,
            }}
          />
        );
      } else {
        return (
          <div
            key={index}
            className={item.classId}
            style={{
              width: item.subAttr.baseObjectSizeX,
              height: item.subAttr.baseObjectSizeY,
              position: 'absolute',
              left: item.subAttr.baseCoopX,
              top: item.subAttr.baseCoopY,
            }}
          >
            {renderImage(item)}
          </div>
        );
      }
    });
  };

  return (
    <div className="w-full">
      <Watermark
        content={`${dayjs().format('YYYY-MM-DD')} 由恒记APP导出`}
        font={{ color: 'rgba(255,255,255,0.15)' }}
      >
        <Frame {...ui.window.subAttr}>
          {renderImage(ui.window)}
          <div className="absolute z-[9999] w-full flex items-center justify-center text-black mt-3">
            <div className="font-bold">
              {data.server} {data.name} Lv.{data.uLv} {ClassMap[data.currentClassId]}{' '}
              {data.awakenUsePoint}p
            </div>
          </div>
        </Frame>
      </Watermark>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const res = await fetch(`${axios.defaults.baseURL}/api/chd/info/awaken/${params?.id}`, {
    headers: { version },
  });
  const data = await res.json();
  return { props: { data: data.data } };
};

export default AwakenPage;
