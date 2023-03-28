import React, { useState, useEffect, } from "react";
import { 
  View,
  Text,
} from "react-native";
import * as SQLite from 'expo-sqlite';
import styles from '../constants/styles';

const StatsScreen = ({navigation}) => {
  
  const [totalCalculations, setTotalCalculations] = useState(0);
  const [mostPopular, setMostPopular] = useState('');
  const [addCount, setAddCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [mulCount, setMulCount] = useState(0);
  const [divCount, setDivCount] = useState(0);
  const [quizAverage, setQuizAverage] = useState(0);
  const [missedType, setMissedType] = useState('');

  const db = SQLite.openDatabase('userData.db');

  const getTotalCalculations = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT COUNT(*) as total FROM calculator_data', [], (_, { rows }) => {
        setTotalCalculations(rows.item(0).total);
      });
    });

    return totalCalculations;
  }

  const getMostPopular = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT type, COUNT(*) as count FROM calculator_data GROUP BY type ORDER BY count DESC LIMIT 1', [], (_, { rows }) => {
        if (rows.length > 0) {
          setMostPopular(rows.item(0).type);
        } else {
          setMostPopular('');
        }
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

  const getAddCount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['+'],
        (_, results) => {
          setAddCount(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return addCount;
  }

  const getSubCount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['-'],
        (_, results) => {
          setSubCount(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return subCount;
  }

  const getMulCount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['*'],
        (_, results) => {
          setMulCount(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return mulCount;
  }

  const getDivCount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(*) as count FROM calculator_data WHERE type = ?',
        ['/'],
        (_, results) => {
          setDivCount(results.rows.item(0).count);
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return divCount;
  }

  const getQuizAverage = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT AVG(total_correct/10.0) as average_score FROM quizzes',
        [],
        (_, results) => {
          setQuizAverage(Math.floor(results.rows.item(0).average_score * 100));
        },
        (error) => {
          console.log(error);
        },
      );
    });

    return quizAverage;
  }

  const getMissedTypes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT type, COUNT(*) as count FROM quiz_questions WHERE result = ? GROUP BY type ORDER BY count DESC LIMIT 1',
        [0],
        (_, { rows }) => {
          const mostMissedType = rows.item(0).type;
          switch (mostMissedType) {
            case '+':
              setMissedType('Addition');
              break;
            case '-':
              setMissedType('Subtraction');
              break;
            case '*':
              setMissedType('Multiplication');
              break;
            case '/':
              setMissedType('Division');
              break;
            default:
              setMissedType('Unknown');
              break;
          }
          return missedType;
        },
        (error) => {
          console.log(error);
        },
      );
    });
    return missedType;
  };
  

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);

  return (
    <View>
      <Text style={styles.text}>You have done a total of {getTotalCalculations()} Calculations on this device</Text>
      <Text style={styles.text}>The most popular is {getMostPopular()}</Text>
      <Text style={styles.text}>Addition: {Math.floor((getAddCount()/getTotalCalculations())*100)}%</Text>
      <Text style={styles.text}>Subtraction: {Math.floor((getSubCount()/getTotalCalculations())*100)}%</Text>
      <Text style={styles.text}>Multiplication: {Math.floor((getMulCount()/getTotalCalculations())*100)}%</Text>
      <Text style={styles.text}>Division: {Math.floor((getDivCount()/getTotalCalculations())*100)}%</Text>
      <Text style={styles.text}>The average quiz percentage is: {getQuizAverage()}%</Text>
      <Text style={styles.text}>The commonly missed type is: {getMissedTypes()}</Text>
    </View>
  );
}


export default StatsScreen