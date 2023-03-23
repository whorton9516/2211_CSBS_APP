import React, { useState, useEffect } from "react";
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

const CalculatorScreen = ({navigation}) => {

  let ButtonWindowHeight = height - 250;
  
  const db = getDb();

  // State management variables
  const defaultAnswerWindow = 'Drag the numbers into the box above!';
  const incorrectValuesString = 'Make sure the first number is\nlarger than the second if you\nwant to do that!';
  const [answer, setAnswer] = useState(defaultAnswerWindow);
  const [equation, setEquation] = useState(['','','']);
  const [equationString, setEquationString] = useState('');
  const [remainder, setRemainder] = useState(0);
  const [initialRun, setInitial] = useState(Theming.initial);
  const [visible, setVisible] = useState(false);
  let altEquation = ["","",""];
  let altAnswer = -1;
  let altRemainder = 0;
  let valErrString = 'Your numbers were too big but take a look at a similar example.\nLet\'s try: ' + toString(altEquation) + '=' + altAnswer;
  let useAltEquation = false;
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
            setEquation([equation[0], value, equation[2]]);
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

  const setData = () => {
    GetCalcData.equation = equation;
    GetCalcData.answer = answer;
    GetCalcData.boilerplate = setBoilerPlate();
    if (remainder != '') {
      GetCalcData.remainder = remainder;
    }
    else {
      GetCalcData.remainder = '';
    }
    GetCalcData.altEquation = altEquation;
    GetCalcData.altAnswer = altAnswer;
    GetCalcData.altRemainer = altRemainder;
  }

  const setBoilerPlate = () => {
    let boilerText = '';
    let altText = '';

    boilerText += altText;

    switch (equation[1]) {
      case '+':
        boilerText += 'Addition is when we add two groups of things together to get a larger group.\n\n';
        if (equation[0] > 25 || equation[2] > 25) {
          useAltEquation = true;
          if (equation[0] > 25 && equation[2] > 25){
            altEquation[0] = Math.floor(Math.random() * 24) + 2;
            altEquation[1] = '+';
            altEquation[2] = Math.floor(Math.random() * 24) + 2;
            altAnswer = Calculate(altEquation)[0];
          } else if(equation[0] > 25 && equation[2] <= 25) {

          } else if(equation[0] <= 25 && equation[2] > 25) {

          }
        }
        break;
      case '-':
        boilerText += 'Subtraction is when we take some things out of a group and are left with a smaller group of items.';
        if (equation[0] > 25 || equation[2] > 25) {
          useAltEquation = true;
          if (equation[0] > 25 && equation[2] > 25){
            altEquation[0] = Math.floor(Math.random() * 24) + 2;
            altEquation[1] = '-';
            altEquation[2] = Math.floor(Math.random() * (altEquation[0] - 1)) + 2;
            altAnswer = Calculate(altEquation)[0];
          }
        }
        break;
      case '*':
        boilerText += 'Mulitiplication is how we find the total numer of items for multiple groups that have the same number of items. ';
        if (answer > 50) {
          useAltEquation = true;
          altEquation[0] = Math.floor(Math.random() * 7) + 2;
          altEquation[1] = '*';
          altEquation[2] = Math.floor(Math.random() * 7) + 2;
          altAnswer = Calculate(altEquation)[0];
        }
        break;
      case '/':
        boilerText += 'Division is when we split a large group of items into smaller, equally sized groups. '
        if (equation[0] > 20 || equation[2] > 20){
          useAltEquation = true;
          altEquation[0] = Math.floor(Math.random() * 19) + 2;
          altEquation[1] = '/';
          altEquation[2] = Math.floor(Math.random() * (altEquation[0] - 1)) + 2;
          altAnswer = Calculate(altEquation)[0];
        }
        break;
    }
    if (useAltEquation) {
      boilerText += valErrString;
    } else {
      boilerText += 'Take a look at this example below:'
    }
    return boilerText;
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useFocusEffect(
    React.useCallback(() => {
      setEquation(['','','']);
      setAnswer(defaultAnswerWindow);
      setRemainder(0);
    }, [])
  );

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
          if (equation[2] > equation[0]){
            if (equation[1] == '-' || equation[1] == '/'){
              setEquation(['','','']);
              setAnswer(incorrectValuesString);
              setRemainder(0);
              return;
            }
          }
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
        <View>
          <Text style={styles.text}>{answer}</Text>
        </View>
        <View>
        {(remainder > 0) ? (<Text style={styles.text}>With a remainder of {remainder}</Text>) :
            (<Text></Text>)}
        </View>
        <View>
          {(answer != defaultAnswerWindow && answer != incorrectValuesString) ? (
            <TouchableOpacity onPress={() => {
              setData();
              navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
            }}>
              <Text style={[styles.text, {fontSize: 20, textDecorationLine: 'underline'}]}>Tap here to see why this is the answer!</Text>
            </TouchableOpacity>
          ) :
          (<Text></Text>)}
        </View>
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
  );
}

export default CalculatorScreen;