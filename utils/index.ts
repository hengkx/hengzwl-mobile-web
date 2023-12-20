import { MagicExcludeTypes, PhyExcludeTypes, StatusScoreMap } from '@/constants';
import { Item } from '@/types';
import { sprintf } from 'printj';
import _ from 'lodash';

export function formatAddress(address: string, username?: string) {
  return username || `${address.substring(0, 5)}...${address.slice(-5)}`;
}

export function getMap<T = any>(items: T[], key = 'id', replace = true) {
  const result: Record<string, T> = {};
  items.forEach((item: any) => {
    if (replace) {
      result[item[key]] = item;
    } else if (!result[item[key]]) {
      result[item[key]] = item;
    }
  });
  return result;
}

export function format(str: string, ...value: any[]) {
  try {
    return str
      ? sprintf(str.endsWith('%') ? str.substring(0, str.length - 1) : str, ...value)
      : (value as any);
  } catch (error) {
    return str;
  }
}

export function CalcScore(items: Item[], type: number) {
  return items.map((item) => {
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
}
