import { ClassMap } from '@/constants';

export interface Role {
  id: string;
  classId: keyof typeof ClassMap;
  subClassId?: keyof typeof ClassMap;
  currentClassId: keyof typeof ClassMap;
  name: string;
  skills?: Skill[];
  subSkills?: Skill[];
  area: string;
  server: string;
}

export interface Skill {
  id: number;
  slv: number;
  name: string;
  maxSlv: number;
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
