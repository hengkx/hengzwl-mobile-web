import { memo } from 'react';
import { Typography } from 'antd';
import { Item, ItemRare } from '@/types';
import Icon from '../Icon';
import { ItemRareColor } from '@/constants';

const { Text } = Typography;

function ExpAwaken({ data }: { data?: Item[] }) {
  if (!data || data.length === 0) {
    return null;
  }
  const { icon, iconIndex, color, name } = data[0];
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon icon={icon} iconIndex={iconIndex} />
        <Text style={{ color: ItemRareColor[ItemRare.Legend], fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ fontWeight: 'bold' }}>X{data.length}</Text>
      </div>
      {data.map((item, index) => (
        <Text key={index} className="block" style={{ color: '#1e279e' }}>
          {item.enchants.find((p) => p.id === 18852)?.description}
        </Text>
      ))}
    </div>
  );
}

export default memo(ExpAwaken);
