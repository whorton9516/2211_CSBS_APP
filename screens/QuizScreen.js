import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import QuizQuestion from '../components/QuizQuestion';

const QuizScreen = () => {
    return <View>
      <QuizQuestion title= "Question 1" />
      <QuizQuestion title= "Question 2" />
      <QuizQuestion title= "Question 3" />
      <QuizQuestion title= "Question 4" />
      </View>;
}

const styles = StyleSheet.create({});

export default QuizScreen;
