import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { Button, Descriptions, DescriptionsProps, Table, Tabs, TabsProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';

const classMap = {
  '1': '战士',
  '2': '盾卫',
  '3': '法师',
  '4': '游侠',
  '5': '督军',
  '6': '狂战士',
  '7': '圣殿骑士',
  '8': '武术家',
  '9': '魔法师',
  '10': '吉他手',
  '11': '神射手',
  '12': '火枪手',
  '13': '工程师',
  '14': '机甲师',
  '24': '圣十字军',
  '25': '剑刃舞者',
  '26': '恐怖骑士',
  '27': '修行武者',
  '28': '幻灵师',
  '29': '演奏大师',
  '30': '刺杀者',
  '31': '审判官',
  '32': '星能机师',
  '33': '术士',
  '34': '通灵师',
  '36': '英雄',
  '37': '剑圣',
  '38': '星芒骑士',
  '39': '武道宗师',
  '40': '元素之灵',
  '41': '巨星',
  '42': '风行刺客',
  '43': '魔射手',
  '44': '远古机甲师',
  '45': '通灵领主',
  '46': '卡牌师',
  '47': '高阶卡牌师',
  '49': '天穹卡牌师',
  '50': '黑暗卡牌师',
  '52': '史诗卡牌师',
  '53': '流浪剑客',
  '54': '武士',
  '56': '黑影',
  '57': '修道士',
  '58': '圣执事',
  '60': '神之使者',
  '61': '战锤佣兵',
  '62': '焰之勇者',
  '64': '阿格尼',
  '65': '剑师',
  '66': '封印者',
  '68': '逐暗者',
  '69': '宝石星',
  '70': '长矛手',
  '71': '黑骑士',
  '73': '暗影行者',
  '74': '疾风舞者',
  '75': '唤雨之灵',
  '76': '旅者',
  '77': '破界者',
  '78': '次元守望者',
  '173': '贤者',
  '174': '光明祭司',
  '176': '守护天使',
  '177': '黑暗战士',
  '178': '黑暗剑客',
  '180': '梦魇恶魔',
  '181': '傀儡师',
  '182': '傀儡专家',
  '184': '傀儡宗师',
};

const Grade = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'R',
} as const;

const { Paragraph, Text } = Typography;

function Item(props: any) {
  return (
    <div className="grid grid-cols-4 gap-2 h-full overflow-y-auto">
      {props.items.map((item: any, index: number) => (
        <div key={index}>
          <Text className="block">
            {item.type} {item.name || item.id} x{item.count} {item.score} {item.totalEnchantScore}
          </Text>
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

function Detail() {
  const router = useRouter();
  const { id } = useParams() || {};

  const { data } = useFetch<AccountInfo>(id && `/api/chd/info/${id}`);
  if (!data) {
    return;
  }
  const items: TabsProps['items'] = [
    { key: '宠物', label: '宠物', children: <Item items={data.pets} /> },
    { key: '首饰', label: '首饰', children: <Item items={data.accessories} /> },
    { key: '防具', label: '防具', children: <Item items={data.armors} /> },
    ...data.packages.map((p) => ({
      key: p.type,
      label: `${p.type}[${p.count}]`,
      children: <Item items={p.items} />,
    })),
  ];
  const scoreItems: DescriptionsProps['items'] = [
    {
      label: '防具',
      children: data.armorScore,
    },
    {
      label: '首饰',
      children: data.accessoryScore,
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
  ];

  return (
    <div className="h-full overflow-hidden flex gap-4 px-4">
      <div className="py-4 w-52">
        <Descriptions column={1} title={`${data.name}评分`} items={scoreItems} />
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
      <Tabs size="small" items={items} style={{ height: '100%', width: 1000 }} />
    </div>
  );
}

export default Detail;
