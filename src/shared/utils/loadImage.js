
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const elem = new Image()
    elem.onload = () => resolve(src);
    elem.onerror = () => reject(undefined);
    elem.src = src;
  });
}