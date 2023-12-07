import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { Button, Descriptions, DescriptionsProps, Table, Tabs, TabsProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';

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
