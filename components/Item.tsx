import { Typography } from 'antd';
import Icon from './Icon';

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
  point: number;
  count: number;
  petPotential?: PetPotential;
}

function Item({ name, icon, iconIndex, enchants, petPotential }: ItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon icon={icon} iconIndex={iconIndex} />
        <Text>{name}</Text>
      </div>
      <div className="flex flex-col">
        {enchants
          .filter((p) => p.value > 50)
          .map((p, index) => (
            <Text className="block" type="secondary" key={index}>
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

export default Item;
