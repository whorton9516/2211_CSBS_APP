import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, TextInput, Keyboard, Dimensions, SafeAreaView } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { Col, Row, Grid } from "react-native-easy-grid";

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

const {width, height} = Dimensions.get('window');

export default function CalculatorScreen () {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TextInput
        style={styles.TextInput}
        placeholder="Calculate Here"
        textAlign='center'
        keyboardType="numeric"
        color='white'
        placeholderTextColor='white'
      ></TextInput>
      <Grid>
    <Row></Row>
    <Row><Col><MaterialButtonViolet
          caption="Calculate"
          style={styles.firstrow}
        ></MaterialButtonViolet></Col>
          <Col><MaterialButtonViolet
          caption="Clear"
          style={styles.firstrow}
        ></MaterialButtonViolet></Col>
           <Col><MaterialButtonViolet
          caption="Undo"
          style={styles.firstrow}
        ></MaterialButtonViolet></Col></Row>
      </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    //flexWrap: 'wrap', Don't use unless you are an idiot :)
    justifyContent: 'space-between',
    borderWidth: 0,
    borderColor: "rgba(246,239,239,1)",
    jusifyContent: "center",
    alignItems: "center",
    numColumns: 2
  },
  firstrow: {
    order: 2,
    height: 36,
    width: 100,
    top: 200,
    left: 25
  },
  secondrow: {
    order: 2,
    height: 36,
    width: 100,
    top: 500
  },
  TextInput: {
    order: 1,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 98,
    position: "absolute",
    left: 0,
    top: 43,
    right: 0
  }
});