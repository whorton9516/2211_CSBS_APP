import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Draggable from 'react-native-draggable';
import { Layout } from 'react-native-reanimated';

const CalculatorButton = ({x, y, value, handleRelease}) => {

    return (
        <View>
            <Draggable 
                x= {x}
                y= {y}
                renderText= {value}
                renderColor='blue'
                shouldReverse
                isCircle
                onDragRelease= {(e, gesture) => handleRelease(value, gesture.moveX, gesture.moveY - 50)}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;