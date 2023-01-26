import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Draggable from 'react-native-draggable';

const CalculatorButton = props => {

    const releasePosition = 100;

    function handleRelease() {
        console.log('Button Released')
    };


    return (
        <View>
            <Draggable 
                x= {props.x}
                y= {props.y}
                renderText= {props.value}
                renderColor='blue'
                shouldReverse
                isCircle
                // onRelease= {handleRelease}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;