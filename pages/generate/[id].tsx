import React, { useMemo, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Card, Typography, Watermark } from 'antd';
import dayjs from 'dayjs';
import { ExpAwaken, Icon, Item } from '@/components';
import { ClassMap, ClassTypeMap, MustShowWeaponIds } from '@/constants';
import { AccountInfo, Role } from '@/types';
import _ from 'lodash';
import { GetServerSideProps } from 'next';
import { CalcScore } from '@/utils';

const { Text } = Typography;

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
  190147815, 20201200, 190147814, 751800117, 522220049, 10318354,
];
// 显示的脚底
const ShowSoleIds = [43052105, 43052205, 43060505, 43060605, 430110616];

const AddonAccessoriesIds = [200101011, 200101012, 40170602, 321110027, 120270462];

function Detail({ data }: { data: AccountInfo }) {
  const ref = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

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
      const items = CalcScore(data.armors, ClassTypeMap[data.classId]);
      return _.orderBy(_.uniqBy(_.orderBy(items, 'score', 'desc'), 'posId1'), 'posId1');
    }
    return [];
  }, [data]);

  const accessories = useMemo(() => {
    if (data) {
      const items = CalcScore(_.uniqBy(data.accessories, 'key'), ClassTypeMap[data.classId]);
      return _.uniqBy(
        [
          ..._.orderBy(_.unionBy(_.orderBy(items, 'score', 'desc'), 'posId1'), 'posId1'),
          ...data.accessories.filter((p) => AddonAccessoriesIds.includes(p.id)),
        ],
        'id'
      );
    }
    return [];
  }, [data]);

  const showTradeItems = useMemo(() => {
    if (data) {
      let items = _.uniqBy(
        data.packages.reduce((prev, curr) => [...prev, ...curr.items], []) as any[],
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

  const weapons = useMemo(() => {
    if (data) {
      const items = CalcScore(_.uniqBy(data.weapons, 'key'), ClassTypeMap[data.classId]);
      return _.orderBy(items, 'score', 'desc');
    }
    return [];
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

  const { pets, gems, roles, server } = data;

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

  const renderAwaken = (role: Role) => {
    const items = _.flatten(
      role.packages.filter((p) => p.type === '装备' || p.type === '觉醒石').map((p) => p.items)
    );
    return (
      <div className="grid grid-cols-5">
        <ExpAwaken data={items.filter((p) => p.id === 166200412)} />
        {items
          .filter((p) => ShowItemIds.includes(p.id))
          .map((item, index) => (
            <Item {...item} key={index} />
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
            <div className="text-center">
              <Text type="secondary">{dayjs(data.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
            </div>
            {gifts.length > 0 && (
              <Card size="small" title="礼品">
                <div className="flex flex-wrap gap-2">
                  {gifts
                    .filter((p) => ShowItemCountIds.includes(p.id))
                    .map((item, index) => (
                      <Item onlyCount showName key={index} {...item} />
                    ))}
                </div>
              </Card>
            )}
            {searchParams.get('all') === 'true' && showTradeItems && (
              <Card size="small" title="装备">
                <div className="grid grid-cols-5 gap-2">
                  {showTradeItems.map((item, index) => (
                    <Item key={index} {...item} />
                  ))}
                </div>
              </Card>
            )}
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
                  <div className="flex gap-2 mb-2 bg-[#325669] px-2 py-1 rounded">
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
                )}

                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    {_.orderBy(
                      _.uniqBy(
                        [
                          ..._.uniqBy(
                            _.orderBy(
                              weapons.filter((p) => p.roleId === role.roleId),
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

                {renderAwaken(role)}
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
    headers: { device: JSON.stringify({ version: '1.10.46' }) },
  });
  const data = await res.json();
  return { props: { data: data.data } };
};

export default Detail;
