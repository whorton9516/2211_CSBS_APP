import React, { useState, useEffect } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
} from "react-native";
import styles from '../constants/styles';
import CalculatorButton from '../components/CalculatorButton';
import Theming from "../hooks/Theming"
import getDB from '../hooks/GetDB';
import GetQuizData from '../hooks/GetQuizData';

const {width, height} = Dimensions.get('window');


const QuizScreen = () => {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [userAnswer, setUserAnswer] = useState();
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const db = getDB();

  // Handles comparing your answer to the actual answer
  const CheckAnswer = () => {
    setQuestionsAsked(questionsAsked + 1);
    if (userAnswer == answer){
      numCorrect++;
      setTotalCorrect(totalCorrect + 1);
      console.log('Correct')
    } else {
      console.log('Wrong Silly')
    }
  }

  // Handles generating a new question
  const NextQuestion = () => {
    const symbolMap = {
      '+': GetQuizData.addition,
      '-': GetQuizData.subtraction,
      '*': GetQuizData.multiplication,
      '/': GetQuizData.division
    };
    const allowedSymbols = Object.entries(symbolMap)
      .filter(([symbol, allowed]) => allowed)
      .map(([symbol]) => symbol);
      let num1 = Math.floor(Math.random() * 25) + 1;
      let num2 = Math.floor(Math.random() * 25) + 1;
      let sym = allowedSymbols[Math.floor(Math.random() * allowedSymbols.length)];
      let eqStr = num1.toString() + sym + num2.toString();
      setQuestion(eqStr);
      setAnswer(eval(eqStr));
  }
  

  // Handles draggable buttons input
  const GetPosition = (value, xRel, yRel) => {
    if (yRel > 100 && yRel < 225 && xRel > 25 && xRel < width-25){
      let ans = parseInt(userAnswer + value.toString());
      setUserAnswer(ans);
    }
  }

  // Handles the undo button
  const handleUndo = () => {
    setUserAnswer(userAnswer.slice(0, userAnswer.length - 1));
  }

  useEffect(() => {
    NextQuestion();
  }, []);

  return (
      // Main View
      <View>
        {/* Header */}
        <View style={styles.viewHeader} height={50}>
          <Text style={styles.text}>{question}</Text>
        </View>

        {/* Button Drop Zone */}
        <View style={styles.dropZone}>
            <Text style={styles.text}>{userAnswer}</Text>
        </View>

        {/* Clear, Calculate, and Undo buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              setUserAnswer();
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            CheckAnswer();
            NextQuestion();
            }}>
            <Image
              source={require('../assets/images/submit.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            handleUndo();
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
            <Text style={styles.text}>Drag your answers into the box above!</Text>
          </View>
        </View>
        
        {/* All Calculator buttons
          TODO: Remove extra buttons since we only need 0-9 and a negative button (if we want more complex numbers we could add a period for decimals)
        */}
        <CalculatorButton x= {width/4}   y= {75}  value= {1}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4*2} y= {75}  value= {2}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4*3} y= {75}  value= {3}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}  textColor={Theming.txt1} />
        <CalculatorButton x= {width/4}   y= {150} value= {4}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4*2} y= {150} value= {5}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4*3} y= {150} value= {6}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x= {width/4}   y= {225} value= {7}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4*2} y= {225} value= {8}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4*3} y= {225} value= {9}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}  textColor={Theming.txt3} />
        <CalculatorButton x= {width/4}   y= {300} value= {'-'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
        <CalculatorButton x= {width/4*2} y= {300} value= {0}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
        <CalculatorButton x= {width/4*3} y= {300} value= {'.'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}  textColor={Theming.txt4} />
      </View>        
  );
}

export default QuizScreen;