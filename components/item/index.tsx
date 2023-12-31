import { Typography } from 'antd';
import Icon from '../Icon';
import { Item, ItemEnchant } from '@/types';
import { memo, useMemo } from 'react';
import { ItemRareColor } from '@/constants';

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

interface ItemProps extends Item {
  petPotential?: PetPotential;
  onlyCount?: boolean;
  showEnchant?: boolean;
  showName?: boolean;
}

function ItemComponent({
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
  rare,
}: ItemProps) {
  const nameStyle = useMemo(
    () => ({
      color: color === 'rgb(0,0,0)' ? ItemRareColor[rare] : color,
      fontWeight: 'bold',
    }),
    [color, rare]
  );

  if (onlyCount) {
    return (
      <div className="flex items-center gap-1">
        <Icon icon={icon} iconIndex={iconIndex} />
        {showName && <Text style={nameStyle}>{name}</Text>}
        <div className="font-bold">X{count}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon icon={icon} iconIndex={iconIndex} />
        <Text style={nameStyle}>{name}</Text>
      </div>
      <div className="flex flex-col">
        {chaosStatuses?.map((p, index) => (
          <Text className="block" style={{ color: '#eba00b' }} key={index}>
            {p.description}
          </Text>
        ))}
        {showEnchant &&
          enchants?.map((p, index) => (
            <Text
              className="block"
              style={{
                color:
                  chaosStatuses.length > 0 ? '#7e22f3' : rare === index + 1 ? '#ad37f9' : '#1e279e',
              }}
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

export default memo(ItemComponent);

export { default as ExpAwaken } from './ExpAwaken';
