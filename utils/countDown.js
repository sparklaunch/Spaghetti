const countDown = duration => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, duration);
  });
};

export default countDown;
