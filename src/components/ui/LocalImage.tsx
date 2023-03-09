import React from 'react';
import { Image as RNImage, ImageStyle, StyleProp } from 'react-native';

export const LocalImage: React.FC<{
  localAsset: number;
  width?: number;
  height?: number;
  // style?: StyleProp<ImageProps>;
  style?: StyleProp<ImageStyle>;
}> = (props) => (
  <RNImage
    source={props.localAsset}
    style={[
      props.style,
      {
        width: props.width,
        height: props.height,
      },
    ]}
  />
);
