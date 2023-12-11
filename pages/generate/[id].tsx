import React, { useMemo, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card, DescriptionsProps, Typography, Watermark } from 'antd';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';
import { Icon, Item } from '@/components';
import downloadjs from 'downloadjs';
import { ClassMap } from '@/constants';
import { AccountInfo } from '@/types';

const Grade = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'R',
} as const;

const { Paragraph, Text } = Typography;

const ShowSkillIds = [4305001, 4306001, 4307001, 4308001];

function Detail() {
  const router = useRouter();
  const { id } = useParams() || {};
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useFetch<AccountInfo>(id && `/api/chd/info/${id}`);

  const specialItems = useMemo(() => {
    if (data) {
      const items = [
        ...data.guards,
        ...data.caps,
        ...data.crystals,
        ...data.badges,
        ...data.runes,
        ...data.medals,
      ].filter((p) => p.score > 0);
      if (data.halos.length > 0) {
        items.push(data.halos[0]);
      }
      if (data.rings.length > 0) {
        items.push(data.rings[0]);
      }
      if (data.brooches.length > 0) {
        items.push(data.brooches[0]);
      }
      items.push(...data.bangles);
      return items;
    }
    return [];
  }, [data]);

  if (!data) {
    return;
  }

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
    {
      label: '守护',
      children: data.guardScore,
    },
    {
      label: '宠物',
      children: data.petScore,
    },
  ];

  const { armors, accessories, pets, gems, weapons, roles, server } = data;

  const handleExport = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }
  };

  const title = `${server} ${data.uLv}级 ${roles
    .map((p) => ClassMap[p.currentClassId])
    .join('/')} ${data.collectCount}张图鉴`;

  return (
    <div className="flex items-center">
      <div ref={ref} className="mx-auto">
        <Watermark content={`由恒记APP导出`}>
          <div className="flex flex-col w-[1100px] px-4 py-4 gap-2 grayscale">
            <div className="text-center">{title}</div>
            {roles.map((role) => (
              <Card
                key={role.id}
                size="small"
                title={
                  <div className="flex items-center">
                    {role.nameBackground && <Icon {...role.nameBackground} />}
                    {role.name}
                    {role.nameBackground && <Icon {...role.nameBackground} />}
                  </div>
                }
                extra={role.packages.find((p) => p.type === '人物')?.items[2].name}
              >
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    {weapons
                      .filter((p) => p.roleId === role.roleId && !p.storage)
                      .map((item, index) => (
                        <Item key={index} {...item} />
                      ))}
                  </div>
                  {role.fairies && (
                    <div className="flex flex-col">
                      <div className="text-lg text-center" style={{ color: 'rgb(255, 117, 188)' }}>
                        {role.fairies[2].name}
                      </div>
                      {role.fairies[2].attrs.map((item) => (
                        <Text key={item.description}>{item.description}</Text>
                      ))}
                    </div>
                  )}
                  <div>
                    {(role.skills || role.subSkills)
                      ?.filter((p) => ShowSkillIds.includes(p.id) && p.slv > 10)
                      .map((skill) => (
                        <div key={skill.id}>
                          {skill.name}({skill.slv}/{skill.maxSlv})
                        </div>
                      ))}
                  </div>
                  <div>
                    {pets
                      .filter((p) => p.roleId === role.roleId && !p.storage)
                      .map((item, index) => (
                        <Item key={index} {...item} />
                      ))}
                  </div>
                </div>
              </Card>
            ))}
            <Card size="small" title="防具">
              <div className="flex gap-2">
                {armors.map((item, index) => (
                  <Item key={index} {...item} />
                ))}
              </div>
            </Card>
            <Card size="small" title="首饰">
              <div className="grid grid-cols-5 gap-2">
                {accessories.map((item, index) => (
                  <Item key={index} {...item} />
                ))}
              </div>
            </Card>
            {/* <Card size="small" title="图鉴">
              <div>
                <Text strong>
                  激活套装：{data.collectSetCount} 激活数：{data.collectCount}
                </Text>
                {data.collects
                  .filter((p) => p.activeCount !== p.totalCount)
                  .map((collect) => (
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
            </Card> */}
            <Card size="small" title="特殊">
              <div className="grid grid-cols-5">
                {specialItems.map((item, index) => (
                  <Item key={index} {...item} />
                ))}
              </div>
            </Card>
            <Card size="small" title="宝石">
              <div className="grid grid-cols-5">
                {gems.map((item, index) => (
                  <Item key={index} {...item} />
                ))}
              </div>
            </Card>
            <Card size="small" title="宠物">
              <div className="grid grid-cols-5">
                {pets
                  .filter((p) => p.storage && p.score > 0 && p.score !== p.enchantScore)
                  .map((item, index) => (
                    <Item key={index} {...item} />
                  ))}
              </div>
            </Card>
          </div>
        </Watermark>
      </div>
      <div className="fixed bottom-5 right-5 z-[9999]">
        <Button onClick={handleExport}>Export</Button>
      </div>
    </div>
  );
}

export default Detail;
