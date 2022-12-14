import {DevicePermissionContextProvider} from "./contexts/devicePermissionContext";
import {ChunkAnimationContextProvider} from "./contexts/chunkAnimationContext";
import {DeviceVisibilityContextProvider} from "./contexts/deviceVisibilityContext";
import {CroppedImagePathsContextProvider} from "./contexts/croppedImagePathsContext";
import {ChunksContextProvider} from "./contexts/chunksContext";
import {TakingPhotoAvailabilityContextProvider} from "./contexts/takingPhotoAvailabilityContext";
import RootScreen from "./screens/RootScreen";

const App = () => {
  return (
    <DevicePermissionContextProvider>
      <ChunkAnimationContextProvider>
        <DeviceVisibilityContextProvider>
          <CroppedImagePathsContextProvider>
            <ChunksContextProvider>
              <TakingPhotoAvailabilityContextProvider>
                <RootScreen />
              </TakingPhotoAvailabilityContextProvider>
            </ChunksContextProvider>
          </CroppedImagePathsContextProvider>
        </DeviceVisibilityContextProvider>
      </ChunkAnimationContextProvider>
    </DevicePermissionContextProvider>
  );
};

export default App;
