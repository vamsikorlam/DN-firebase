export function reArrangeTheSortingOrder(array: any [], key, id): any [] {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === id) {
      const element = array[i];
      array.splice(i, 1);
      array.splice(0, 0, element);
    }
  }
  return array;
}

export function reArrangeTheSortingOrderWithArray(array: any [], key, ids: any[]): any [] {
  for (let i = 0; i < array.length; i++) {
    for (const item of ids) {
      if (array[i][key] === item) {
        const element = array[i];
        array.splice(i, 1);
        array.splice(0, 0, element);
      }
    }
  }
  return array;
}

export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
