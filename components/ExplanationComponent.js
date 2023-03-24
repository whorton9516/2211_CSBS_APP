import React from 'react';
import { View, } from 'react-native';
import styles from '../constants/styles';

const ExplanationComponent = ({ circleSize, numCircles, color, altColor, altNum }) => {
  const diameter = circleSize / 3
  const radius = diameter/2;
  const offset = (circleSize/20);
  const midpoint = (radius) - ((offset)/2);
  const circles = [];

  const smallCircles = [];
  let bgColor = color;

  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(((x2-x1)**2) + ((y2-y1)**2));
  }

  // TODO: implement a poisson distribution to distribute the elements more evenly.

  while (smallCircles.length < numCircles) {
    let overlapping = false
    const deg = Math.random() * 360;
    const translate = Math.random() * midpoint;
    const degInRadians = deg * Math.PI / 180;
    const x = translate * Math.cos(degInRadians);
    const y = translate * Math.sin(degInRadians);
    let grid = 0;
    if(deg >= 0 && deg < 90){
      if (translate > midpoint/2){
        grid = 12;
      } else {
        grid = 11;
      }
    } else if(deg >= 90 && deg < 180){
      if (translate > midpoint/2){
        grid = 22;
      } else {
        grid = 21;
      }
    } else if(deg >= 180 && deg < 270) {
      if (translate > midpoint/2){
        grid = 32;
      } else {
        grid = 31;
      }
    } else if(deg >= 270 && deg < 360) {
      if (translate > midpoint/2){
        grid = 42;
      } else {
        grid = 41;
      }
    }
  
    for (const circle of circles) {
      if (grid == circle.grid) {
        if (getDistance(x, y, circle.x, circle.y) < offset-(offset/10)) {
          overlapping = true;
          break;
        }
      }
    }
  
    if (!overlapping) {
      circles.push({ x, y, grid })
      if (smallCircles.length >= numCircles - altNum){
        bgColor = altColor
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