import React, { useState, useEffect } from "react";
import {StyleSheet, 
        View,
        TouchableOpacity, 
        StatusBar, 
        TextInput, 
        Keyboard, 
        Dimensions, 
        ScrollView, 
        Text,
        Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { Overlay, Button } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import CalculatorButton from "../components/CalculatorButton";

const calculate = (a, b, sym) => {
  switch(sym) {
    case 1:
      return a + b;
    case 2:
      return a - b;
    case 3:
      return a * b;
    case 4:
      return a / b;
  }
}

const checkempty = (text) => { 
  if (text == undefined ||
      text == null || 
      text.length == 0) { 
      return false; 
  } else {  
      return true; 
  } 
}

const splitinput = (text) => {
  const words = text.split(/[*-/+]+/);
  if (text.indexOf('+') > -1)
  {
    words[2] = '1'
  }
  if (text.indexOf('-') > -1)
  {
    words[2] = '2'
  }
  if (text.indexOf('*') > -1)
  {
    words[2] = '3'
  }
  if (text.indexOf('/') > -1)
  {
    words[2] = '4'
  }
  return words
}
const {width, height} = Dimensions.get('window');

const CalculatorScreen = () => {

  const [equation, setEquation] = useState('');

  const GetPosition = (value, xRel, yRel) => {
      console.log('button ' + value + ' released at x:' + xRel + ' y:' + yRel);
      if (yRel < 125 && xRel > 25 && xRel < width-25){
          console.log('button ' + value + ' was logged');
          setEquation(equation + value + ' ');
          console.log(equation);
      }
  }

  return (
      <View>
        <View height={50}>
          <Text style={styles.text}>Calculate Here!</Text>
        </View>
          <View style={styles.dropZone}> 
              <Text style={styles.text}>{equation}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttons} onPress={() => console.log('Clear button was pressed')}>
              <Image
                source={require('../assets/images/clear.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => console.log('Calculate button was pressed')}>
              <Image
                source={require('../assets/images/calculate.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => console.log('Undo button was pressed')}>
              <Image
                source={require('../assets/images/undo.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <CalculatorButton imageSource= {require('../assets/images/1.png')} x= {width/5} y= {275} value= {1} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/2.png')} x= {width/5*2} y= {275} value= {2} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/3.png')} x= {width/5*3} y= {275} value= {3} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/4.png')} x= {width/5*4} y= {275} value= {4} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/5.png')} x= {width/5} y= {350} value= {5} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/6.png')} x= {width/5*2} y= {350} value= {6} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/7.png')} x= {width/5*3} y= {350} value= {7} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/8.png')} x= {width/5*4} y= {350} value= {8} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/9.png')} x= {width/5} y= {425} value= {9} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/10.png')} x= {width/5*2} y= {425} value= {10} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/11.png')} x= {width/5*3} y= {425} value= {11} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/12.png')} x= {width/5*4} y= {425} value= {12} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/plus.png')} x= {100} y= {200} value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/minus.png')} x= {165} y= {200} value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/multiply.png')} x= {235} y= {200} value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
          <CalculatorButton imageSource= {require('../assets/images/divide.png')} x= {300} y= {200} value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
      </View>
  )
}

const styles = StyleSheet.create({
  dropZone: {
    alignSelf:'center',
    height: 125,
    width: (width - 50),
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