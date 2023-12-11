import React, { useMemo, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Table,
  Tabs,
  TabsProps,
  Typography,
  Watermark,
} from 'antd';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';
import { Icon, Item } from '@/components';
import downloadjs from 'downloadjs';
import { ClassMap } from '@/constants';
import { ClassSkill, ClassSkillItem, Role } from '@/types';
import _ from 'lodash';
import { getMap } from '@/utils';

const Grade = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'R',
} as const;

const { Paragraph, Text } = Typography;

function CItem(props: any) {
  return (
    <div className="grid grid-cols-4 gap-2 h-full overflow-y-auto">
      {props.items.map((item: any, index: number) => (
        <div key={index}>
          <Icon {...item} />
          <Text className="block">
            {item.type} {item.name || item.id} x{item.count} {item.score} {item.totalEnchantScore}
          </Text>
          {item.key}
          {item.enchants.map((p: any, childIndex: number) => (
            <Text className="block" type="secondary" key={childIndex}>
              {p.description} {p.id} <Text>{p.score}</Text> {p.max}
            </Text>
          ))}
          {Boolean(item.petPotential) && (
            <Text className="block" type="warning">
              潜能 {(Grade as any)[item.petPotential.grade]}：{item.petPotential.description}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
}

function toShowClass(skills: ClassSkillItem[]) {
  const result: ClassSkillItem[] = [];
  const itemMap = _.groupBy(skills, 'gridIndex');
  const max = _.maxBy(skills, 'gridIndex')!.gridIndex || 0;
  for (let i = 1; i <= max; i++) {
    if (itemMap[i]) {
      result.push(itemMap[i][0]);
    } else {
      result.push({ id: 1000000 + i } as ClassSkillItem);
    }
  }
  return result;
}

function Detail() {
  const router = useRouter();
  const { id } = useParams() || {};
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useFetch<Role>(id && `/api/chd/info/skill/${id}`);
  const { data: skills } = useFetch<ClassSkill[]>(
    data && `/api/chd/class/${data.currentClassId}/skill`
  );

  const skillMap = useMemo(
    () =>
      data
        ? getMap((data.currentClassId == data.classId ? data.skills : data.subSkills) || [])
        : {},
    [data]
  );

  // const dataSource = useMemo(() => {
  //   if (!skills) {
  //     return [];
  //   }
  //   const result: ClassSkillItem[] = [];
  //   const itemMap = _.groupBy(skills, 'gridIndex');
  //   const max = _.maxBy(skills, 'gridIndex')!.gridIndex || 0;
  //   for (let i = 1; i <= max; i++) {
  //     if (itemMap[i]) {
  //       result.push(itemMap[i][0]);
  //     } else {
  //       result.push({ id: 1000000 + i } as ClassSkillItem);
  //     }
  //   }
  //   return result;
  // }, [skills]);

  if (!data || !skills) {
    return;
  }

  const handleExport = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }
  };

  const title = `${data.server} ${data.name} ${ClassMap[data.currentClassId]} 加点`;

  return (
    <div className="flex  gap-4 px-4">
      <div className="fixed bottom-5 right-5">
        <Button onClick={handleExport}>Export</Button>
      </div>
      <div ref={ref} className="flex py-3 px-4 flex-col flex-wrap w-[400px] mx-auto">
        <Watermark content={`${title} 由恒记APP导出`}>
          <div className="text-center mb-2">{title}</div>
          {skills.map((skill) => (
            <div key={skill.id} className="flex flex-col gap-2">
              <Text>{skill.name}</Text>
              <div className="grid grid-cols-6 gap-2">
                {toShowClass(skill.items).map((item) =>
                  item.icon ? (
                    <div
                      key={item.id}
                      className="flex flex-col flex-1 items-center justify-center "
                    >
                      <div className="relative">
                        <Icon icon={item.icon} iconIndex={item.iconIndex} />
                        {!skillMap[item.id] && (
                          <Icon
                            className="absolute top-0"
                            icon={item.disableIcon}
                            iconIndex={item.disableIconIndex}
                          />
                        )}
                      </div>
                      {skillMap[item.id] ? (
                        <Text>
                          {skillMap[item.id].slv}/{skillMap[item.id].maxSlv}
                        </Text>
                      ) : (
                        <Text>??</Text>
                      )}
                    </div>
                  ) : (
                    <div key={item.id} />
                  )
                )}
              </div>
            </div>
          ))}
        </Watermark>
      </div>
    </div>
  );
}

export default Detail;
