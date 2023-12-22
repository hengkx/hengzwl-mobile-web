import React, { useMemo } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { Button, Descriptions, DescriptionsProps, Table, Tabs, TabsProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';
import { AccountInfo, Item } from '@/types';
import {
  ClassTypeMap,
  MagicExcludeTypes,
  PhyExcludeTypes,
  StatusMap,
  StatusScoreMap,
} from '@/constants';
import _ from 'lodash';
import { CalcScore, format } from '@/utils';

const Grade = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'R',
} as const;

const { Paragraph, Text } = Typography;

function Item({ type, ...props }: any) {
  const renderItem = (item: any, index: number) => {
    const status = [...item.status, ...item.chaosStatuses, ...item.enchants];
    // const group = _.groupBy(status, 'effectType');
    return (
      <div key={index}>
        <Text className="block">
          {item.type}-{item.subType}-{item.posId1}-{item.id} {item.name || item.id} x{item.count}{' '}
          {item.score}
        </Text>

        {item.mergedStatus ? (
          item.mergedStatus.map((p: any, childIndex: number) => (
            <Text className="block" type="secondary" key={childIndex}>
              {format(StatusMap[p.effectType], p.value)}
              <Text> {p.score}</Text> {p.effectType}
            </Text>
          ))
        ) : (
          <div>
            {item.status.map((p: any, childIndex: number) => (
              <Text className="block" type="secondary" key={childIndex}>
                {p.description} {p.id} <Text> {StatusScoreMap[p.id] * p.value}</Text>
              </Text>
            ))}
            {item.chaosStatuses.map((p: any, childIndex: number) => (
              <Text className="block" type="secondary" key={childIndex}>
                {p.description} <Text>{StatusScoreMap[p.effectType] * p.value}</Text> effectType{' '}
                {p.effectType}
              </Text>
            ))}
            {item.enchants.map((p: any, childIndex: number) => (
              <Text className="block" type="secondary" key={childIndex}>
                {p.description} <Text>{StatusScoreMap[p.effectType] * p.value}</Text> effectType{' '}
                {p.effectType}
              </Text>
            ))}
          </div>
        )}

        {Boolean(item.petPotential) && (
          <Text className="block" type="warning">
            潜能 {(Grade as any)[item.petPotential.grade]}：{item.petPotential.description}
          </Text>
        )}
      </div>
    );
  };
  return (
    <div className="grid grid-cols-4 gap-2 h-full overflow-y-auto">
      {props.items.map((item: any, index: number) => renderItem(item, index))}
    </div>
  );
}

const ShowSoleIds = [43052105, 43052205, 43060505, 43060605, 430110616];

function Detail() {
  const router = useRouter();
  const { id } = useParams() || {};

  const { data } = useFetch<AccountInfo>(id && `/api/chd/info/${id}`);

  const armors = useMemo(() => {
    if (data) {
      return CalcScore(_.uniqBy(data.armors, 'key'), ClassTypeMap[data.classId]);
    }
    return [];
  }, [data]);

  const accessories = useMemo(() => {
    if (data) {
      const items = CalcScore(_.uniqBy(data.accessories, 'key'), ClassTypeMap[data.classId]);
      return _.orderBy(items, 'score', 'desc');
    }
    return [];
  }, [data]);

  const weapons = useMemo(() => {
    if (data) {
      const items = CalcScore(_.uniqBy(data.weapons, 'key'), ClassTypeMap[data.classId]);
      return _.orderBy(items, 'score', 'desc');
    }
    return [];
  }, [data]);

  const showTradeItems = useMemo(() => {
    if (data) {
      let items = _.uniqBy(
        data.packages.reduce((prev, curr) => [...prev, ...curr.items], []) as Item[],
        'key'
      );
      items = items.filter((p) => p.trade);
      items = CalcScore(items, ClassTypeMap[data.classId]);
      const wingItems = items.filter(
        (p) => p.posId1 === 5 && (p.id === 430820210 || p.id === 430820110)
      );
      const soleItems = items.filter((p) => p.posId1 === 8 && ShowSoleIds.includes(p.id));
      // 过滤 时装 帽子 下衣 翅膀 脚底 战斗物品
      const otherItems = items.filter(
        (p) =>
          p.score > 10000 &&
          p.posId1 !== 1 &&
          p.posId1 !== 4 &&
          p.posId1 !== 5 &&
          !(p.subType === 3 && p.posId1 === 8) &&
          p.subType !== 1
      );
      return _.orderBy([...wingItems, ...soleItems, ...otherItems], 'score', 'desc');
    }
  }, [data]);

  const gifts = useMemo(() => {
    if (data?.gifts) {
      const group = _.groupBy(data.gifts, 'id');
      return Object.keys(group).map((key) => ({
        ...group[key][0],
        count: _.sumBy(group[key], 'count'),
      }));
    }
    return [];
  }, [data]);

  if (!data) {
    return;
  }

  console.log(gifts);
  const items: TabsProps['items'] = [
    {
      key: 'showTradeItems',
      label: 'showTradeItems',
      children: <Item items={showTradeItems} />,
    },
    {
      key: '防具',
      label: '防具',
      // children: <Item items={_.uniqBy(_.orderBy(armors, 'score', 'desc'), 'posId1')} />,
      children: <Item items={_.orderBy(armors, 'score', 'desc')} />,
      // children: <Item items={_.orderBy(weapons, 'score', 'desc')} />,
    },
    // {
    //   key: 'title',
    //   label: '称号',
    //   children: (
    //     <div className="h-[850px] overflow-y-auto">
    //       {data.titles.map((collect) => (
    //         <div key={collect.id}>
    //           <Text>{collect.name}</Text>
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      key: 'collect',
      label: '图鉴',
      children: (
        <div>
          <Text strong>
            激活套装：{data.collectSetCount} 激活数：{data.collectCount}
          </Text>
          {data.collects.map((collect) => (
            <div key={collect.id}>
              <Text type={collect.active ? undefined : 'secondary'}>{collect.name}</Text>
              {collect.activeCount !== collect.totalCount && (
                <Text type="secondary">
                  [{collect.activeCount}/{collect.totalCount}]
                </Text>
              )}
            </div>
          ))}
        </div>
      ),
    },
    // {
    //   key: 'pet111',
    //   label: '觉醒石',
    //   children: <Item items={data.packages.find((p) => p.type === '觉醒石').items} />,
    // },
    { key: 'pet', label: '宠物', children: <Item items={data.pets} /> },
    { key: '守护', label: '守护', children: <Item items={data.guards} /> },
    { key: '首饰', label: '首饰', children: <Item items={accessories} /> },
    // ...data.packages.map((p) => ({
    //   key: p.type,
    //   label: `${p.type}[${p.count}]`,
    //   children: <Item items={p.items} />,
    // })),
  ];
  const scoreItems: DescriptionsProps['items'] = [
    {
      label: '首饰',
      children: data.accessoryScore,
    },
    {
      label: '防具',
      children: data.armorScore,
    },
    {
      label: '宝石',
      children: data.gemScore,
    },
    {
      label: '图鉴',
      children: data.collectScore,
    },
    {
      label: '符文',
      children: data.runeScore,
    },
    {
      label: '手镯',
      children: data.bangleScore,
    },
    {
      label: '胸针',
      children: data.broochScore,
    },
    {
      label: '徽章',
      children: data.badgeScore,
    },
    {
      label: '光环',
      children: data.haloScore,
    },
    {
      label: '勋章',
      children: data.medalScore,
    },
    {
      label: '结晶',
      children: data.crystalScore,
    },
    {
      label: '戒指',
      children: data.ringScore,
    },
    {
      label: '守护',
      children: data.guardScore,
    },
    {
      label: '宠物',
      children: data.petScore,
    },
  ];

  return (
    <div className="h-full overflow-hidden flex gap-4 px-4">
      {/* <div className="py-4 w-52">
        <Descriptions column={1} items={scoreItems} />
      </div> */}
      <Tabs size="small" items={items} style={{ height: '100%', width: 1000 }} />
    </div>
  );
}

export default Detail;
