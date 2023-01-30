import React from 'react';
import { View, StyleSheet } from 'react-native'
import Draggable from 'react-native-draggable';

const CalculatorButton = ({imageSource, x, y, value, handleRelease}) => {

    return (
        <View>
            <Draggable
                imageSource={imageSource}
                x= {x}
                y= {y}
                shouldReverse
                onDragRelease= {(e, gesture) => handleRelease(value, gesture.moveX, gesture.moveY - 50)}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;