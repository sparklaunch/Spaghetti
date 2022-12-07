import {ActivityIndicator, Platform, Pressable, StyleSheet, View} from "react-native";
import {useCameraDevices} from "react-native-vision-camera/src";
import {Camera} from "react-native-vision-camera";
import {useEffect, useRef, useState} from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import RNFS from "react-native-fs";
// import RNTextDetector from "react-native-text-detector";

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
  const getFilesOnIOS = async () => {
    try {
      const response = await RNFS.readDir(RNFS.MainBundlePath);
      console.log("Got a response: ", response);
    } catch (error) {
      console.log(error);
    }
  };
  const getFilesOnAndroid = async () => {
    try {
      const response = await RNFS.readDir(RNFS.CachesDirectoryPath);
      console.dir(response);
    } catch (error) {
      console.log(error);
    }
  };
  const takeSnapshot = async () => {
    try {
      const snapshot = await camera.current.takeSnapshot({
        quality: 85,
        skipMetadata: true
      });
      return snapshot;
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
    if (Platform.OS === "android") {
      takeSnapshot()
        .then(response => {
          const {path} = response;
          getFilesOnAndroid();
          // detectText(path)
          //   .then(response => {
          //     console.log("Response: ", response);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      takePhoto()
        .then(response => {
          const {path} = response;
          getFilesOnIOS();
          // detectText(path)
          //   .then(response => {
          //     console.log("Response: ", response);
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  // const detectText = async path => {
  //   try {
  //     const visionResponse = await RNTextDetector.detectFromUri(path);
  //     console.log(visionResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "black"
  }
});

export default App;
