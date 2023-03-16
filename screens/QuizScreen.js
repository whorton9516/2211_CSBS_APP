import { Overlay } from 'react-native-elements';
import React, { useState } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Button
} from "react-native";
import styles from '../constants/styles';
import CalculatorButton from '../components/CalculatorButton';
import Colors from '../constants/Colors';
import Theming from "../hooks/Theming"
import getDB from '../hooks/GetDB';
import GetQuizData from '../hooks/GetQuizData';

let numCorrect = 0;
let numRun = 1;
let num1 = (Math.floor(Math.random() * 12) + 1);
let num2 = (Math.floor(Math.random() * 12) + 1);
let sym = (Math.floor(Math.random() * 4) + 1); 
const {width, height} = Dimensions.get('window');


const QuizScreen = () => {

  const [question, setQuestion] = useState((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2));
  const [equation, setEquation] = useState("");
  const [elementsInEquation, setElementsInEquation] = useState(0);

  const db = getDB();

  let corr;

  // Handles comparing your answer to the actual answer
  const CheckAnswer = (correctAnswer, userAnswer) => {
    if (userAnswer == correctAnswer){
      numCorrect++;
      console.log('Correct')
      corr = 'Correct!';
    } else {
      console.log('Wrong Silly')
      corr = 'Incorrect!'
    }
    if (numRun == 10) {
      console.log("Done!");
    }
    else {
      numRun++;
    }
  }

  // Handles generating a new question
  const NextQuestion = () => {
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          sym = Math.floor(Math.random() * 4) + 1; 
          setQuestion(((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2)))
          console.log(numCorrect);
          console.log(question);
          setEquation([]);
          setElementsInEquation(0);
  }

  // Handles draggable buttons input
  const GetPosition = (value, xRel, yRel) => {
    if (yRel < 0 && xRel > 25 && xRel < width-25){
        setElementsInEquation(elementsInEquation + 1);
        setEquation(equation + value);
    }
  }

  // Handles the undo button
  const handleUndo = () => {
    setEquation(equation.slice(0, equation.length - 1));
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }

  return (
      // Main View
      <View>
        {/* Header */}
        
        <View style={styles.viewHeader} height={50}>
          <Text style={styles.text}>{question}</Text>
        </View>

        {/* Button Drop Zone */}
        <View style={styles.dropZone}>
            <Text style={styles.text}>{equation}</Text>
        </View>

        {/* Clear, Calculate, and Undo buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              setEquation([]);
              setElementsInEquation(0);
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            CheckAnswer(GetAnswer(num1, num2, sym), equation);
            NextQuestion();
            }}>
            <Image
              source={require('../assets/images/submit.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            handleUndo();
            setElementsInEquation(elementsInEquation - 1);
          }}>
            <Image
              source={require('../assets/images/undo.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        {/* Box to display the answer */}
        <View style={styles.answerBox}>
          <View>
            <Text style={styles.text}>Drag the numbers into the box above!</Text>
          </View>
        </View>
        
        {/* All Calculator buttons
          TODO: Remove extra buttons since we only need 0-9 and a negative button (if we want more complex numbers we could add a period for decimals)
        */}
        <CalculatorButton x= {width/4}   y= {75}  value= {1}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4*2} y= {75}  value= {2}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4*3} y= {75}  value= {3}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4}   y= {150} value= {4}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4*2} y= {150} value= {5}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4*3} y= {150} value= {6}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4}   y= {225} value= {7}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4*2} y= {225} value= {8}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4*3} y= {225} value= {9}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4}   y= {300} value= {'-'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
        <CalculatorButton x= {width/4*2} y= {300} value= {0}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
        <CalculatorButton x= {width/4*3} y= {300} value= {'.'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
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
      return Math.floor(num1 / num2);
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

export default QuizScreen;
