import { ItemRare } from '@/types';

export * from './class';

export const MustShowWeaponIds = [
  91402409, 91402509, 91402609, 91402709, 91402809, 91402909, 91403009, 91403109, 91403209,
  91403609, 91403709, 91403809, 91403909, 91404009, 91404109, 91404209, 91404309, 91404409,
  91404509, 91404909, 91405609, 91406009, 91406409, 91406809, 91406909, 91407309, 91407409,
  91407509, 91407809, 91417609, 91418009, 91418409, 91499009, 91499019, 91499029, 91499039,
  91499049, 91499059, 91503609, 91503809, 91504009, 91504209, 91518409, 91604009, 91604209,
];

export * from './status';

export * from './awaken';

export const ItemRareMap = {
  [ItemRare.Ordinary]: '普通',
  [ItemRare.Excellent]: '优秀',
  [ItemRare.SuperExcellence]: '精良',
  [ItemRare.Epic]: '史诗',
  [ItemRare.Legend]: '传说',
};

export const ItemRareColor = {
  [ItemRare.Ordinary]: '#333',
  [ItemRare.Excellent]: '#3bab03',
  [ItemRare.SuperExcellence]: '#3aafea',
  [ItemRare.Epic]: '#faad14',
  [ItemRare.Legend]: '#f00',
};
