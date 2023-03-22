import React, { useState, } from "react";
import { 
  View,
  Text,
} from "react-native";
import getDB from '../hooks/GetDB';
import styles from '../constants/styles';

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

  const getTotalCalculations = (db) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as total FROM calculator_data', [], (_, { rows }) => {
        setTotalCalculations(rows.item(0).total);
      });
    });

    return totalCalculations;
  }

  const getMostPopular = (db) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT type, COUNT(*) as count FROM calculator_data GROUP BY type ORDER BY count DESC LIMIT 1', [], (_, { rows }) => {
        setMostPopular(rows.item(0).type);
      });
    });

    switch(mostPopular){
      case '+':
        return 'Addition';
      case '-':
        return 'Subtraction';
      case '*':
        return 'Multiplication';
      case '/':
        return 'Division';
    }
  }

  const getAddPercentage = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['+'],
        (_, results) => {
          setAddPercentage(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return addPercentage;
  }

  const getSubPercentage = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['-'],
        (_, results) => {
          setSubPercentage(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return subPercentage;
  }

  const getMulPercentage = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['*'],
        (_, results) => {
          setMulPercentage(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return mulPercentage;
  }

  const getDivPercentage = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['/'],
        (_, results) => {
          setDivPercentage(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return divPercentage;
  }

  const getQuizAverage = (db) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT AVG(total_correct / total_questions) as avg_percentage FROM quizzes', [], (_, { rows }) => {
        setQuizAverage((rows.item(0).avg_percentage * 100).toFixed(2));
      });
    });

    return quizAverage;
  }

  const getMissedTypes = (db) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT question, type FROM quiz_questions WHERE result = "incorrect" GROUP BY question, type ORDER BY COUNT(*) DESC LIMIT 1', [], (_, { rows }) => {
        setMissedType(`${rows.item(0).type}: ${rows.item(0).question}`);
      });
    });

    return missedType;
  }

  return (
    <View>
      <Text style={styles.text}>You have done a total of {getTotalCalculations(db)} Calculations on this device</Text>
      <Text style={styles.text}>The most popular is {getMostPopular(db)}</Text>
      <Text style={styles.text}>Addition: {getAddPercentage(db)}%</Text>
      <Text style={styles.text}>Subtraction: {getSubPercentage(db)}%</Text>
      <Text style={styles.text}>Multiplication: {getMulPercentage(db)}%</Text>
      <Text style={styles.text}>Division: {getDivPercentage(db)}%</Text>
      <Text style={styles.text}>The average quiz percentage is: {getQuizAverage(db)}%</Text>
      <Text style={styles.text}>The commonly missed questions are: {getMissedTypes(db)}</Text>
    </View>
  );
}


export default StatsScreen