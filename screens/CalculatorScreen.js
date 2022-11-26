import React from 'react';
import { Text, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

const CalculatorScreen = () => {
  return <Text style={styles.textStyle}>Calculator Screen</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30
  }
});

// Basic Calculation method
//  a = first number
//  b = second number
//  sym = calculation to perform
function calculate(a, b, sym){
  switch(sym) {
    case 1:
      return a + b;
    case 2:
      return a - b;
    case 3:
      return a * b;
    case 4:
      return a / b;
  }
}

export default CalculatorScreen;