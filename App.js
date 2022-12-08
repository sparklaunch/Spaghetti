import {ActivityIndicator, Pressable, StyleSheet, View} from "react-native";
import {useCameraDevices} from "react-native-vision-camera/src";
import {Camera} from "react-native-vision-camera";
import {useEffect, useRef, useState} from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import TextRecognition from "react-native-text-recognition";

const App = () => {
  const camera = useRef(null);
  const [cameraPermission, setCameraPermission] = useState();
  const [microphonePermission, setMicrophonePermission] = useState();
  const devices = useCameraDevices();
  const device = devices.back;
  const getCameraAndMicrophonePermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    setCameraPermission(newCameraPermission);
    setMicrophonePermission(newMicrophonePermission);
  };
  const recognizeText = async path => {
    try {
      const result = await TextRecognition.recognize(path);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const takePhoto = async () => {
    try {
      const photo = await camera.current.takePhoto();
      return photo;
    } catch (error) {
      console.log(error);
    }
  };
  const onTap = () => {
    takePhoto()
      .then(response => {
        const {path} = response;
        recognizeText(path)
          .then(response => {
            console.log("Result: ", response);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCameraAndMicrophonePermission();
  }, []);
  if (
    device === null ||
    device === undefined ||
    cameraPermission !== "authorized" ||
    microphonePermission !== "authorized"
  ) {
    return <ActivityIndicator />;
  }
  return (
    <Pressable style={styles.block} onPress={onTap}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskElement}>
            <View style={styles.rectangle} />
          </View>
        }>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        <View style={styles.boundary} />
      </MaskedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: "black",
    flex: 1
  },
  camera: {
    flex: 1,
    height: "100%"
  },
  maskedView: {
    flex: 1,
    flexDirection: "row",
    height: "100%"
  },
  maskElement: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rectangle: {
    width: "80%",
    height: "80%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "black"
  },
  boundary: {
    position: "absolute",
    left: "10%",
    top: "10%",
    right: "10%",
    bottom: "10%",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "lightgreen"
  }
});

export default App;
