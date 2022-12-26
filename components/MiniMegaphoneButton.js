import {Image, TouchableOpacity} from "react-native";

const MiniMegaphoneButton = () => {
  const onPress = () => {};
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Image source={require("../assets/images/megaphone.png")} />
    </TouchableOpacity>
  );
};

export default MiniMegaphoneButton;
