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
