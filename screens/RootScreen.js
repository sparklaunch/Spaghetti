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
import TensorflowLite from "tflite-react-native";
import useLoadModel from "../hooks/useLoadModel";
import useClassifyChunk from "../hooks/useClassifyChunk";
import phonemeToOrthographyMapper from "../utils/phonemeToOrthographyMapper";
import ChunksRefsContext from "../contexts/ChunksRefsContext";
import refineChunk from "../utils/refineChunk";
import useRecognizeChunks from "../hooks/useRecognizeChunks";

const RootScreen = () => {
  const tensorflowLite = new TensorflowLite();
  const recognizeChunks = useRecognizeChunks();
  const classifyChunk = useClassifyChunk();
  const loadModel = useLoadModel();
  const takePhoto = useTakePhoto();
  const playSound = usePlaySound();
  const cropImage = useCropImage();
  const errorHandler = useErrorHandler();
  const onTTSFinished = useOnTTSFinished();
  const initializeTTS = useInitializeTTS();
  const getCameraAndMicrophonePermissions = useCameraAndMicrophonePermissions();
  const {wave} = useContext(ChunksRefsContext);
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
        const chunks = await recognizeChunks(croppedPaths);
        const refinedChunks = chunks.map(refineChunk);
        console.log("Recognized Chunks: ", refinedChunks);
        const emptyChunkIndices = refinedChunks.reduce(
          (acc, element, index) =>
            element === "" || element === "ow" || element === "oo"
              ? acc.concat(index)
              : acc,
          []
        );
        loadModel(tensorflowLite);
        for (const index of emptyChunkIndices) {
          refinedChunks[index] = await classifyChunk(
            tensorflowLite,
            croppedPaths[index]
          );
        }
        tensorflowLite.close();
        console.log("Processed Chunks: ", refinedChunks);
        onTTSFinished();
        setChunks(refinedChunks);
        setFirstChunkAnimation(true);
        playSound(refinedChunks[0], () => {
          setSecondChunkAnimation(true);
          playSound(refinedChunks[1], () => {
            setThirdChunkAnimation(true);
            playSound(refinedChunks[2], () => {
              const middleChunk = phonemeToOrthographyMapper(refinedChunks[1]);
              wave();
              Tts.speak(
                [refinedChunks[0], middleChunk, refinedChunks[2]].join("")
              );
              onTTSFinished();
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
