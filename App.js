import {DevicePermissionContextProvider} from "./contexts/DevicePermissionContext";
import {ChunkAnimationContextProvider} from "./contexts/ChunkAnimationContext";
import {DeviceVisibilityContextProvider} from "./contexts/DeviceVisibilityContext";
import {CroppedImagePathsContextProvider} from "./contexts/CroppedImagePathsContext";
import {ChunksContextProvider} from "./contexts/ChunksContext";
import {TakingPhotoAvailabilityContextProvider} from "./contexts/TakingPhotoAvailabilityContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import {ChunksRefsContextProvider} from "./contexts/ChunksRefsContext";
import {RecordingStatusContextProvider} from "./contexts/RecordingStatusContext";
import {useEffect, useState} from "react";
import RNBootSplash from "react-native-bootsplash";
import useErrorHandler from "./hooks/useErrorHandler";
import {ResultsContextProvider} from "./contexts/ResultsContext";
import {ResultsStatusContextProvider} from "./contexts/ResultsStatusContext";
import RootScreen from "./screens/RootScreen";

const App = () => {
  const [screenShown, setScreenShown] = useState(false);
  const errorHandler = useErrorHandler();
  const hideSplashScreen = async () => {
    try {
      await RNBootSplash.hide({
        fade: true,
        duration: 500
      });
    } catch (error) {
      errorHandler("SPLASH_SCREEN_ERROR", error);
    }
  };
  useEffect(() => {
    hideSplashScreen()
      .then(() => {
        setScreenShown(true);
      })
      .catch(error => {
        errorHandler("SPLASH_SCREEN_ERROR", error);
      });
  }, []);
  if (screenShown) {
    return (
      <ResultsStatusContextProvider>
        <ResultsContextProvider>
          <RecordingStatusContextProvider>
            <ChunksRefsContextProvider>
              <DevicePermissionContextProvider>
                <ChunkAnimationContextProvider>
                  <DeviceVisibilityContextProvider>
                    <CroppedImagePathsContextProvider>
                      <ChunksContextProvider>
                        <TakingPhotoAvailabilityContextProvider>
                          <GestureHandlerRootView style={styles.block}>
                            <RootScreen />
                          </GestureHandlerRootView>
                        </TakingPhotoAvailabilityContextProvider>
                      </ChunksContextProvider>
                    </CroppedImagePathsContextProvider>
                  </DeviceVisibilityContextProvider>
                </ChunkAnimationContextProvider>
              </DevicePermissionContextProvider>
            </ChunksRefsContextProvider>
          </RecordingStatusContextProvider>
        </ResultsContextProvider>
      </ResultsStatusContextProvider>
    );
  }
};

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
});

export default App;
