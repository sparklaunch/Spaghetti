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
import {useEffect} from "react";
import RNBootSplash from "react-native-bootsplash";
import useErrorHandler from "./hooks/useErrorHandler";
import {ResultsContextProvider} from "./contexts/ResultsContext";
import GoodScreen from "./screens/results/GoodScreen";

const App = () => {
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
    hideSplashScreen();
  }, []);
  return (
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
                        <GoodScreen />
                        {/*<RootScreen />*/}
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
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
});

export default App;
