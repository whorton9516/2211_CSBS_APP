import React, {useState, useReducer} from 'react';
import { Text, View, StyleSheet, PanResponder } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

const TestingScreen = props => {

    const [equation, setEquation] = useState('');

    const GetPosition = (value, xRel, yRel) => {
        console.log('button ' + value + ' released at x:' + xRel + ' y:' + yRel);
        if (yRel < 200){
            console.log('button ' + value + ' was logged');
            setEquation(equation + value + ' ');
            console.log(equation);
        }
    }

    return (
        <View>
            <View style={styles.dropZone}> 
                <Text style={styles.text}>{equation}</Text>
            </View>

            <CalculatorButton x= {125} y= {200} value= {1} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {200} y= {200} value= {2} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {275} y= {200} value= {3} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {125} y= {275} value= {4} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {200} y= {275} value= {5} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {275} y= {275} value= {6} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {125} y= {350} value= {7} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {200} y= {350} value= {8} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {275} y= {350} value= {9} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {125} y= {425} value= {10} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {200} y= {425} value= {11} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {275} y= {425} value= {12} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {375} y= {200} value= {'+'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {375} y= {275} value= {'-'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {375} y= {350} value= {'*'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
            <CalculatorButton x= {375} y= {425} value= {'/'} handleRelease={(num, xRel, yRel) => GetPosition(num, xRel, yRel)} />
        </View>
    )
}

const styles = StyleSheet.create({
    dropZone: {
        height: 200,
        backgroundColor: "white"
      },
    text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "black",
    fontSize: 25,
    fontWeight: "bold"
    }
});

export default TestingScreen;