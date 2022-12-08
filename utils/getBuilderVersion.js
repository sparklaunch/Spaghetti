// Courtesy of Tim Down.
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

const getBuilderVersion = hexColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  if (r > g && r > b) {
    return "3";
  } else if (b > r && b > g) {
    return "1";
  } else {
    return "2";
  }
};

export default getBuilderVersion;
