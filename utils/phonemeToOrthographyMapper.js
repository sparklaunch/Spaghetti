const phonemeToOrthographyMapper = phoneme => {
  switch (phoneme) {
    case "oo(uu)":
      return "oo";
      break;
    case "oo(u)":
      return "oo";
      break;
    case "ow(au)":
      return "ow";
      break;
    case "ow(ou)":
      return "ow";
      break;
    default:
      return;
      break;
  }
};

export default phonemeToOrthographyMapper;
