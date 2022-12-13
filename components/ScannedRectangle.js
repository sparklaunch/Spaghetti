import Svg, {Polyline} from "react-native-svg";

const ScannedRectangle = ({coordinates}) => {
  const {topLeft, topRight, bottomLeft, bottomRight} = coordinates;
  return (
    <Svg>
      <Polyline
        points={`${topLeft.x / 3} ${topLeft.y / 3} ${topRight.x / 3} ${
          topRight.y / 3
        } ${bottomRight.x / 3} ${bottomRight.y / 3} ${bottomLeft.x / 3} ${
          bottomLeft.y / 3
        } ${topLeft.x / 3} ${topLeft.y / 3}`}
        fill={"none"}
        stroke={"blue"}
        strokeWidth={"10"}
      />
    </Svg>
  );
};

export default ScannedRectangle;
