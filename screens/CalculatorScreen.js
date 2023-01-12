import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, TextInput, Keyboard, Dimensions, ScrollView, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { Overlay } from 'react-native-elements';
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
  updateMath = () => {
    const payload = {
      leinput: " ",
    }
    
    console.log(payload)
  }
onChangeText = (key, val) => {
  this.setState({ [key]: val})
}
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const submit = () => {
    toggleOverlay();
    console.log(this.leinput)
    //updateMath();
  };
  const [defaultStyle, setDefaultStyle] = useState(true);
  let tinput = " ";
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
        onChangeText={(text) => this.leinput = text}
      ></TextInput>
      <TextInput
      style={styles.res}
      placeholder={this.leinput}
      textAlign='center'
      color='white'
      placeholderTextColor='white'
      editable={false}
    ></TextInput>
      <Grid>
    <Row></Row>
    <Row><Col><CustomButton
          title="Show Me"
          btop={styles.firstrow.top}
          bleft={styles.firstrow.left}
          onPress={submit}
          style={styles.firstrow}
        ></CustomButton></Col>
          <Col><CustomButton
          title="Clear"
          btop={styles.firstrow.top}
          bleft={styles.firstrow.left}
          style={styles.firstrow}
        ></CustomButton></Col>
           <Col><CustomButton
          title="Undo"
          btop={styles.firstrow.top}
          bleft={styles.firstrow.left}
          style={styles.firstrow}
        ></CustomButton></Col></Row>
      </Grid>
      <Overlay style={styles.overlay} isVisible={visible} onBackdropPress={toggleOverlay} fullScreen={true}>
      <TextInput
      style={styles.explanation}
      placeholder={this.leinput}
      textAlign='center'
      keyboardType="numeric"
      editable={false}>
      </TextInput>
      <Grid>
    <Row><ScrollView
      style={styles.scroll} >
      <Text> We're no strangers to love
You know the rules and so do I (do I)
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
And if you ask me how I'm feeling
Don't tell me you're too blind to see
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
We've known each other for so long
Your heart's been aching, but you're too shy to say it (to say it)
Inside, we both know what's been going on (going on)
We know the game and we're gonna play it
I just wanna tell you how I'm feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
        </Text></ScrollView></Row>
    <Row><Col></Col>
          <Col><CustomButton
          title="Back"
          btop={styles.secondrow.top}
          bleft={styles.secondrow.left}
          style={styles.secondrow}
          onPress={toggleOverlay}
        ></CustomButton></Col>
           <Col></Col></Row>
      </Grid>
      </Overlay>
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
    left: 20
  },
  secondrow: {
    order: 2,
    height: 36,
    width: 100,
    top: 325,
    left: 20
  },
  TextInput: {
    order: 1,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 200,
    position: "absolute",
    left: 0,
    top: 40,
    right: 0
  },
  res: {
    order: 1,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 75,
    height: 50,
    position: "absolute",
    top: 190,
    right: 0
  },
  overlay: {
    order: 1,
    backgroundColor: 'gray',
    windowBackgroundColor: 'gray',
    overlayBackgroundColor: 'gray',
  },
  scroll: {
    order: 1,
    color : "black",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 550,
    position: "absolute",
    left: 0,
    top: 150,
    right: 0
  },
  explanation: {
    order: 1,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 100,
    position: "absolute",
    left: 0,
    top: 20,
    right: 0
  },
});