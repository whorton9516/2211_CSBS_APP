import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Draggable from 'react-native-draggable';

const CalculatorButton = () => {

    return (
        <View >
            <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle='true' shouldReverse='true' onShortPressRelease={()=>alert('touched!!')}/> 
            <Draggable x={200} y={300} renderColor='red' renderText='B'/>
            <Draggable/>
        <Draggable x={50} y={50}>
        </Draggable>
        </View>
    );
}

const styles = StyleSheet.create({});

export default CalculatorButton;