import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'
import QuizQuestion from '../components/QuizQuestion';

let numCorrect = 0;

const QuizScreen = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 12) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 12) + 1);
  const [sym, setSym] = useState(Math.floor(Math.random() * 4) + 1);

  return (
    <View>
        <QuizQuestion num1= {num1}
                      sym= {sym}
                      num2= {num2}
                      ans= {GetAnswer(num1, num2, sym)}/>
        <Button title="Next Question"
        onPress={ () => {
          setNum1(Math.floor(Math.random() * 12) + 1);
          setSym(Math.floor(Math.random() * 4) + 1);
          setNum2(Math.floor(Math.random() * 12) + 1);
          console.log(numCorrect);
        }}
        />
        <Button title="Submit" />
        <View style={{height: 100, width: 100, backgroundColor: CheckAnswer(GetAnswer(num1, num2, sym), 4)}}/> 
    </View>
  );
}

const GetAnswer = (num1, num2, sym) => {
  switch(sym){
    case 1:
      return num1 + num2;
    case 2:
      return num1 - num2;
    case 3:
      return num1 * num2;
    case 4:
      return num1 / num2;
  }
}

const CheckAnswer = (correctAnswer, userAnswer) => {
  if (userAnswer == correctAnswer){
    numCorrect++;
    return `rgb(0, 255, 0)`;
  } else {
    return `rgb(255, 0, 0)`;
  }
}


const styles = StyleSheet.create({

});

export default QuizScreen;
