import { Overlay } from 'react-native-elements';
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet, 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";

let numCorrect = 0;
const {width, height} = Dimensions.get('window');
const QuizScreen = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [sym, setSym] = useState(Math.floor(Math.random() * 4) + 1);
  const [question, setQues] = useState((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2));
  const [corr, setCorr] = useState(' ');
  const [equation, setEquation] = useState("");
  const [nullAnswer, setNullAnswer] = useState(true);
  const [elementsInEquation, setElementsInEquation] = useState(0);
  const [visible, setVisible] = useState(false);

  // Handles comparing your answer to the actual answer
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

  // Handles generating a new question
  const NextQuestion = () => {
          setNum1(Math.floor(Math.random() * 12) + 1);
          setSym(Math.floor(Math.random() * 4) + 1);
          setNum2(Math.floor(Math.random() * 12) + 1);
          setQues(((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2)))
          console.log(numCorrect);
          console.log(question);
          setEquation([]);
          setElementsInEquation(0);
          setNullAnswer(true);
          if (visible) {
            setVisible(!visible);
          }
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
const toggleOverlay = () => {
  setVisible(!visible);
};
  return (
      // Main View
      <View>

        {/* Header */}
        <View height={50}>
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
              setNullAnswer(true);
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            CheckAnswer(GetAnswer(num1, num2, sym), equation);
            //setNullAnswer(false);
            }}>
            <Image
              source={require('../assets/images/submit.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            handleUndo();
            setElementsInEquation(elementsInEquation - 1);
            setNullAnswer(true);
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
        <CalculatorButton imageSource= {require('../assets/images/1.png')}          x= {width/5}   y= {125} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/2.png')}          x= {width/5*2} y= {125} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/3.png')}          x= {width/5*3} y= {125} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/4.png')}          x= {width/5*4} y= {125} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/5.png')}          x= {width/5}   y= {200} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/6.png')}          x= {width/5*2} y= {200} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/7.png')}          x= {width/5*3} y= {200} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/8.png')}          x= {width/5*4} y= {200} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/9.png')}          x= {width/5}   y= {275} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/10.png')}         x= {width/5*2} y= {275} value= {0}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/minus.png')}      x= {width/5*3} y= {275}  value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/12.png')}         x= {width/5*4} y= {275} value= {'.'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />

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
    fontSize: 25,
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
