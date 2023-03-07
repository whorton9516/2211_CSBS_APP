import { Overlay } from 'react-native-elements';
import React, { useState } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Button
} from "react-native";
import styles from '../constants/styles';
import CalculatorButton from '../components/CalculatorButton';
import Colors from '../constants/Colors';
import Theming from "../hooks/Theming"
import getDB from '../hooks/GetDB';

const StatsScreen = () => {
  
  const [totalCalculations, setTotalCalculations] = useState(0);
  const [mostPopular, setMostPopular] = useState('');
  const [addPercentage, setAddPercentage] = useState(0);
  const [subPercentage, setSubPercentage] = useState(0);
  const [mulPercentage, setMulPercentage] = useState(0);
  const [divPercentage, setDivPercentage] = useState(0);
  const [quizAverage, setQuizAverage] = useState(0);
  const [missedType, setMissedType] = useState('');

  const db = getDB();

  useEffect(() => {
    // Query the database and set the state variables with the results
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as total FROM calculator_data', [], (_, { rows }) => {
        setTotalCalculations(rows.item(0).total);
      });
      tx.executeSql('SELECT type, COUNT(*) as count FROM calculator_data GROUP BY type ORDER BY count DESC LIMIT 1', [], (_, { rows }) => {
        setMostPopular(rows.item(0).type);
      });
      tx.executeSql('SELECT COUNT(*) as total, type FROM calculator_data GROUP BY type', [], (_, { rows }) => {
        rows.forEach((row) => {
          const percentage = ((row.total / totalCalculations) * 100).toFixed(2);
          switch (row.type) {
            case 'addition':
              setAdditionPercentage(percentage);
              break;
            case 'subtraction':
              setSubtractionPercentage(percentage);
              break;
            case 'multiplication':
              setMultiplicationPercentage(percentage);
              break;
            case 'division':
              setDivisionPercentage(percentage);
              break;
          }
        });
      });
      tx.executeSql('SELECT AVG(total_correct / total_questions) as avg_percentage FROM quizzes', [], (_, { rows }) => {
        setAverageQuizPercentage((rows.item(0).avg_percentage * 100).toFixed(2));
      });
      tx.executeSql('SELECT question, type FROM quiz_questions WHERE result = "incorrect" GROUP BY question, type ORDER BY COUNT(*) DESC LIMIT 1', [], (_, { rows }) => {
        setCommonlyMissedQuestions(`${rows.item(0).type}: ${rows.item(0).question}`);
      });
    });
  }, []);

  return (
    <View>
      <Text>You have done a total of {totalCalculations} Calculations on this device</Text>
      <Text>The most popular is {mostPopular}</Text>
      <Text>Addition: {additionPercentage}%</Text>
      <Text>Subtraction: {subtractionPercentage}%</Text>
      <Text>Multiplication: {multiplicationPercentage}%</Text>
      <Text>Division: {divisionPercentage}%</Text>
      <Text>The average quiz percentage is: {averageQuizPercentage}%</Text>
      <Text>The commonly missed questions are: {commonlyMissedQuestions}</Text>
    </View>
  );
}

const PrintBoiler = (totalCalculations, mostPopular, addPercentage, subPercentage, mulPercentage, divPercentage, quizAvgerage, missedType) => {

}


export default StatsScreen