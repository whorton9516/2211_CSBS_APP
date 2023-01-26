import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet, PanResponder } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

const TestingScreen = props => {
    const [button, setButton] = useState({x:125, y:400});
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderRelease: (e, gesture) => {
                console.log('Button was released at: '+  gesture.moveX + ' ' + gesture.moveY);
            },
        })
    ).current;

    return (
        <View {...panResponder.panHandlers}>
            <CalculatorButton x= {button.x} y= {button.y} value= {1} />
            <CalculatorButton x= {button.x + 75} y= {button.y} value= {2} />
            <CalculatorButton x= {button.x+ 150} y= {button.y} value= {3} />
            <CalculatorButton x= {button.x} y= {button.y + 75} value= {4} />
            <CalculatorButton x= {button.x + 75} y= {button.y + 75} value= {5} />
            <CalculatorButton x= {button.x + 150} y= {button.y + 75} value= {6} />
            <CalculatorButton x= {button.x} y= {button.y + 150} value= {7} />
            <CalculatorButton x= {button.x + 75} y= {button.y + 150} value= {8} />
            <CalculatorButton x= {button.x + 150} y= {button.y + 150} value= {9} />
            <CalculatorButton x= {button.x} y= {button.y + 225} value= {10} />
            <CalculatorButton x= {button.x + 75} y= {button.y + 225} value= {11} />
            <CalculatorButton x= {button.x + 150} y= {button.y + 225} value= {12} />
        </View>
    )
}

const styles = StyleSheet.create({});

export default TestingScreen;