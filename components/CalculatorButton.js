import React from 'react';
import { View, StyleSheet } from 'react-native'
import Draggable from 'react-native-draggable';

const CalculatorButton = ({imageSource, x, y, value, handleRelease}) => {

    return (
        <View>
            <Draggable
                imageSource={imageSource}
                renderSize={50}
                x= {x - 25}
                y= {y - 25}
                shouldReverse
                onDragRelease= {(e, gesture) => handleRelease(value, gesture.moveX, gesture.moveY - 50)}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;