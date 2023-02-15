import React from 'react';
import { View, Text } from 'react-native'
import Draggable from 'react-native-draggable';
import styles from '../constants/styles';
import Colors from '../constants/Colors';

const CalculatorButton = ({x, y, value, handleRelease, bgColor, textColor}) => {
    
    return (
        <View>
            <Draggable
                //imageSource={imageSource}
                renderSize={50}
                x= {x - 25}
                y= {y - 25}
                shouldReverse
                onRelease= {(e, gesture) => handleRelease(value, -10, 5000, true)}
                onDragRelease= {(e, gesture) => handleRelease(value, gesture.moveX, gesture.moveY - 50, false)}>
                    <View style={[styles.calculatorButton, {backgroundColor: bgColor}]}>
                        <Text style={[styles.calculatorButtonText, {color: textColor}]}>
                            {value}
                        </Text>
                    </View>
                </Draggable>
        </View>
    );
}

const getColor = () => {
    switch(Math.floor(Math.random() * 5)){
        case 0:
            return Colors.red;
        case 1:
            return Colors.orange;
        case 2:
            return Colors.yellow;
        case 3:
            return Colors.green;
        case 4:
            return Colors.blue;
    }
}

export default CalculatorButton;