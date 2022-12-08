import {ActivityIndicator, Pressable, StyleSheet, View} from "react-native";
import {useCameraDevices} from "react-native-vision-camera/src";
import {Camera} from "react-native-vision-camera";
import {useEffect, useRef, useState} from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import TextRecognition from "react-native-text-recognition";
import ImageEditor from "@react-native-community/image-editor";

const LEFT_OFFSET = 0.15;
const TOP_OFFSET = 0.1;

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
  const cropPhoto = async (path, width) => {
    const cropData = {
      offset: {
        x: width * LEFT_OFFSET,
        y: width * TOP_OFFSET
      },
      size: {
        width: width * (1 - LEFT_OFFSET * 2),
        height: width * (1 - TOP_OFFSET * 2)
      }
    };
    try {
      const croppedPath = await ImageEditor.cropImage(path, cropData);
      return croppedPath;
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
        <View style={styles.boundary}>
          <View style={styles.divider} />
          <View style={styles.divider} />
          <View style={styles.placeholderDivider} />
        </View>
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
    width: `${(1 - LEFT_OFFSET * 2) * 100}%`,
    height: `${(1 - TOP_OFFSET * 2) * 100}%`,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "black"
  },
  boundary: {
    position: "absolute",
    left: `${LEFT_OFFSET * 100}%`,
    top: `${TOP_OFFSET * 100}%`,
    right: `${LEFT_OFFSET * 100}%`,
    bottom: `${TOP_OFFSET * 100}%`,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "lightgreen",
    flexDirection: "row"
  },
  divider: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "lightgreen"
  },
  placeholderDivider: {
    flex: 1
  }
});

export default App;
