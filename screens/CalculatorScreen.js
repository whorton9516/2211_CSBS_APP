import React, { useState, useEffect } from "react";
import {
  StyleSheet, 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";
import getDb from "../hooks/GetDB"
import Colors from "../constants/Colors";

const {width, height} = Dimensions.get('window');
const defaultAnswerWindow = 'Drag the numbers into the box above!';

const CalculatorScreen = ({navigation}) => {

  const db = getDb();

  // State management variables
  const [answer, setAnswer] = useState(defaultAnswerWindow);
  const [equation, setEquation] = useState(['','','']);
  const [equationString, setEquationString] = useState('');
  const [remainder, setRemainder] = useState(0);

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

  useEffect(() => {
    console.log(equation);
  }, [equation]);

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


  return (

      // Main View
      <View>

        {/* Header */}
        <View height={50}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Explanation', {equationString}, {answer}, {remainder})}>
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
        <CalculatorButton imageSource= {require('../assets/images/plus.png')}       x= {width/5}   y= {50}  value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.red.background} textColor={Colors.red.text} />
        <CalculatorButton imageSource= {require('../assets/images/minus.png')}      x= {width/5*2} y= {50}  value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.red.background} textColor={Colors.red.text} />
        <CalculatorButton imageSource= {require('../assets/images/multiply.png')}   x= {width/5*3} y= {50}  value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.red.background} textColor={Colors.red.text} />
        <CalculatorButton imageSource= {require('../assets/images/divide.png')}     x= {width/5*4} y= {50}  value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.red.background} textColor={Colors.red.text} />
        <CalculatorButton imageSource= {require('../assets/images/1.png')}          x= {width/4}   y= {125} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.green.background} textColor={Colors.green.text} />
        <CalculatorButton imageSource= {require('../assets/images/2.png')}          x= {width/4*2} y= {125} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.green.background} textColor={Colors.green.text} />
        <CalculatorButton imageSource= {require('../assets/images/3.png')}          x= {width/4*3} y= {125} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.green.background} textColor={Colors.green.text} />
        <CalculatorButton imageSource= {require('../assets/images/4.png')}          x= {width/4}   y= {200} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.orange.background} textColor={Colors.orange.text} />
        <CalculatorButton imageSource= {require('../assets/images/5.png')}          x= {width/4*2} y= {200} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.orange.background} textColor={Colors.orange.text} />
        <CalculatorButton imageSource= {require('../assets/images/6.png')}          x= {width/4*3} y= {200} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.orange.background} textColor={Colors.orange.text} />
        <CalculatorButton imageSource= {require('../assets/images/7.png')}          x= {width/4}   y= {275} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.blue.background} textColor={Colors.blue.text} />
        <CalculatorButton imageSource= {require('../assets/images/8.png')}          x= {width/4*2} y= {275} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.blue.background} textColor={Colors.blue.text} />
        <CalculatorButton imageSource= {require('../assets/images/9.png')}          x= {width/4*3} y= {275} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.blue.background} textColor={Colors.blue.text} />
        <CalculatorButton imageSource= {require('../assets/images/0.png')}          x= {width/4*2} y= {350} value= {0}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} bgColor={Colors.red.background} textColor={Colors.red.text} />
        
      </View>
  )
}


// All styles
const styles = StyleSheet.create({
  dropZone: {
    alignSelf:'center',
    height: 125,
    width: (width - 50),
    backgroundColor: 'white'
  },
  answerBox: {
    alignSelf: 'center',
    width: (width - 75),
    height: 100,
    backgroundColor: 'white'
  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 30,
    fontFamily: 'MaryKate',
    fontWeight: "bold",
    alignContent: 'center'
    },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttons: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 50,
    borderRadius: 50
  },
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
    width: 150,
    top: 475,
    left: -5
  },
  back: {
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

export default CalculatorScreen;