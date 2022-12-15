import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {Camera} from "react-native-vision-camera";
import Chunk from "../components/Chunk";
import {useContext, useEffect, useRef} from "react";
import ChunksContext from "../contexts/chunksContext";
import CroppedImagePathsContext from "../contexts/croppedImagePathsContext";
import DevicePermissionContext from "../contexts/devicePermissionContext";
import ChunkAnimationContext from "../contexts/chunkAnimationContext";
import DeviceVisibilityContext from "../contexts/deviceVisibilityContext";
import TakingPhotoAvailabilityContext from "../contexts/takingPhotoAvailabilityContext";
import {useCameraDevices} from "react-native-vision-camera/src";
import RNPhotoManipulator from "react-native-photo-manipulator";
import Sound from "react-native-sound";
import TextRecognition from "react-native-text-recognition";
import refineChunk from "../utils/refineChunk";
import Tts from "react-native-tts";
import useCameraAndMicrophonePermissions from "../hooks/useCameraAndMicrophonePermissions";
import useErrorHandler from "../hooks/useErrorHandler";
import useOnTTSFinished from "../hooks/useOnTTSFinished";

Sound.setCategory("Playback");

Tts.setDefaultLanguage("en-US");
Tts.setDefaultRate(0.5);

const LEFT_OFFSET = 0.1;
const TOP_OFFSET = 0.12;

const RootScreen = () => {
  const errorHandler = useErrorHandler();
  const onTTSFinished = useOnTTSFinished();
  const getCameraAndMicrophonePermissions = useCameraAndMicrophonePermissions();
  const camera = useRef(null);
  const {chunks, setChunks} = useContext(ChunksContext);
  const {croppedImagePaths, setCroppedImagePaths} = useContext(
    CroppedImagePathsContext
  );
  const {cameraPermission, microphonePermission} = useContext(
    DevicePermissionContext
  );
  const {
    firstChunkAnimation,
    secondChunkAnimation,
    thirdChunkAnimation,
    setFirstChunkAnimation,
    setSecondChunkAnimation,
    setThirdChunkAnimation
  } = useContext(ChunkAnimationContext);
  const {
    isCameraVisible,
    setIsCameraVisible,
    isMegaphoneVisible,
    setIsMegaphoneVisible
  } = useContext(DeviceVisibilityContext);
  const {isTakingPhotoAvailable, setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  const devices = useCameraDevices();
  const device = devices.back;

  const cropImage = async path => {
    const {width} = Dimensions.get("window");
    const sharedWidth = width * 0.7;
    const sharedHeight = width * 0.7;
    const sharedYoffset = width * 0.55;
    const firstRect = {
      x: width * 0.5,
      y: sharedYoffset,
      width: sharedWidth,
      height: sharedHeight
    };
    const secondRect = {
      x: width * 1.4,
      y: sharedYoffset,
      width: sharedWidth,
      height: sharedHeight
    };
    const thirdRect = {
      x: width * 2.3,
      y: sharedYoffset,
      width: sharedWidth,
      height: sharedHeight
    };
    try {
      const firstCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        firstRect
      );
      const secondCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        secondRect
      );
      const thirdCroppedPath = await RNPhotoManipulator.crop(
        "file://" + path,
        thirdRect
      );
      const croppedPaths = [
        firstCroppedPath,
        secondCroppedPath,
        thirdCroppedPath
      ].map(croppedPath => croppedPath.replace("file://", ""));
      setCroppedImagePaths(croppedPaths);
      return croppedPaths;
    } catch (error) {
      errorHandler("CROP_IMAGE_ERROR", error);
    }
  };
  const playSound = (chunk, callback) => {
    const sound = new Sound(`${chunk}.mp3`, Sound.MAIN_BUNDLE, error => {
      if (error) {
        errorHandler("PLAY_SOUND_ERROR", error);
      } else {
        sound.play(success => {
          if (success) {
            sound.release();
            callback();
          } else {
            errorHandler("AUDIO_DECODING_ERROR");
          }
        });
      }
    });
  };
  const playClickSound = callback => {
    const clickSound = new Sound("shutter.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        errorHandler("PLAY_CLICK_SOUND_ERROR", error);
      } else {
        clickSound.play(success => {
          if (success) {
            clickSound.release();
            callback();
          } else {
            errorHandler("AUDIO_DECODING_ERROR");
          }
        });
      }
    });
  };
  const recognizeChunks = async paths => {
    try {
      const firstResult = await TextRecognition.recognize(paths[0]);
      const secondResult = await TextRecognition.recognize(paths[1]);
      const thirdResult = await TextRecognition.recognize(paths[2]);
      return [
        firstResult.join(""),
        secondResult.join(""),
        thirdResult.join("")
      ];
    } catch (error) {
      errorHandler("RECOGNIZE_CHUNKS_ERROR", error);
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
      errorHandler("TAKE_PHOTO_ERROR", error);
    }
  };
  const onTap = () => {
    if (!isTakingPhotoAvailable) {
      return;
    }
    setFirstChunkAnimation(false);
    setSecondChunkAnimation(false);
    setThirdChunkAnimation(false);
    setIsCameraVisible(false);
    setIsTakingPhotoAvailable(false);
    setIsMegaphoneVisible(false);
    playClickSound(() => {
      takePhoto()
        .then(({path}) => {
          cropImage(path)
            .then(croppedPaths => {
              recognizeChunks(croppedPaths)
                .then(chunks => {
                  console.log("Raw Chunks: ", chunks);
                  chunks = chunks.map(refineChunk);
                  console.log("Refined Chunks: ", chunks);
                  onTTSFinished();
                  setChunks(chunks);
                  setFirstChunkAnimation(true);
                  playSound(chunks[0], () => {
                    setSecondChunkAnimation(true);
                    playSound(chunks[1], () => {
                      setThirdChunkAnimation(true);
                      playSound(chunks[2], () => {
                        Tts.speak(chunks.join(""));
                        onTTSFinished();
                      });
                    });
                  });
                })
                .catch(error => {
                  errorHandler("ON_TAP_RECOGNIZE_CHUNKS_ERROR", error);
                });
            })
            .catch(error => {
              errorHandler("ON_TAP_CROP_IMAGE_ERROR", error);
            });
        })
        .catch(error => {
          errorHandler("ON_TAP_TAKE_PHOTO_ERROR", error);
        });
    });
  };
  const onReplay = () => {
    const joinedChunks = chunks.join("");
    Tts.speak(joinedChunks);
  };
  useEffect(() => {
    getCameraAndMicrophonePermissions();
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
    <View style={styles.block}>
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
          <View style={styles.divider}>
            {firstChunkAnimation && <Chunk chunk={chunks[0]} />}
          </View>
          <View style={styles.divider}>
            {secondChunkAnimation && <Chunk chunk={chunks[1]} />}
          </View>
          <View style={styles.placeholderDivider}>
            {thirdChunkAnimation && <Chunk chunk={chunks[2]} />}
          </View>
        </View>
      </MaskedView>
      <View
        style={[
          styles.tapButton,
          isCameraVisible || {
            display: "none"
          }
        ]}>
        <TouchableOpacity activeOpacity={0.5} onPress={onTap}>
          <Image source={require("../assets/images/camera.png")} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.playButton,
          isMegaphoneVisible || {
            display: "none"
          }
        ]}>
        <TouchableOpacity activeOpacity={0.5} onPress={onReplay}>
          <Image source={require("../assets/images/megaphone.png")} />
        </TouchableOpacity>
      </View>
      {croppedImagePaths.length > 0 && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100,
            height: 300,
            zIndex: 1,
            flex: 1
          }}>
          <View
            style={{
              backgroundColor: "white"
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold"
              }}>
              {chunks.join(" ")}
            </Text>
          </View>
          <Image
            resizeMode={"contain"}
            source={{
              uri: "file://" + croppedImagePaths[0]
            }}
            style={{
              flex: 1
            }}
          />
          <Image
            resizeMode={"contain"}
            source={{
              uri: "file://" + croppedImagePaths[1]
            }}
            style={{
              flex: 1
            }}
          />
          <Image
            resizeMode={"contain"}
            source={{
              uri: "file://" + croppedImagePaths[2]
            }}
            style={{
              flex: 1
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: "black",
    flex: 1
  },
  rawTextContainer: {
    backgroundColor: "white"
  },
  rawText: {
    fontSize: 16,
    fontWeight: "bold"
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
    overflow: "hidden",
    backgroundColor: "black"
  },
  boundary: {
    position: "absolute",
    left: `${LEFT_OFFSET * 100}%`,
    top: `${TOP_OFFSET * 100}%`,
    right: `${LEFT_OFFSET * 100}%`,
    bottom: `${TOP_OFFSET * 100}%`,
    borderWidth: 8,
    borderColor: "rgb(246, 213, 91)",
    flexDirection: "row"
  },
  divider: {
    flex: 1,
    borderRightWidth: 3,
    borderRightColor: "rgb(246, 213, 91)"
  },
  placeholderDivider: {
    flex: 1
  },
  tapButton: {
    position: "absolute",
    right: `${LEFT_OFFSET * 100}%`,
    top: "50%",
    transform: [
      {
        translateY: -50
      },
      {
        translateX: 50
      }
    ]
  },
  playButton: {
    position: "absolute",
    bottom: `${TOP_OFFSET * 100}%`,
    left: "50%",
    transform: [
      {
        translateY: 50
      },
      {
        translateX: -50
      }
    ]
  }
});

export default RootScreen;
