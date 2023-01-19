import React from 'react';
import { Text, StyleSheet } from 'react-native'

const QuizQuestion = props => {
    let symbol = '0';
    switch(props.sym){
        case 1:
            symbol = '+';
            break;
        case 2: 
            symbol = '-';
            break;
        case 3:
            symbol = '*';
            break;
        case 4:
            symbol = '/';
            break;
    }

    return <Text style={styles.Text}>{ props.num1 + ' ' + symbol + ' ' + props.num2 + ' = ' + props.ans }</Text>;
}

const styles = StyleSheet.create({
    Text: {
        color : 'white',
        textAlign : 'center'
    }
});

export default QuizQuestion;
