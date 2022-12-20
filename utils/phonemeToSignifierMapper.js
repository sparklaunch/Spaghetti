const phonemeToSignifierMapper = phoneme => {
  switch (phoneme) {
    case "oo(uu)":
      return "oo_tense_u";
      break;
    case "oo(u)":
      return "oo_lax_u";
      break;
    case "ow(au)":
      return "ow_au";
      break;
    case "ow(ou)":
      return "ow_ou";
      break;
    default:
      return phoneme;
      break;
  }
};

export default phonemeToSignifierMapper;
