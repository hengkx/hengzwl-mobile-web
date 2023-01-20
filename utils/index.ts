export function formatAddress(address: string, username?: string) {
  return username || `${address.substring(0, 5)}...${address.slice(-5)}`;
}
