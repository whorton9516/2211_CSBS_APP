import React, { useState, useEffect, } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Button,
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";
import getDb from "../hooks/GetDB"
import Theming from "../hooks/Theming"
import Colors from "../constants/Colors";
import GetCalcData from '../hooks/GetCalcData';
import styles from '../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { Overlay } from 'react-native-elements';

const {width, height} = Dimensions.get('window');
const defaultAnswerWindow = 'Drag the numbers into the box above!';

const CalculatorScreen = ({navigation}) => {

  let ButtonWindowHeight = height - 250;
  
  const db = getDb();

  // State management variables
  const [answer, setAnswer] = useState(defaultAnswerWindow);
  const [equation, setEquation] = useState(['','','']);
  const [equationString, setEquationString] = useState('');
  const [remainder, setRemainder] = useState(0);
  const [initialRun, setInitial] = useState(Theming.initial);
  const [visible, setVisible] = useState(false);

  // Handles the on-screen position functionality of the onDragRelease event
  const GetPosition = (value, xRel, yRel) => {
      if (yRel > 100 && yRel < 225 && xRel > 25 && xRel < width-25){
          if(typeof value ==='number'){
            if(equation[1] === ''){
              setEquation([equation[0] + value.toString(), equation[1], equation[2]]);
            } else {
              setEquation([equation[0], equation[1], equation[2] + value.toString()]);
            }
          } else {
            setEquation([equation[0], equation[1] + value, equation[2]]);
          }
      }
  }

  const loadData = () => {
    if (!Theming.initial) {
      Theming.bg1 = Colors.red.background;
      Theming.txt1 = Colors.red.text;
      Theming.bg2 = Colors.green.background;
      Theming.txt2 = Colors.green.text;
      Theming.bg3 = Colors.orange.background;
      Theming.txt3 = Colors.orange.text;
      Theming.bg4 = Colors.blue.background;
      Theming.txt4 = Colors.blue.text;
      Theming.initial = true;
      Theming.colorBlind = false;
      setInitial(Theming.initial);
      console.log('initial load has run');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );
  
  // Handles the undo button
  const handleUndo = () => {
    if(equation[2] != ''){
      setEquation([equation[0], equation[1], '']);
    } else if (equation[1] != ''){
      setEquation([equation[0], '', '']);
    } else {
      setEquation(['','','']);
    }
  }

  // Main driver function for the calculator
  const Calculate = (equation) => {
    let answer = [];

    switch(equation[1]) {
      case '+':
        answer = [parseInt(equation[0]) + parseInt(equation[2]), setRemainder(0)];
        break;
      case '-':
        answer = [parseInt(equation[0]) - parseInt(equation[2]), setRemainder(0)];
        break;
      case '*':
        answer = [parseInt(equation[0]) * parseInt(equation[2]), setRemainder(0)];
        break;
      case '/':
        setRemainder(parseInt(equation[0]) % parseInt(equation[2]))
        answer = [Math.floor((equation[0]) / parseInt(equation[2])), remainder];
        break;
    }

    setEquationString(JSON.stringify(equation));

    let date = new Date();
    let dateString = date.toLocaleDateString();
    
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO calculator_data (date, equation, type) VALUES (?, ?, ?);',
        [dateString, equationString, equation[1]],
        (tx, results) => {
          console.log('Data inserted successfully');
        },
        (tx, error) => {
          console.log('Error inserting data: ', error);
        }
      );
    });
    
    return answer;
  }

  const setData = (equation, answer, remainder, boiler) => {
    GetCalcData.equation = equation;
    GetCalcData.answer = answer;
    GetCalcData.boilerplate = boiler;
    if (remainder != '') {
      GetCalcData.remainder = 'Remainder of ', {remainder};
    }
    else {
      GetCalcData.remainder = '';
    }
  }

  const navigateExplanation = (equation, answer, remainder) => {
    var addEquation = ['10','+','5'];
    var minusEquation = ['17','-','6'];
    if(answer > 25 || equation[0] > 25 || equation[2] > 25) {
      if (equation[1] == '+'){
        setData(addEquation, 15, 0, 'Your question was too hard for us! Here is something similar.');
        console.log('plus')
        navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
      }
      if (equation[1] == '-'){
        setData(minusEquation, 11, 0, 'Your question was too hard for us! Here is something similar.');
        console.log('minus')
        navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
      }
    }
    if (equation[1] == '*' || equation[1] == '/') {
      console.log('multiplication/division')
      toggleOverlay();
    }
    else {
      console.log('normal')
      navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
      // Main View
      <View>
        {/* Header */}
        <View style={styles.viewHeader} height={50}>
          <Text style={styles.text}>Calculate Here!</Text>
        </View>

        {/* Button Drop Zone */}
        <View style={styles.dropZone}>
            <Text style={styles.text}>{equation}</Text>
        </View>

        {/* Clear, Calculate, and Undo buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}
            onPress={() => {
              setEquation(['','','']);
              setAnswer(defaultAnswerWindow);
              setRemainder(0);
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            setAnswer(Calculate(equation)[0]);
          }}>
            <Image
              source={require('../assets/images/calculate.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            handleUndo();
            setAnswer(defaultAnswerWindow);
          }}>
            <Image
              source={require('../assets/images/undo.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        {/* Box to display the answer */}
        <View style={styles.answerBox}>
          <TouchableOpacity onPress={() => {
            setData(equation, answer, remainder, '');
            navigateExplanation(equation, answer, remainder);
            //navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
          }}>
            <View>
              <Text style={styles.text}>{answer}</Text>
            </View>
            <View>
            {(remainder > 0) ? (<Text style={styles.text}>With a remainder of {remainder}</Text>) :
                (<Text></Text>)}
            </View>
          </TouchableOpacity>
        </View>
        
        {/* All Calculator buttons */}
        <CalculatorButton x={width/5}   y={ButtonWindowHeight/9 - (ButtonWindowHeight/6)/2 + 40} value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*2} y={ButtonWindowHeight/9 - (ButtonWindowHeight/6)/2 + 40} value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*3} y={ButtonWindowHeight/9 - (ButtonWindowHeight/6)/2 + 40} value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*4} y={ButtonWindowHeight/9 - (ButtonWindowHeight/6)/2 + 40} value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/4}   y={ButtonWindowHeight/9*2-(ButtonWindowHeight/6)/2 + 40} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}    textColor={Theming.txt2} />
        <CalculatorButton x={width/4*2} y={ButtonWindowHeight/9*2-(ButtonWindowHeight/6)/2 + 40} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}    textColor={Theming.txt2} />
        <CalculatorButton x={width/4*3} y={ButtonWindowHeight/9*2-(ButtonWindowHeight/6)/2 + 40} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg2}    textColor={Theming.txt2} />
        <CalculatorButton x={width/4}   y={ButtonWindowHeight/9*3-(ButtonWindowHeight/6)/2 + 40} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}    textColor={Theming.txt3} />
        <CalculatorButton x={width/4*2} y={ButtonWindowHeight/9*3-(ButtonWindowHeight/6)/2 + 40} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}    textColor={Theming.txt3} />
        <CalculatorButton x={width/4*3} y={ButtonWindowHeight/9*3-(ButtonWindowHeight/6)/2 + 40} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg3}    textColor={Theming.txt3} />
        <CalculatorButton x={width/4}   y={ButtonWindowHeight/9*4-(ButtonWindowHeight/6)/2 + 40} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}    textColor={Theming.txt4} />
        <CalculatorButton x={width/4*2} y={ButtonWindowHeight/9*4-(ButtonWindowHeight/6)/2 + 40} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}    textColor={Theming.txt4} />
        <CalculatorButton x={width/4*3} y={ButtonWindowHeight/9*4-(ButtonWindowHeight/6)/2 + 40} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg4}    textColor={Theming.txt4} />
        <CalculatorButton x={width/4*2} y={ButtonWindowHeight/9*5-(ButtonWindowHeight/6)/2 + 40} value= {0}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={styles.overlayBox}>
        <Text style={styles.overlayText}>
        That question is too hard for us! We can only do addition and subtraction for now! Press anywhere to continue.
        </Text>
    </Overlay>
      </View>
  )
}

export default CalculatorScreen;