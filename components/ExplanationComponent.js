import React from 'react';
import { View,
         Dimensions 
        } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';
import styles from '../constants/styles';

const { width } = Dimensions.get('window');

const ExplanationComponent = ({ radius, numCircles, color, altColor, altNum }) => {
  const circleSize = radius / 3
  const smallCircleSize = radius / 10;
  const smallCircles = [];
  let bgColor = color;

  for (let i = 0; i < numCircles; i++) {
    if (i >= numCircles - altNum){
      bgColor = altColor
    }
    smallCircles.push(
      <View
        key={i}
        style={[styles.smallCircle, {
          transform: [
            { rotate: `${(Math.floor(Math.random() * 360))}deg` },
            { translateX: circleSize / 2 - smallCircleSize / 2 },
            { translateY: -smallCircleSize / 12 },
          ],
          backgroundColor: bgColor
        }]}
      />
    );
  }
  
  

  return (
    <View style={[styles.circle, { width: circleSize, height: circleSize }]}>
      {smallCircles}
    </View>
  );
};

export default ExplanationComponent;