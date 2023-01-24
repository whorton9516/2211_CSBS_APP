import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

const TestingScreen = () => {

    

    return (
        <View>
            <CalculatorButton x= {75} y= {400} value = {1} />
            <CalculatorButton x= {200} y= {400} value = {2} />
            <CalculatorButton x= {325} y= {400} value = {3} />
            <CalculatorButton x= {75} y= {475} value = {4} />
            <CalculatorButton x= {200} y= {475} value = {5} />
            <CalculatorButton x= {325} y= {475} value = {6} />
            <CalculatorButton x= {75} y= {550} value = {7} />
            <CalculatorButton x= {200} y= {550} value = {8} />
            <CalculatorButton x= {325} y= {550} value = {9} />
            <CalculatorButton x= {200} y= {625} value = {0} />
        </View>
    );
}

const styles = StyleSheet.create({});

export default TestingScreen;