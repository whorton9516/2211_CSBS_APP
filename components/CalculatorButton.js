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
                onRelease= {(e, gesture) => handleRelease(value, -10, 5000, true)}
                onDragRelease= {(e, gesture) => handleRelease(value, gesture.moveX, gesture.moveY - 50, false)}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;