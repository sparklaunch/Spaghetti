import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import {useCameraDevices} from "react-native-vision-camera/src";
import {Camera} from "react-native-vision-camera";
import {useEffect, useRef, useState} from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import TextRecognition from "react-native-text-recognition";
import ImageEditor from "@react-native-community/image-editor";
import refineText from "./utils/refineText";
import Sound from "react-native-sound";
import Tts from "react-native-tts";

Sound.setCategory("Playback");

Tts.setDefaultLanguage("en-IE");
Tts.setDefaultRate(0.1);

const LEFT_OFFSET = 0.1;
const TOP_OFFSET = 0.12;

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
  const playSound = (chunk, callback) => {
    const sound = new Sound(`${chunk}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("[playSound] error: ", error);
      } else {
        sound.play(success => {
          if (success) {
            sound.release();
            callback();
          } else {
            console.log("[playSound] error: Audio decoding error.");
          }
        });
      }
    });
  };
  const playClickSound = callback => {
    const clickSound = new Sound("click.wav", Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log("[playClickSound] error: ", error);
      } else {
        clickSound.play(success => {
          if (success) {
            clickSound.release();
            callback();
          } else {
            console.log("[playClickSound] error: Audio decoding error.");
          }
        });
      }
    });
  };
  const recognizeText = async path => {
    try {
      const result = await TextRecognition.recognize(path);
      return result;
    } catch (error) {
      console.log("[recognizeText] error: ", error);
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
      console.log("[cropPhoto] error: ", error);
    }
  };
  const takePhoto = async () => {
    try {
      let photo;
      if (Platform.OS === "ios") {
        photo = await camera.current.takePhoto();
      } else {
        photo = await camera.current.takeSnapshot();
      }
      return photo;
    } catch (error) {
      console.log("[takePhoto] error: ", error);
    }
  };
  const onTap = () => {
    playClickSound(() => {
      takePhoto()
        .then(response => {
          const {path, width} = response;
          cropPhoto(`file://${path}`, width)
            .then(croppedPath => {
              recognizeText(croppedPath)
                .then(response => {
                  const refinedText = refineText(response);
                  playSound(refinedText[0], () => {
                    playSound(refinedText[1], () => {
                      playSound(refinedText[2], () => {
                        Tts.speak(refinedText.join(""));
                      });
                    });
                  });
                })
                .catch(error => {
                  console.log("[onTap: recognizeText] error: ", error);
                });
            })
            .catch(error => {
              console.log("[onTap: cropPhoto] error: ", error);
            });
        })
        .catch(error => {
          console.log("[onTap: takePhoto] error: ", error);
        });
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
