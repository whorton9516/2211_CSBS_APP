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

export default CalculatorScreen;