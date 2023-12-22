import { Typography } from 'antd';
import Icon from '../Icon';
import { ItemEnchant } from '@/types';
import { memo } from 'react';

const { Text } = Typography;

const Grade = {
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'R',
} as const;

interface PetPotential {
  grade: keyof typeof Grade;
  description: string;
}

interface ItemProps {
  name: string;
  icon: string;
  iconIndex: number;
  enchants: ItemEnchant[];
  chaosStatuses: ItemEnchant[];
  point: number;
  count: number;
  petPotential?: PetPotential;
  color?: string;
  onlyCount?: boolean;
  showEnchant?: boolean;
  showName?: boolean;
}

function Item({
  onlyCount,
  count,
  color,
  name,
  icon,
  iconIndex,
  enchants,
  petPotential,
  chaosStatuses,
  showEnchant = true,
  showName,
}: ItemProps) {
  if (onlyCount) {
    return (
      <div className="flex items-center">
        <Icon icon={icon} iconIndex={iconIndex} />
        {showName && <Text style={{ color }}>{name}</Text>}
        <div className="font-bold">X{count}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon icon={icon} iconIndex={iconIndex} />
        <Text style={{ color }}>{name}</Text>
      </div>
      <div className="flex flex-col">
        {chaosStatuses?.map((p, index) => (
          <Text className="block" type="warning" key={index}>
            {p.description}
          </Text>
        ))}
        {showEnchant &&
          enchants?.map((p, index) => (
            <Text
              className="block"
              type="secondary"
              style={chaosStatuses.length > 0 ? { color: 'rgb(255, 0, 255)' } : undefined}
              key={index}
            >
              {p.description}
            </Text>
          ))}
      </div>
      {Boolean(petPotential) && petPotential && (
        <Text className="block" type="warning">
          潜能 {Grade[petPotential.grade]}：{petPotential.description}
        </Text>
      )}
    </div>
  );
}

export default memo(Item);

export { default as ExpAwaken } from './ExpAwaken';
