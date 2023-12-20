import { sprintf } from 'printj';

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
