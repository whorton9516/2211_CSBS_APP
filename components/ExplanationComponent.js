import React from 'react';
import { View, } from 'react-native';
import styles from '../constants/styles';

const ExplanationComponent = ({ circleSize, numCircles, colors, interval, }) => {
  const diameter = circleSize / 3
  const radius = diameter / 2;
  const offset = (circleSize / 30);
  const midpoint = radius - (offset)/2;
  const circles = [];
  let loopInterval = 0;
  let colorIndex = 0;


  const smallCircles = [];
  let bgColor = colors[0];

  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(((x2-x1)**2) + ((y2-y1)**2));
  }

  // TODO: implement a poisson distribution to distribute the elements more evenly.

  while (smallCircles.length < numCircles) {
    let overlapping = false
    const deg = Math.random() * 360;
    let translate = Math.random() * midpoint;
    const degInRadians = deg * Math.PI / 180;
    const x = translate * Math.cos(degInRadians);
    const y = translate * Math.sin(degInRadians);
    let zone = 0;
    
    if (translate < radius/2) zone = 1;
    else zone = 2;
  
    for (const circle of circles) {
      if (zone == circle.zone) {
        if (getDistance(x, y, circle.x, circle.y) < offset) {
          overlapping = true;
          break;
        }
      }
    }
    
    if (!overlapping) {

      circles.push({ x, y, zone });

      if (loopInterval >= interval){
        loopInterval = 1;
        colorIndex++;
        if (colorIndex >= colors.length){
          colorIndex = colors.length - 1;
        }
        bgColor = colors[colorIndex];
      } else {
        loopInterval++;
      }
      
      smallCircles.push(
        <View
          key={smallCircles.length}
          style={[styles.smallCircle, {
            backgroundColor: bgColor,
            transform: [
              {rotate: deg + 'deg'},
              {translateX: translate},
            ]
          }]}
        />
      );
    }
  }

  return (
    <View style={[styles.circle, { width: diameter, height: diameter }]}>
      {smallCircles}
    </View>
  );
};

export default ExplanationComponent;