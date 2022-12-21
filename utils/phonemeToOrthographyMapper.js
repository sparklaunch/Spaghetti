const phonemeToOrthographyMapper = phoneme => {
  switch (phoneme) {
    case "oo(uu)":
      return "oo";
    case "oo(u)":
      return "oo";
    case "ow(au)":
      return "ow";
    case "ow(ou)":
      return "ow";
    default:
      return phoneme;
  }
};

export default phonemeToOrthographyMapper;
