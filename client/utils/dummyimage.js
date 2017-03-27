import color from './color';

export default (text) => {
  if (!text) {
    return;
  }
  const keys = Object.keys(color);
  const colorText = color[keys[parseInt(keys.length * Math.random(), 10)]].slice(1);
  return `https://dummyimage.com/64x64/${colorText}/757575.png&text=${text.slice(0, 1)}`;
};
