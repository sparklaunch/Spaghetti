const lineLength = (a, b) => {
  const horizontal = Math.abs(b.x - a.x);
  const vertical = Math.abs(b.y - a.y);
  return Math.sqrt(horizontal * horizontal + vertical * vertical);
};

export default lineLength;
