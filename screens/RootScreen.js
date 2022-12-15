import {Image, StyleSheet, Text, View} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {Camera} from "react-native-vision-camera";
import {useContext, useEffect, useRef} from "react";
import ChunksContext from "../contexts/ChunksContext";
import CroppedImagePathsContext from "../contexts/CroppedImagePathsContext";
import DevicePermissionContext from "../contexts/DevicePermissionContext";
import ChunkAnimationContext from "../contexts/ChunkAnimationContext";
import DeviceVisibilityContext from "../contexts/DeviceVisibilityContext";
import TakingPhotoAvailabilityContext from "../contexts/TakingPhotoAvailabilityContext";
import {useCameraDevices} from "react-native-vision-camera/src";
import Tts from "react-native-tts";
import useCameraAndMicrophonePermissions from "../hooks/useCameraAndMicrophonePermissions";
import useErrorHandler from "../hooks/useErrorHandler";
import useOnTTSFinished from "../hooks/useOnTTSFinished";
import useCropImage from "../hooks/useCropImage";
import usePlaySound from "../hooks/usePlaySound";
import useTakePhoto from "../hooks/useTakePhoto";
import MaskElement from "../components/MaskElement";
import Boundary from "../components/Boundary";
import CameraButton from "../components/CameraButton";
import MegaphoneButton from "../components/MegaphoneButton";
import LoadingScreen from "./LoadingScreen";
import useInitializeTTS from "../hooks/useInitializeTTS";
import Tflite from "tflite-react-native";

const tflite = new Tflite();

const RootScreen = () => {
  // const recognizeChunks = useRecognizeChunks();
  const takePhoto = useTakePhoto();
  const playSound = usePlaySound();
  const cropImage = useCropImage();
  const errorHandler = useErrorHandler();
  const onTTSFinished = useOnTTSFinished();
  const initializeTTS = useInitializeTTS();
  const getCameraAndMicrophonePermissions = useCameraAndMicrophonePermissions();
  const {chunks, setChunks} = useContext(ChunksContext);
  const {croppedImagePaths} = useContext(CroppedImagePathsContext);
  const {cameraPermission, microphonePermission} = useContext(
    DevicePermissionContext
  );
  const camera = useRef(null);
  const {
    setFirstChunkAnimation,
    setSecondChunkAnimation,
    setThirdChunkAnimation
  } = useContext(ChunkAnimationContext);
  const {setIsCameraVisible, setIsMegaphoneVisible} = useContext(
    DeviceVisibilityContext
  );
  const {isTakingPhotoAvailable, setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  const loadModel = () => {
    tflite.loadModel(
      {
        model: "model_unquant.tflite",
        labels: "labels.txt"
      },
      (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log(response);
        }
      }
    );
  };
  const logConfidence = candidates => {
    const confidences = candidates.map(candidate => {
      return `[Confidence: ${candidate.confidence.toFixed(2)}]: ${
        candidate.label
      }`;
    });
    console.log(confidences.join(", "));
  };
  const classifyChunks = (paths, callback) => {
    console.log(
      "#------------------------------------------------------------#"
    );
    const results = [];
    tflite.runModelOnImage(
      {
        path: paths[0]
      },
      (error, candidates) => {
        if (error) {
          errorHandler("CLASSIFY_CHUNKS_ERROR", error);
        } else {
          logConfidence(candidates);
          results.push(candidates[0].label);
          tflite.runModelOnImage(
            {
              path: paths[1]
            },
            (error, candidates) => {
              if (error) {
                errorHandler("CLASSIFY_CHUNKS_ERROR", error);
              } else {
                logConfidence(candidates);
                results.push(candidates[0].label);
                tflite.runModelOnImage(
                  {
                    path: paths[2]
                  },
                  (error, candidates) => {
                    if (error) {
                      errorHandler("CLASSIFY_CHUNKS_ERROR", error);
                    } else {
                      logConfidence(candidates);
                      results.push(candidates[0].label);
                      callback(results);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  };
  const devices = useCameraDevices();
  const device = devices.back;
  const willPlaySession = () => {
    setFirstChunkAnimation(false);
    setSecondChunkAnimation(false);
    setThirdChunkAnimation(false);
    setIsCameraVisible(false);
    setIsTakingPhotoAvailable(false);
    setIsMegaphoneVisible(false);
  };
  const playSession = () => {
    if (!isTakingPhotoAvailable) {
      return;
    }
    willPlaySession();
    playSound("shutter", async () => {
      try {
        const {path} = await takePhoto(camera);
        const croppedPaths = await cropImage(path);
        // let chunks = await recognizeChunks(croppedPaths);
        // console.log("Raw Chunks: ", chunks);
        // console.log("Refined Chunks: ", chunks);
        // chunks = chunks.map(refineChunk);
        classifyChunks(croppedPaths, chunks => {
          onTTSFinished();
          setChunks(chunks);
          setFirstChunkAnimation(true);
          playSound(chunks[0], () => {
            setSecondChunkAnimation(true);
            playSound(chunks[1], () => {
              setThirdChunkAnimation(true);
              playSound(chunks[2], () => {
                let vowel;
                switch (chunks[1]) {
                  case "oo(uu)":
                    vowel = "oo";
                    break;
                  case "oo(u)":
                    vowel = "oo";
                    break;
                  case "ow(au)":
                    vowel = "ow";
                    break;
                  case "ow(ou)":
                    vowel = "ow";
                    break;
                  default:
                    vowel = chunks[1];
                    break;
                }
                Tts.speak([chunks[0], vowel, chunks[2]].join(""));
                onTTSFinished();
              });
            });
          });
        });
      } catch (error) {
        errorHandler(error);
      }
    });
  };
  const onTap = () => {
    playSession();
  };
  const onReplay = () => {
    const joinedChunks = chunks.join("");
    Tts.speak(joinedChunks);
  };
  useEffect(() => {
    loadModel();
    getCameraAndMicrophonePermissions();
    initializeTTS();
  }, []);
  if (
    device === null ||
    device === undefined ||
    cameraPermission !== "authorized" ||
    microphonePermission !== "authorized"
  ) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.block}>
      <MaskedView style={styles.maskedView} maskElement={<MaskElement />}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        <Boundary />
      </MaskedView>
      <CameraButton onTap={onTap} />
      <MegaphoneButton onReplay={onReplay} />

      {/* BELOW IS THE DEBUGGING PART */}
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
  }
});

export default RootScreen;
