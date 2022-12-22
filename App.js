import {DevicePermissionContextProvider} from "./contexts/DevicePermissionContext";
import {ChunkAnimationContextProvider} from "./contexts/ChunkAnimationContext";
import {DeviceVisibilityContextProvider} from "./contexts/DeviceVisibilityContext";
import {CroppedImagePathsContextProvider} from "./contexts/CroppedImagePathsContext";
import {ChunksContextProvider} from "./contexts/ChunksContext";
import {TakingPhotoAvailabilityContextProvider} from "./contexts/TakingPhotoAvailabilityContext";
import RootScreen from "./screens/RootScreen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import {ChunksRefsContextProvider} from "./contexts/ChunksRefsContext";
import {RecordingStatusContextProvider} from "./contexts/RecordingStatusContext";

const App = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1
  }
});

export default App;
