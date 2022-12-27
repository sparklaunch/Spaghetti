const countDown = duration => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve("success");
    }, duration);
  });
};

export default countDown;
