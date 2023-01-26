import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet, PanResponder } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

const TestingScreen = props => {
    const [button1, setButton1] = useState({x:125, y:400});
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
            <CalculatorButton x= {button1.x} y= {button1.y} value= {1} />
            <CalculatorButton x= {200} y= {400} value= {2} />
            <CalculatorButton x= {275} y= {400} value= {3} />
            <CalculatorButton x= {125} y= {475} value= {4} />
            <CalculatorButton x= {200} y= {475} value= {5} />
            <CalculatorButton x= {275} y= {475} value= {6} />
            <CalculatorButton x= {125} y= {550} value= {7} />
            <CalculatorButton x= {200} y= {550} value= {8} />
            <CalculatorButton x= {275} y= {550} value= {9} />
            <CalculatorButton x= {125} y= {625} value= {10} />
            <CalculatorButton x= {200} y= {625} value= {11} />
            <CalculatorButton x= {275} y= {625} value= {12} />
        </View>
    )
}

const styles = StyleSheet.create({});

export default TestingScreen;