import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";

// function CustomButton(props) {
//   return (
//     <TouchableOpacity style={[styles.container, props.style,]} onPress={() => console.log("Button Pressed")}>
//       <Text style={styles.caption}>{props.caption || "BUTTON"}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.dark.buttoncolor,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     borderRadius: 2,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1
//     },
//     shadowOpacity: 0.35,
//     shadowRadius: 5,
//     elevation: 2,
//     minWidth: 88,
//     paddingLeft: 16,
//     paddingRight: 16
//   },
//   caption: {
//     color: "#05131D",
//     fontSize: 14
//   }
// });

//export default CustomButton;


const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  bwidth,
  bheight,
  btop,
  bbottom,
  bright,
  bleft,
  bdisabled
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || Colors.dark.buttoncolor,
      width: bwidth || 100,
      height: bheight || 36,
      top: btop || 0,
      bottom: bbottom || 0,
      right: bright || 0,
      left: bleft || 0,
      disabled: bdisabled || 0}}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || '#05131D'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
  },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    color: "#05131D",
    fontSize: 14,
  },
});
