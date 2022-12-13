import {Image, StyleSheet, View} from "react-native";
import Sound from "react-native-sound";
import Tts from "react-native-tts";
import Scanner from "react-native-rectangle-scanner";
import TextRecognition from "react-native-text-recognition";
import refineText from "./utils/refineText";
import {useEffect, useRef, useState} from "react";
import logError from "./utils/logError";
import ScannedRectangle from "./components/ScannedRectangle";
import lineLength from "./utils/lineLength";

Sound.setCategory("Playback");

Tts.setDefaultLanguage("en-US");
Tts.setDefaultRate(0.5);

const LEFT_OFFSET = 0.1;
const TOP_OFFSET = 0.12;

const App = () => {
  const camera = useRef(null);
  const [cropPreview, setCropPreview] = useState("");
  const [detectedRectangle, setDetectedRectangle] = useState({});
  const [rectangleCoordinates, setRectangleCoordinates] = useState({});
  const [isTakingPhotoAvailable, setIsTakingPhotoAvailable] = useState(true);
  const [firstChunkAnimation, setFirstChunkAnimation] = useState(false);
  const [secondChunkAnimation, setSecondChunkAnimation] = useState(false);
  const [thirdChunkAnimation, setThirdChunkAnimation] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [isMegaphoneVisible, setIsMegaphoneVisible] = useState(false);
  const [rawText, setRawText] = useState("");
  const [chunk, setChunk] = useState([]);
  const errorHandler = (type, error) => {
    logError(type, error);
    setIsCameraVisible(true);
    setIsTakingPhotoAvailable(true);
  };
  const onTTSFinished = () => {
    setIsTakingPhotoAvailable(true);
    setIsCameraVisible(true);
    setIsMegaphoneVisible(true);
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
  const recognizeText = async path => {
    try {
      const result = await TextRecognition.recognize(path);
      return result;
    } catch (error) {
      errorHandler("RECOGNIZE_TEXT_ERROR", error);
    }
  };
  // const onTap = () => {
  //   if (!isTakingPhotoAvailable) {
  //     return;
  //   }
  //   setFirstChunkAnimation(false);
  //   setSecondChunkAnimation(false);
  //   setThirdChunkAnimation(false);
  //   setIsCameraVisible(false);
  //   setIsTakingPhotoAvailable(false);
  //   setIsMegaphoneVisible(false);
  //   playClickSound(() => {
  //     takePhoto()
  //       .then(response => {
  //         const {path} = response;
  //         resizeImage(path)
  //           .then(resizedPath => {
  //             recognizeText(resizedPath)
  //               .then(response => {
  //                 setRawText(response.join(""));
  //                 const refinedText = refineText(response);
  //                 onTTSFinished();
  //                 setChunk(refinedText);
  //                 setFirstChunkAnimation(true);
  //                 playSound(refinedText[0], () => {
  //                   setSecondChunkAnimation(true);
  //                   playSound(refinedText[1], () => {
  //                     setThirdChunkAnimation(true);
  //                     playSound(refinedText[2], () => {
  //                       Tts.speak(refinedText.join(""));
  //                       onTTSFinished();
  //                     });
  //                   });
  //                 });
  //               })
  //               .catch(error => {
  //                 errorHandler("ON_TAP_RECOGNIZE_TEXT_ERROR", error);
  //               });
  //           })
  //           .catch(error => {
  //             errorHandler("ON_TAP_RESIZE_ERROR", error);
  //           });
  //       })
  //       .catch(error => {
  //         errorHandler("ON_TAP_TAKE_PHOTO_ERROR", error);
  //       });
  //   });
  // };
  const onReplay = () => {
    const joinedChunks = chunk.join("");
    Tts.speak(joinedChunks);
  };
  // useEffect(() => {
  //   getCameraAndMicrophonePermission();
  // }, []);
  // if (
  //   device === null ||
  //   device === undefined ||
  //   cameraPermission !== "authorized" ||
  //   microphonePermission !== "authorized"
  // ) {
  //   return <ActivityIndicator />;
  // }

  // return (
  //   <View style={styles.block}>
  //     <View style={styles.rawTextContainer}>
  //       <Text style={styles.rawText}>Raw Text: {rawText}</Text>
  //     </View>
  //     <MaskedView
  //       style={styles.maskedView}
  //       maskElement={
  //         <View style={styles.maskElement}>
  //           <View style={styles.rectangle} />
  //         </View>
  //       }>
  //       <Camera
  //         ref={camera}
  //         style={styles.camera}
  //         device={device}
  //         isActive={true}
  //         photo={true}
  //       />
  //       <View style={styles.boundary}>
  //         <View style={styles.divider}>
  //           {firstChunkAnimation && <Chunk chunk={chunk[0]} />}
  //         </View>
  //         <View style={styles.divider}>
  //           {secondChunkAnimation && <Chunk chunk={chunk[1]} />}
  //         </View>
  //         <View style={styles.placeholderDivider}>
  //           {thirdChunkAnimation && <Chunk chunk={chunk[2]} />}
  //         </View>
  //       </View>
  //     </MaskedView>
  //     <View
  //       style={[
  //         styles.tapButton,
  //         isCameraVisible || {
  //           display: "none"
  //         }
  //       ]}>
  //       <TouchableOpacity activeOpacity={0.5} onPress={onTap}>
  //         <Image source={require("./assets/images/camera.png")} />
  //       </TouchableOpacity>
  //     </View>
  //     <View
  //       style={[
  //         styles.playButton,
  //         isMegaphoneVisible || {
  //           display: "none"
  //         }
  //       ]}>
  //       <TouchableOpacity activeOpacity={0.5} onPress={onReplay}>
  //         <Image source={require("./assets/images/megaphone.png")} />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
  const onPictureProcessed = ({croppedImage}) => {
    setCropPreview(croppedImage);
    if (!isTakingPhotoAvailable) {
      return;
    }
    setFirstChunkAnimation(false);
    setSecondChunkAnimation(false);
    setThirdChunkAnimation(false);
    setIsCameraVisible(false);
    setIsTakingPhotoAvailable(false);
    setIsMegaphoneVisible(false);
    recognizeText(croppedImage)
      .then(response => {
        setRawText(response.join(""));
        const refinedText = refineText(response);
        setChunk(refinedText);
        setFirstChunkAnimation(true);
        playSound(refinedText[0], () => {
          setSecondChunkAnimation(true);
          playSound(refinedText[1], () => {
            setThirdChunkAnimation(true);
            playSound(refinedText[2], () => {
              Tts.speak(refinedText.join(""));
            });
          });
        });
      })
      .catch(error => {
        errorHandler("ON_TAP_RECOGNIZE_TEXT_ERROR", error);
      });
  };
  useEffect(() => {
    if (Object.keys(detectedRectangle).length !== 0) {
      const {topLeft, topRight, bottomLeft, bottomRight} = detectedRectangle;
      const left = lineLength(topLeft, topRight).toFixed(0);
      const top = lineLength(topRight, bottomRight).toFixed(0);
      const right = lineLength(bottomRight, bottomLeft).toFixed(0);
      const bottom = lineLength(bottomLeft, topLeft).toFixed(0);
      console.log(top, right, bottom, left);
      if (
        top > 1000 &&
        bottom > 1000 &&
        right < 800 &&
        top + bottom > (left + right) * 2
      ) {
        camera.current.capture();
        setRectangleCoordinates(detectedRectangle);
      }
    }
  }, [detectedRectangle]);
  const onRectangleDetected = ({detectedRectangle}) => {
    if (detectedRectangle) {
      setDetectedRectangle(detectedRectangle);
    }
  };
  const onPictureTaken = imagePaths => {
    const {croppedImage, initialImage} = imagePaths;
  };
  return (
    <View style={styles.block}>
      <Scanner
        filterId={2}
        onRectangleDetected={onRectangleDetected}
        onPictureTaken={onPictureTaken}
        onPictureProcessed={onPictureProcessed}
        style={styles.block}
        ref={camera}
      />
      <View style={styles.canvas}>
        {Object.keys(rectangleCoordinates).length !== 0 && (
          <ScannedRectangle coordinates={rectangleCoordinates} />
        )}
      </View>
      {cropPreview.length !== 0 && (
        <View style={styles.cropCanvas}>
          <Image source={{uri: cropPreview}} style={styles.block} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  canvas: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  cropCanvas: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default App;
