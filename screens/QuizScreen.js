import { Overlay } from 'react-native-elements';
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet, 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Button
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";

let numCorrect = 0;
let numRun = 1;
let num1 = (Math.floor(Math.random() * 12) + 1);
let num2 = (Math.floor(Math.random() * 12) + 1);
let sym = (Math.floor(Math.random() * 4) + 1); 
const {width, height} = Dimensions.get('window');
const QuizScreen = () => {
  //const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
 // const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  //const [sym, setSym] = useState(Math.floor(Math.random() * 4) + 1);
  const [question, setQues] = useState((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2));
  console.log(question);
  const [equation, setEquation] = useState("");
  const [nullAnswer, setNullAnswer] = useState(true);
  const [elementsInEquation, setElementsInEquation] = useState(0);
  const [visible, setVisible] = useState(true);
  const [overlayView, setOverlay] = useState(<View>
    <View style={styles.overlayBox}>
        <Text style={styles.text}>
        Welcome to the Quizes!
        </Text>
        <Text style={styles.text}>
        You will have 10 questions and will receive your score after.
        </Text>
        <Text style={styles.text}>
        Press Start to begin. Good luck!
        </Text>
        <Button title='Start' onPress={() => setVisible(!visible)}/>
    </View>
    </View>);
    let corr = ' ';
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
      changeOverlay(2);
      toggleOverlay();
    }
    else {
      numRun++;
      changeOverlay(3);
    }
  }

  // Handles generating a new question
  const NextQuestion = () => {
         // setNum1(Math.floor(Math.random() * 12) + 1);
         // setSym(Math.floor(Math.random() * 4) + 1);
         // setNum2(Math.floor(Math.random() * 12) + 1);
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          sym = Math.floor(Math.random() * 4) + 1; 
          setQues(((num1 + ' ' + (ConvertSym(sym)) + ' ' + num2)))
          console.log(numCorrect);
          console.log(question);
          setEquation([]);
          setElementsInEquation(0);
          setNullAnswer(true);
  }
  const changeOverlay = (option) => {
    switch(option) {
      case 1:
        setOverlay(
        <View style={styles.overlayBox}>
            <Text style={styles.overlayText}>
            Welcome to the Quizes!
            </Text>
            <Text style={styles.overlayText}>
            You will have 10 questions and will receive your score after.
            </Text>
            <Text style={styles.overlayText}>
            Press Start to begin. Good luck!
            </Text>
            <Button title='Start' onPress={() => setVisible(!visible)}/>
        </View>)
        break;
        case 2:
          setOverlay(
          <View style={styles.overlayBox}>
              <Text style={styles.overlayText}>
              Congrats on completing your quiz with a score of {numCorrect} out of 10!
              </Text>
              <Text style={styles.overlayText}>
              </Text>
              <Text style={styles.overlayText}>
              Press anywhere to try another quiz.
              </Text>
          </View>)
          numRun = 1;
          numCorrect = 0;
          break;
        case 3:
          setOverlay(
          <View style={styles.overlayBox}>
              <Text style={styles.overlayText}>
              You are {corr}
              </Text>
              <Text style={styles.overlayText}>
              Press next to continue.
              </Text>
              <Button title='Next' onPress={() => setVisible(!visible)}/>
          </View>)
          break;
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
            NextQuestion();
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
        <CalculatorButton imageSource= {require('../assets/images/1.png')}          x= {width/4}   y= {75} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/2.png')}          x= {width/4*2} y= {75} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/3.png')}          x= {width/4*3} y= {75} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/4.png')}          x= {width/4}   y= {150} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/5.png')}          x= {width/4*2} y= {150} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/6.png')}          x= {width/4*3} y= {150} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/7.png')}          x= {width/4}   y= {225} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/8.png')}          x= {width/4*2} y= {225} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/9.png')}          x= {width/4*3} y= {225} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/minus.png')}      x= {width/4}   y= {300}  value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/0.png')}          x= {width/4*2} y= {300} value= {0}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/decimal.png')}    x= {width/4*3} y= {300} value= {'.'}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        {
          overlayView
        }
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
  overlayBox: {
    height: (height - 500),
    width: (width - 100),
    alignContent: 'center',
  },
  overlayText: {
  alignSelf:'center',
  color: "black",
  fontSize: 25,
  fontWeight: "bold",
  alignContent: 'center',
  backgroundColor: 'white',
},
});

export default QuizScreen;
