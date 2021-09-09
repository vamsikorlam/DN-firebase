export enum StorageItem {
  AUTHENTICATION = 'App/authentication',
  Theme = 'App/theme',
  PRODUCT_SEARCH_HISTORY = 'PRODUCT_SEARCH_HISTORY',
  LOCATION_SEARCH_HISTORY = 'LOCATION_SEARCH_HISTORY',
  CURRENT_LOCATION = 'currentLocation'
}

export const getItem = (itemName: StorageItem): string | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: string): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};

export const setSearchHistory = (item: string): any => {
  localStorage.getItem(StorageItem.PRODUCT_SEARCH_HISTORY);
};
