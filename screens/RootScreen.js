import {Alert, Image, StyleSheet, Text, View} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import {Camera} from "react-native-vision-camera";
import {useContext, useEffect, useRef, useState} from "react";
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
import TensorflowLite from "tflite-react-native";
import useLoadModel from "../hooks/useLoadModel";
import useClassifyChunk from "../hooks/useClassifyChunk";
import phonemeToOrthographyMapper from "../utils/phonemeToOrthographyMapper";
import ChunksRefsContext from "../contexts/ChunksRefsContext";
import useRecognizeChunks from "../hooks/useRecognizeChunks";
import MicrophoneButton from "../components/MicrophoneButton";
import Backdrop from "../components/Backdrop";
import RecordingStatusContext from "../contexts/RecordingStatusContext";
import RecordingBackdrop from "../components/recording/RecordingBackdrop";
import ResultsStatusContext from "../contexts/ResultsStatusContext";
import ResultsScreen from "./results/ResultsScreen";
import useDeleteCache from "../hooks/useDeleteCache";
import useClearCache from "../hooks/useClearCache";
import LoadingStatusContext from "../contexts/LoadingStatusContext";
import Notice from "../components/Notice";
import axios from "axios";
import Constants from "../shared/Constants";
import logJSON from "../utils/logJSON";

const RootScreen = () => {
  const tensorflowLite = new TensorflowLite();
  const recognizeChunks = useRecognizeChunks();
  const classifyChunk = useClassifyChunk();
  const loadModel = useLoadModel();
  const deleteCache = useDeleteCache();
  const clearCache = useClearCache();
  const takePhoto = useTakePhoto();
  const playSound = usePlaySound();
  const cropImage = useCropImage();
  const errorHandler = useErrorHandler();
  const onTTSFinished = useOnTTSFinished();
  const initializeTTS = useInitializeTTS();
  const getCameraAndMicrophonePermissions = useCameraAndMicrophonePermissions();
  const {resultsScreenShown} = useContext(ResultsStatusContext);
  const {wave} = useContext(ChunksRefsContext);
  const {chunks, setChunks} = useContext(ChunksContext);
  const {croppedImagePaths} = useContext(CroppedImagePathsContext);
  const {cameraPermission, microphonePermission} = useContext(
    DevicePermissionContext
  );
  const {isLoading} = useContext(LoadingStatusContext);
  const camera = useRef(null);
  const {
    setFirstChunkAnimation,
    setSecondChunkAnimation,
    setThirdChunkAnimation
  } = useContext(ChunkAnimationContext);
  const {
    setIsCameraVisible,
    setIsMegaphoneVisible,
    setIsMicrophoneVisible,
    setAreMegaphonesVisible,
    areMegaphonesVisible
  } = useContext(DeviceVisibilityContext);
  const {isTakingPhotoAvailable, setIsTakingPhotoAvailable} = useContext(
    TakingPhotoAvailabilityContext
  );
  const {isRecording} = useContext(RecordingStatusContext);
  const devices = useCameraDevices();
  const device = devices.back;
  const willPlaySession = () => {
    setFirstChunkAnimation(false);
    setSecondChunkAnimation(false);
    setThirdChunkAnimation(false);
    setIsCameraVisible(false);
    setIsTakingPhotoAvailable(false);
    setIsMegaphoneVisible(false);
    setIsMicrophoneVisible(false);
    setAreMegaphonesVisible(false);
  };
  const [alertChunk, setAlertChunk] = useState("");
  const alert = type => {
    return Alert.alert("음소 선택", "음소를 선택하세요", [
      {
        text: type === "oo" ? "oo (장모음)" : "ow (장모음)",
        onPress: () => {
          switch (type) {
            case "oo":
              setAlertChunk("oo(uu)");
              break;
            case "ow":
              setAlertChunk("ow(au)");
              break;
          }
        },
        style: "default"
      },
      {
        text: type === "oo" ? "oo (단모음)" : "ow (단모음)",
        onPress: () => {
          switch (type) {
            case "oo":
              setAlertChunk("oo(u)");
              break;
            case "ow":
              setAlertChunk("ow(ou)");
              break;
          }
        },
        style: "default"
      }
    ]);
  };
  const playSession = () => {
    if (!isTakingPhotoAvailable) {
      return;
    }
    willPlaySession();
    playSound("shutter", async () => {
      try {
        const {path, width, height} = await takePhoto(camera);
        const croppedPaths = await cropImage(path, width, height);
        await deleteCache(path);
        const formData = new FormData();
        formData.append("img_1", {
          uri: "file://" + croppedPaths[0],
          type: "image/jpeg",
          name: "img_1"
        });
        formData.append("img_2", {
          uri: "file://" + croppedPaths[1],
          type: "image/jpeg",
          name: "img_2"
        });
        formData.append("img_3", {
          uri: "file://" + croppedPaths[2],
          type: "image/jpeg",
          name: "img_3"
        });
        axios
          .post(Constants.OCR_API_ENDPOINT, formData, {
            headers: {
              "X-API-KEY": Constants.API_KEY,
              accept: "application/json",
              "Content-Type": "multipart/form-data",
              "Cache-Control": "no-store",
              Pragma: "no-store",
              Expires: "0"
            }
          })
          .then(response => {
            const {data} = response;
            const {result} = data;
            let refinedChunks = result.map(chunk => {
              return chunk
                .toLowerCase()
                .replace("+", "t")
                .replace("in", "ir")
                .replace("-", "l")
                .replace("1", "i")
                .replace(/[^a-z]/g, "");
            });
            clearCache(croppedPaths)
              .then(response => {
                if (refinedChunks[1] == "oo") {
                  alert("oo");
                }
                if (refinedChunks[1] == "ow") {
                  alert("ow");
                }
                refinedChunks[1] = alertChunk;
                setChunks(refinedChunks);
                setFirstChunkAnimation(true);
                playSound(refinedChunks[0], () => {
                  setSecondChunkAnimation(true);
                  playSound(refinedChunks[1], () => {
                    setThirdChunkAnimation(true);
                    playSound(
                      refinedChunks[2],
                      () => {
                        const middleChunk = phonemeToOrthographyMapper(
                          refinedChunks[1]
                        );
                        wave();
                        Tts.speak(
                          [
                            refinedChunks[0],
                            middleChunk,
                            refinedChunks[2]
                          ].join("")
                        );
                        onTTSFinished();
                        setAlertChunk("");
                      },
                      true
                    );
                  });
                });
              })
              .catch(error => {
                logJSON(error);
              });
          })
          .catch(error => {
            axios
              .post(Constants.OCR_API_ENDPOINT, formData, {
                headers: {
                  "X-API-KEY": Constants.API_KEY,
                  accept: "application/json",
                  "Content-Type": "multipart/form-data",
                  "Cache-Control": "no-store",
                  Pragma: "no-store",
                  Expires: "0"
                }
              })
              .then(response => {
                const {data} = response;
                const {result} = data;
                const refinedChunks = result.map(chunk => {
                  return chunk
                    .toLowerCase()
                    .replace("+", "t")
                    .replace("in", "ir")
                    .replace("-", "l")
                    .replace("1", "i")
                    .replace(/[^a-z]/g, "");
                });
                clearCache(croppedPaths)
                  .then(response => {
                    setChunks(refinedChunks);
                    setFirstChunkAnimation(true);
                    playSound(refinedChunks[0], () => {
                      setSecondChunkAnimation(true);
                      playSound(refinedChunks[1], () => {
                        setThirdChunkAnimation(true);
                        playSound(
                          refinedChunks[2],
                          () => {
                            const middleChunk = phonemeToOrthographyMapper(
                              refinedChunks[1]
                            );
                            wave();
                            Tts.speak(
                              [
                                refinedChunks[0],
                                middleChunk,
                                refinedChunks[2]
                              ].join("")
                            );
                            onTTSFinished();
                          },
                          true
                        );
                      });
                    });
                  })
                  .catch(error => {
                    logJSON(error);
                  });
              })
              .catch(error => {
                logJSON(error);
              });
          });
      } catch (error) {
        logJSON(error);
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
    (async () => {
      try {
        await getCameraAndMicrophonePermissions();
        await initializeTTS();
      } catch (error) {
        errorHandler("LOAD_ERROR", error);
      }
    })();
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
      <Notice />
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
      <Backdrop />
      <CameraButton onTap={onTap} />
      <MegaphoneButton onReplay={onReplay} />
      <MicrophoneButton />
      {isRecording && <RecordingBackdrop />}
      {isLoading && <LoadingScreen />}

      {/* BELOW IS THE DEBUGGING PART */}
      {croppedImagePaths.length > 0 && !resultsScreenShown && (
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
      {resultsScreenShown && <ResultsScreen />}
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
