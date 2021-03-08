export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return;
};

export const getData = (key = 'elements'): any => {
  return JSON.parse(localStorage.getItem(key) as string);
};
