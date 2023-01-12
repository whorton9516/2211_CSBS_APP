import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, TextInput, Keyboard, Dimensions, SafeAreaView } from "react-native";
import CustomButton from "../components/CustomButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const {width, height} = Dimensions.get('window');
let totalQuestions = 0;
let correct = 0;

export default function QuizScreen () {
  console.log('Quiz Screen Opened');
  const [defaultStyle, setDefaultStyle] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.TextDisplay}>
        
        {question.str}

      </Text>
            <TextInput
        style={styles.TextInput}
        placeholder="Answer here"
        textAlign='center'
        keyboardType="numeric"
        color='white'
        placeholderTextColor='white'
        editable={true}
      ></TextInput>
      <Grid>
    <Row></Row>
    <Row><Col><CustomButton
          title="Submit"
          btop={styles.firstrow.top}
          bleft={styles.firstrow.left}
          onPress={() => setDefaultStyle(!defaultStyle)}
          style={styles.firstrow}
        ></CustomButton></Col>
          <Col></Col>
           <Col><CustomButton
           title={defaultStyle ? "Clear" : "Next"}
           btop={styles.firstrow.top}
           bleft={styles.firstrow.left}
          style={defaultStyle ? styles.clear : styles.next}
        ></CustomButton></Col></Row>
      </Grid>
    </View>
  );
}

function GenerateQuestion(){
  const question = {
  num1: (Math.floor(Math.random() * 10) + 1),
  num2: (Math.floor(Math.random() * 10) + 1),
  sym: (Math.floor(Math.random() * 4) + 1),
  str: num1 + " " + sym + " " + num2,
  ans: 0
  };

  // This code is gross! Clean it up
  switch(question.sym) {
    case 1:
      question.ans = question.num1 + question.num2;
    case 2:
      question.ans = question.num1 - question.num2;
    case 3:
      question.ans = question.num1 * question.num2;
    case 4:
      question.ans = question.num1 / question.num2;
  }

  return question;
}

function CheckAnswer(answer, number) {
  if (number == answer) {
    return true;
  } else {
    return false;
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
    left: 25
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