const phonemeToSignifierMapper = phoneme => {
  switch (phoneme) {
    case "oo(uu)":
      return "oo_tense_u";
    case "oo(u)":
      return "oo_lax_u";
    case "ow(au)":
      return "ow_au";
    case "ow(ou)":
      return "ow_ou";
    case "ck":
      return "k";
    default:
      return phoneme;
  }
};

export default phonemeToSignifierMapper;
