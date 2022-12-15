import {DevicePermissionContextProvider} from "./contexts/DevicePermissionContext";
import {ChunkAnimationContextProvider} from "./contexts/ChunkAnimationContext";
import {DeviceVisibilityContextProvider} from "./contexts/DeviceVisibilityContext";
import {CroppedImagePathsContextProvider} from "./contexts/CroppedImagePathsContext";
import {ChunksContextProvider} from "./contexts/ChunksContext";
import {TakingPhotoAvailabilityContextProvider} from "./contexts/TakingPhotoAvailabilityContext";
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
