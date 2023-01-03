import {StyleSheet, Text, View} from "react-native";

const Notice = () => {
  return (
    <View style={styles.noticeContainer}>
      <Text style={styles.noticeText}>
        빛번짐, 반사가 없는, 조도가 균일한 환경에서 사용해주세요
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    zIndex: 1,
    position: "absolute",
    top: 25,
    left: 0,
    right: 0
  },
  noticeText: {
    textAlign: "center",
    fontSize: 14,
    color: "white"
  }
});

export default Notice;
