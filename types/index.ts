import { ClassMap } from '@/constants';

export enum ItemRare {
  /**
   * 普通
   */
  Ordinary = 1,
  /**
   * 优秀
   */
  Excellent,
  /**
   * 精良
   */
  SuperExcellence,
  /**
   * 史诗
   */
  Epic,
  /**
   * 传说
   */
  Legend,
}

interface NameBackground {
  icon: string;
  iconIndex: number;
}

interface FairyAttr {
  id: number;
  description: string;
  value: number;
  base: boolean;
}

interface Fairy {
  lv: number;
  name: string;
  attrs: FairyAttr[];
}

export interface Package {
  type: string;
  count: number;
  items: Item[];
}

interface Title {
  id: number;
  name: string;
  color: string;
  score: number;
}

export interface Role {
  id: string;
  roleId: number;
  classId: keyof typeof ClassMap;
  subClassId?: keyof typeof ClassMap;
  currentClassId: keyof typeof ClassMap;
  name: string;
  skills?: Skill[];
  subSkills?: Skill[];
  area: string;
  server: string;
  nameBackground?: NameBackground;
  fairies: Fairy[];
  packages: Package[];
  gender: number;
  image: string;
  titles: Title[];
  diplomacies?: Diplomacy[];
}

interface Diplomacy {
  id: number;
  point: number;
}

export interface Skill {
  id: number;
  slv: number;
  name: string;
  maxSlv: number;
  icon: string;
  iconIndex: number;
}

export interface ClassSkill {
  id: number;
  type: number;
  name: string;
  items: ClassSkillItem[];
}

export interface ClassSkillItem {
  id: number;
  subId: number;
  skillId: number;
  gridIndex: number;
  imageSetting: number;
  name: string;
  description: string;
  disableDescription: string;
  icon: string;
  iconIndex: number;
  baseSlv: number;
  maxSlv: number;
  upRequireSkillPoint: number;
  disableIcon: string;
  disableIconIndex: number;
  /**
   * 53 允许打断其他技能
   */
  skillType: number;
}

export interface ItemEnchant {
  id: number;
  value: number;
  description: string;
  effectType: number;
}

export interface Item {
  id: number;
  name: string;
  color: string;
  point: number;
  status: ItemEnchant[];
  enchants: ItemEnchant[];
  chaosStatuses: ItemEnchant[];
  count: number;
  icon: string;
  iconIndex: number;
  score: number;
  enchantScore: number;
  roleId: number;
  trade: boolean;
  storage: boolean;
  posId1: number;
  type: number;
  subType: number;
  index: number;
  rare: ItemRare;
  classReq: number;
}

export interface AccountInfo {
  uLv: number;
  id: string;
  server: string;
  area: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  classId: number;
  armorScore: number;
  accessoryScore: number;
  gemScore: number;
  runeScore: number;
  bangleScore: number;
  broochScore: number;
  badgeScore: number;
  haloScore: number;
  crystalScore: number;
  ringScore: number;
  guardScore: number;
  medalScore: number;
  petScore: number;
  collectScore: number;
  collectCount: number;
  collectSetCount: number;
  collects: Collect[];
  collectStatuses: number[];
  packages: any[];
  titles: any[];
  gifts: any[];
  gems: Item[];
  /**
   * 防具
   */
  armors: Item[];
  /**
   * 首饰
   */
  accessories: Item[];
  /**
   * 宠物
   */
  pets: Item[];
  /**
   * 守护
   */
  guards: Item[];
  /**
   * 勋章
   */
  medals: Item[];
  /**
   * 光环
   */
  halos: Item[];
  /**
   * 胸针
   */
  brooches: Item[];
  /**
   * 结晶
   */
  crystals: Item[];
  /**
   * 手镯
   */
  bangles: Item[];
  /**
   * 徽章
   */
  badges: Item[];
  /**
   * 符文
   */
  runes: Item[];
  /**
   * 特效戒指
   */
  rings: Item[];
  /**
   * 军帽
   */
  caps: Item[];
  /**
   * 武器
   */
  weapons: Item[];
  roles: Role[];
}
