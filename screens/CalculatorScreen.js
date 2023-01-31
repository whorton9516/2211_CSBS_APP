import React, { useState } from "react";
import {
  StyleSheet, 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image
} from "react-native";
import CalculatorButton from "../components/CalculatorButton";

const {width, height} = Dimensions.get('window');

const CalculatorScreen = () => {

  // State management variables
  const [answer, setAnswer] = useState(145);
  const [equation, setEquation] = useState([]);
  const [nullAnswer, setNullAnswer] = useState(true);
  const [elementsInEquation, setElementsInEquation] = useState(0);
  const [hasRemainder, setHasRemainder] = useState(false);
  const [remainder, setRemainder] = useState(0);

  // Handles the on-screen position functionality of the onDragRelease event
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

  // Main driver function for the calculator
  const Calculate = (equation) => {
    switch(equation[1]) {
      case '+':
        return [parseInt(equation[0]) + parseInt(equation[2]), 0];
      case '-':
        return [parseInt(equation[0]) - parseInt(equation[2]), 0];
      case '*':
        return [parseInt(equation[0]) * parseInt(equation[2]), 0];
      case '/':
        if(setRemainder(parseInt(equation[0]) % parseInt(equation[2])) > 0){
          setHasRemainder(true);
        }
        return [Math.floor((equation[0]) / parseInt(equation[2])), remainder];
    }
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
              setEquation([]);
              setElementsInEquation(0);
              setAnswer(145);
              setNullAnswer(true);
              }}>
            <Image
              source={require('../assets/images/clear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            setAnswer(Calculate(equation)[0]);
            setNullAnswer(false);
            }}>
            <Image
              source={require('../assets/images/calculate.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {
            handleUndo();
            setElementsInEquation(elementsInEquation - 1);
            setAnswer(145);
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
          {nullAnswer ? (
            <Text style={styles.text}>Drag the numbers into the box above!</Text>
            ) : (
            <Text style={styles.text}>{answer}</Text>
            )}
          </View>
          <View>
          {hasRemainder ? (<Text></Text>) :
              (<Text style={styles.text}>With a remainder of {remainder}</Text>)}
          </View>
        </View>
        
        {/* All Calculator buttons
          TODO: Change the mathematic symbol positions to a dynamic position rather than hardcoded
        */}
        <CalculatorButton imageSource= {require('../assets/images/plus.png')}       x= {100}       y= {75}  value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/minus.png')}      x= {165}       y= {75}  value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/multiply.png')}   x= {235}       y= {75}  value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/divide.png')}     x= {300}       y= {75}  value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/1.png')}          x= {width/5}   y= {150} value= {1}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/2.png')}          x= {width/5*2} y= {150} value= {2}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/3.png')}          x= {width/5*3} y= {150} value= {3}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/4.png')}          x= {width/5*4} y= {150} value= {4}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/5.png')}          x= {width/5}   y= {225} value= {5}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/6.png')}          x= {width/5*2} y= {225} value= {6}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/7.png')}          x= {width/5*3} y= {225} value= {7}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/8.png')}          x= {width/5*4} y= {225} value= {8}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/9.png')}          x= {width/5}   y= {300} value= {9}   handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/10.png')}         x= {width/5*2} y= {300} value= {10}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/11.png')}         x= {width/5*3} y= {300} value= {11}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
        <CalculatorButton imageSource= {require('../assets/images/12.png')}         x= {width/5*4} y= {300} value= {12}  handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel-260)} />
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