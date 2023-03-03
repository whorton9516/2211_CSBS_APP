import React, { useState, useEffect, } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";
import getDb from "../hooks/GetDB"
import Theming from "../hooks/Theming"
import Colors from "../constants/Colors";
import GetCalcData from '../hooks/GetCalcData';
import styles from '../constants/styles';
import { useFocusEffect } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');
const defaultAnswerWindow = 'Drag the numbers into the box above!';

const CalculatorScreen = ({navigation}) => {

  const db = getDb();

  // State management variables
  const [answer, setAnswer] = useState(defaultAnswerWindow);
  const [equation, setEquation] = useState(['','','']);
  const [equationString, setEquationString] = useState('');
  const [remainder, setRemainder] = useState(0);
  const [initialRun, setInitial] = useState(Theming.initial);

  // Handles the on-screen position functionality of the onDragRelease event
  const GetPosition = (value, xRel, yRel) => {
      if (yRel < 0 && xRel > 25 && xRel < width-25){
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

  useEffect(() => {
    console.log(equation);
  }, [equation]);

  useEffect(() => {
   // loadData();
  }, []);

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

  {/*
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

  */}
    
    return answer;
  }

  const setData = (equation, answer, remainder) => {
    GetCalcData.equation = equation;
    console.log("GetCalcData equation = " + GetCalcData.equation);
    GetCalcData.answer = answer;
    GetCalcData.remainder = remainder;
  }

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
            setData(equation, answer, remainder);
            navigation.navigate('Calculator', {screen: 'ExplanationScreen'});
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
        
        {/* All Calculator buttons
          TODO: Change the mathematic symbol positions to a dynamic position rather than hardcoded
        */}
        <CalculatorButton x={width/5}   y={50}  value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*2} y={50}  value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*3} y={50}  value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/5*4} y={50}  value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        <CalculatorButton x={width/4}   y={125} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x={width/4*2} y={125} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x={width/4*3} y={125} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg2}  textColor={Theming.txt2} />
        <CalculatorButton x={width/4}   y={200} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3} textColor={Theming.txt3} />
        <CalculatorButton x={width/4*2} y={200} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3} textColor={Theming.txt3} />
        <CalculatorButton x={width/4*3} y={200} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg3} textColor={Theming.txt3} />
        <CalculatorButton x={width/4}   y={275} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}   textColor={Theming.txt4} />
        <CalculatorButton x={width/4*2} y={275} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}   textColor={Theming.txt4} />
        <CalculatorButton x={width/4*3} y={275} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg4}   textColor={Theming.txt4} />
        <CalculatorButton x={width/4*2} y={350} value= {0}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Theming.bg1}    textColor={Theming.txt1} />
        
      </View>
  )
}

export default CalculatorScreen;