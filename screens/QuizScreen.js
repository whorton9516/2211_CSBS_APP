import React, { useState, useEffect, useRef } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Animated,
} from "react-native";
import styles from '../constants/styles';
import { Overlay } from 'react-native-elements';
import CalculatorButton from '../components/CalculatorButton';
import Theming from "../hooks/Theming"
import getDB from '../hooks/GetDB';
import GetQuizData from '../hooks/GetQuizData';

const {width, height} = Dimensions.get('window');


const QuizScreen = ({navigation}) => {
  const defaultString = ('Drag your answer here!');
  const nullAnswerString = ('Enter an answer before submitting!');
  const [dropZoneString, setDropZoneString] = useState(defaultString);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [userAnswer, setUserAnswer] = useState('');
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [bgColor, setBGColor] = useState('white');
  const [visible, setVisible] = useState(false);
  const [resultsString, setResultsString] = useState('');


  const fadeAnim = useRef(new Animated.Value(1)).current;
  const textColor = useRef(new Animated.Value(1)).current;
  const db = getDB();

  // Handles comparing your answer to the actual answer
  const CheckAnswer = () => {
    setQuestionsAsked(questionsAsked + 1);
    if (userAnswer == answer){
      setTotalCorrect(totalCorrect + 1);
      setBGColor('green');
      console.log('Correct')
    } else {
      setBGColor('red');
      console.log('Wrong Silly')
    }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: false,
    }).start(() => {
      setBGColor('white');
      fadeAnim.setValue(1);
    });

    if (questionsAsked == 9 || userAnswer == '789') {
      setResultsString(displayFinalScore());
      toggleOverlay();
    }
  }

  const navigateBack = () => {
    navigation.navigate('Quizzes', {screen: 'QuizEntryScreen'});
    toggleOverlay();
  }

  // Handles generating a new question
  const NextQuestion = () => {
    setUserAnswer('');
    const symbolMap = {
      '+': GetQuizData.addition,
      '-': GetQuizData.subtraction,
      '*': GetQuizData.multiplication,
      '/': GetQuizData.division
    };
    const allowedSymbols = Object.entries(symbolMap)
      .filter(([symbol, allowed]) => allowed)
      .map(([symbol]) => symbol);
      let num1 = Math.floor(Math.random() * 24) + 2;
      let num2 = Math.floor(Math.random() * num1 - 1) + 2;
      let sym = allowedSymbols[Math.floor(Math.random() * allowedSymbols.length)];
      let eqStr = num1.toString() + sym + num2.toString();
      setQuestion(eqStr);
      setAnswer(eval(eqStr));
      setDropZoneString(defaultString);
  }

  const displayFinalScore = () => {
    if (totalCorrect < 3){
      return 'Uh Oh! Looks like we need to keep practicing';
    } else if ( totalCorrect >= 3 && totalCorrect < 5) {
      return 'I know you can do better! Let\'s keep practicing';
    } else if ( totalCorrect >= 5 && totalCorrect < 7) {
      return 'Good job! Let\'s keep practicing!';
    } else if (totalCorrect >= 7 && totalCorrect < 10) {
      return 'Great job! You\'re almost there! Keep practicing for that perfect score';
    } else if (totalCorrect == 10) {
      return 'Wow! You must be really smart!';
    }
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
    const newAnswerString = userAnswer.toString().slice(0, -1);
    setUserAnswer(newAnswerString);
  }

  useEffect(() => {
    NextQuestion();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
      // Main View
      <View>
        {/* Header */}
        <View style={styles.viewHeader} height={50}>
          <Text style={styles.text}>{question}</Text>
        </View>

        {/* Button Drop Zone */}
        <View style={styles.dropZone}>
        <Animated.View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: bgColor, opacity: fadeAnim}} />
            {(userAnswer === '') ? (<Text style={styles.text}>{dropZoneString}</Text>) :
                    (<Text style={styles.text}>{userAnswer}</Text>)}
        </View>

        {/* Clear, Calculate, and Undo buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              setUserAnswer('');
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            if (userAnswer != ''){
              CheckAnswer();
              NextQuestion();
            } else { setDropZoneString(nullAnswerString); }
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

        {/* Box to display the quiz grade */}
        <View style={{width: (width - 75), alignSelf: 'center', height: 100, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: (width-75)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
              <Text style={[styles.text, {alignSelf: 'center'}]}>Questions Asked</Text>
            </View>
            <View style={{width: (width-75)/2, flex: 1, alignItems: 'flex-end'}}>
              <Text style={[styles.text, {alignSelf: 'center'}]}>Total Correct</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: (width-75)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
              <Text style={[styles.text, {alignSelf: 'center'}]}>{questionsAsked}</Text>
            </View>
            <View style={{width: (width-75)/2, flex: 1, alignItems: 'flex-end'}}>
              <Text style={[styles.text, {alignSelf: 'center'}]}>{totalCorrect}</Text>
            </View>
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
        <CalculatorButton x= {width/4*2} y= {300} value= {0}    handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}  textColor={Theming.txt4} />

        <Overlay isVisible={visible} onBackdropPress={navigateBack} style={styles.overlayBox}>
          <Text style={[styles.text, {padding: 10}]}>
            You got {totalCorrect} questions correct.
          </Text>
          <Text style={[styles.text, {padding: 10}]}>
            {resultsString}
          </Text>
          <Text style={[styles.text, {padding: 10, fontSize: 24, }]}>
            Press anywhere to continue
          </Text>
        </Overlay>
      </View>        
  );
}

export default QuizScreen;