import React, { useMemo, useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useParams, useRouter } from 'next/navigation';
import { Alert, Button, Card, DescriptionsProps, Typography, Watermark } from 'antd';
import dayjs from 'dayjs';
import { useFetch } from '@/hooks';
import { ExpAwaken, Icon, Item } from '@/components';
import {
  ClassMap,
  ClassTypeMap,
  MagicExcludeTypes,
  MustShowWeaponIds,
  PhyExcludeTypes,
  StatusScoreMap,
} from '@/constants';
import { AccountInfo, Item as ItemA, Role } from '@/types';
import _ from 'lodash';
import { GetServerSideProps } from 'next';

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
const ShowPackageTypes = [
  '装备',
  '消耗',
  '其他',
  '任务',
  '宠物栏',
  '仓库',
  '随身仓库1',
  '随身仓库2',
  '随身仓库3',
  '随身仓库4',
  '随身仓库5',
];
// 觉醒石
const ShowItemIds = [166200112, 166200612];
// 材料 石头等
const ShowItemCountIds = [
  180191113, 753810002, 13000035, 81580004, 43901305, 81580001, 190147819, 190147818, 430139032,
  190147815, 20201200, 190147814,
];

function Detail({ data }: { data: AccountInfo }) {
  const ref = useRef<HTMLDivElement>(null);

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

  const armors = useMemo(() => {
    if (data) {
      const type = ClassTypeMap[data.classId];
      const items = _.uniqBy(data.armors, 'key').map((item) => {
        const status = [...item.status, ...item.chaosStatuses, ...item.enchants];
        const group = _.groupBy(status, 'effectType');
        const mergedStatus = Object.keys(group).map((effectType) => {
          const value = _.sumBy(group[effectType], 'value');
          return {
            effectType,
            value,
            score:
              (type === 1 && PhyExcludeTypes.includes(parseInt(effectType))) ||
              (type === 2 && MagicExcludeTypes.includes(parseInt(effectType)))
                ? 0
                : value * StatusScoreMap[effectType],
          };
        });
        return {
          ...item,
          mergedStatus,
          score: _.sumBy(mergedStatus, 'score'),
        };
      });
      return _.orderBy(_.uniqBy(_.orderBy(items, 'score', 'desc'), 'posId1'), 'posId1');
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

  const { accessories, pets, gems, weapons, roles, server } = data;

  const renderItemCount = (role: Role) => {
    const items = _.flatten(role.packages.map((p) => p.items));
    const group = _.groupBy(items, 'id');
    return (
      <div className="grid grid-cols-4 gap-1">
        {Object.keys(group)
          .map((key) => ({ ...group[key][0], count: _.sumBy(group[key], 'count') }))
          .filter((p) => ShowItemCountIds.includes(p.id))
          .map((item, index) => (
            <Item onlyCount {...item} key={index} />
          ))}
      </div>
    );
  };

  const title = `${server} ${data.uLv}级 ${roles
    .map((p) => ClassMap[p.currentClassId])
    .join('/')} ${data.collectCount}张图鉴`;

  return (
    <div className="flex items-center">
      <div ref={ref} className="mx-auto">
        <Watermark content={`${dayjs().format('YYYY-MM-DD')} 由恒记APP导出`}>
          <div className="flex flex-col w-[1100px] px-4 py-4 gap-2 ">
            <div className="text-center">{title}</div>
            {roles.map((role) => (
              <Card
                key={role.id}
                size="small"
                title={
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {role.nameBackground && <Icon {...role.nameBackground} />}
                      {role.name}
                      {role.nameBackground && <Icon {...role.nameBackground} />}
                    </div>
                    <div>{role.packages.find((p) => p.type === '人物')?.items[2].name}</div>
                    <div>{role.gender === 1 ? '男' : '女'}</div>
                    <div>
                      {ClassMap[role.classId]}
                      {role.subClassId ? '/' + ClassMap[role.subClassId] : ''}
                    </div>
                  </div>
                }
                extra={
                  <div>
                    {role.packages
                      .filter((p) => ShowPackageTypes.includes(p.type) && p.count > 0)
                      .map((p) => `${p.type}[${p.count}]`)}
                  </div>
                }
              >
                {role.titles.length > 0 && (
                  <Alert
                    style={{ marginBottom: 8 }}
                    message={
                      <div className="flex gap-2">
                        {role.titles.map((item) => (
                          <Text
                            key={item.id}
                            style={{
                              color: item.color,
                            }}
                          >
                            {item.name}
                          </Text>
                        ))}
                      </div>
                    }
                    type="info"
                  />
                )}

                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    {_.orderBy(
                      _.uniqBy(
                        [
                          ..._.uniqBy(
                            _.orderBy(
                              weapons.filter((p) => p.roleId === role.roleId && !p.storage),
                              'posId1',
                              'desc'
                            ),
                            'posId1'
                          ),
                          ...weapons.filter(
                            (p) => p.roleId === role.roleId && MustShowWeaponIds.includes(p.id)
                          ),
                        ],
                        'id'
                      ),
                      'posId1',
                      'desc'
                    ).map((item, index) => (
                      <Item key={index} showEnchant {...item} />
                    ))}
                  </div>
                  <div>
                    {pets
                      .filter((p) => p.roleId === role.roleId && !p.storage)
                      .map((item, index) => (
                        <Item {...item} key={index} />
                      ))}
                  </div>
                  {role.fairies && (
                    <div className="flex flex-col">
                      <Text className="text-center" style={{ color: 'rgb(255, 117, 188)' }}>
                        {role.fairies[2].name}
                      </Text>
                      {role.fairies[2].attrs.map((item) => (
                        <Text key={item.description} type="secondary">
                          {item.description}
                        </Text>
                      ))}
                    </div>
                  )}
                  <div>
                    {(role.skills || role.subSkills)
                      ?.filter((p) => ShowSkillIds.includes(p.id) && p.slv > 10)
                      .map((skill) => (
                        <Text className="block" key={skill.id} type="warning">
                          {skill.name}({skill.slv}/{skill.maxSlv})
                        </Text>
                      ))}
                  </div>
                  <div>{renderItemCount(role)}</div>
                </div>

                <div className="grid grid-cols-5">
                  <ExpAwaken
                    data={role.packages
                      .find((p) => p.type === '装备')
                      ?.items.filter((p) => p.id === 166200412)}
                  />
                  {role.packages
                    .find((p) => p.type === '装备')
                    ?.items.filter((p) => ShowItemIds.includes(p.id))
                    .map((item, index) => (
                      <Item {...item} key={index} />
                    ))}
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const res = await fetch(`${axios.defaults.baseURL}/api/chd/info/${params?.id}`, {
    headers: { device: JSON.stringify({ version: '1.10.42' }) },
  });
  const data = await res.json();
  return { props: { data: data.data } };
};

export default Detail;
