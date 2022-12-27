const logJSON = json => {
  let jsonString = JSON.stringify(json, undefined, 4);
  console.log(jsonString);
};

export default logJSON;
