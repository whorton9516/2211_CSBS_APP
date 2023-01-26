import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Keyboard } from 'react-native'
import QuizQuestion from '../components/QuizQuestion';
import CustomButton from "../components/CustomButton";
import { Overlay } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

let numCorrect = 0;

const QuizScreen = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [sym, setSym] = useState(Math.floor(Math.random() * 4) + 1);
  const [question, setQues] = useState((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2).toString());
  const [corr, setCorr] = useState(' ');

  inputMath = () => {
    const payload = {
    input: " ",
    }
    
    console.log(payload)
  }

  const CheckAnswer = (correctAnswer, userAnswer) => {
    if (userAnswer == correctAnswer){
      numCorrect++;
      console.log('Correct')
      setCorr('Correct!')
    } else {
      console.log('Wrong Silly')
      setCorr('Incorrect')
    }
    toggleOverlay();
  }

  const NextQuestion = () => {
          setNum1(Math.floor(Math.random() * 12) + 1);
          setSym(Math.floor(Math.random() * 4) + 1);
          setNum2(Math.floor(Math.random() * 12) + 1);
          setQues(((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2).toString()))
          console.log(numCorrect);
          if (visible) {
            setVisible(!visible);
          }
  }

onChangeText = (key, val) => {
  this.setState({ [key]: val})
}
const [visible, setVisible] = useState(false);
const toggleOverlay = () => {
  setVisible(!visible);
};
  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
      <TextInput
      style={styles.TextDisplay}
      placeholder={question}
      textAlign='center'
      keyboardType="numeric"
      color='white'
      placeholderTextColor='white'
      editable={false}
    ></TextInput>
          <TextInput
      style={styles.TextInput}
      placeholder="Answer here"
      textAlign='center'
      keyboardType="numeric"
      color='white'
      placeholderTextColor='white'
      onChangeText={(text) => this.input = text}
    ></TextInput>
    <Grid>
  <Row></Row>
  <Row><Col><CustomButton
        title="Submit"
        btop={styles.firstrow.top}
        bleft={styles.firstrow.left}
        onPress={() => CheckAnswer(GetAnswer(num1, num2, sym), this.input)}
        //onPress={toggleOverlay}
        style={styles.firstrow}
      ></CustomButton></Col>
        <Col></Col>
         <Col><CustomButton
         title="Clear"
         btop={styles.firstrow.top}
         bleft={styles.firstrow.left}
        style={styles.clear}
      ></CustomButton></Col></Row>
    </Grid>
    <Overlay isVisible={visible} onBackdropPress={NextQuestion}>
    <Text>{corr}
    </Text>
    <Text>{numCorrect}
    </Text>
    </Overlay>
  </View>
  );
}

const GetAnswer = (num1, num2, sym) => {
  switch(sym){
    case 1:
      return num1 + num2;
    case 2:
      return num1 - num2;
    case 3:
      return num1 * num2;
    case 4:
      return num1 / num2;
  }
}

const ConvertSym = (symbol) => {
  switch(symbol){
    case 1:
        return '+';
    case 2: 
        return '-';
    case 3:
        return '*';
    case 4:
        return '/';
}
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
    top: 200,
    left: 18
  },
  clear: {
    order: 2,
    title: "Clear",
    height: 36,
    width: 100,
    top: 200
  },
  next: {
    order: 2,
    title: "Next Question",
    height: 36,
    width: 100,
    top: 200
  },
  TextDisplay: {
    order: 1,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 98,
    position: "absolute",
    left: 0,
    top: 43,
    right: 0
  },
  TextInput: {
    order: 2,
    color : "white",
    borderColor: 'gray', 
    borderWidth: 1, 
    height: 98,
    position: "absolute",
    left: 0,
    top: 200,
    right: 0
  }
});

export default QuizScreen;
