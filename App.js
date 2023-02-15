import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import { useColorScheme, Text, View } from "react-native";
import {useFonts} from 'expo-font';
import { useState, useEffect } from 'react';
import getDb from "./hooks/GetDB"

const App = () => {

  const db = getDb();

  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Andika': require('./assets/fonts/Andika-Regular.ttf'),
    'KGNeatlyPrinted': require('./assets/fonts/KGNeatlyPrinted.ttf'),
    'Sassoon': require('./assets/fonts/Sassoon-Primary.otf'),
    'MaryKate': require('./assets/fonts/MaryKate.ttf'),
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS calculator_data (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, equation TEXT, type TEXT)',);
    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS quizzes (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_date TEXT, total_questions INTEGER, total_correct INTEGER)',)
    });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS quiz_questions (id INTEGER PRIMARY KEY AUTOINCREMENT, quiz_id INTEGER, question TEXT, result INTEGER, FOREIGN KEY(quiz_id) REFERENCES quizzes(id))',);
    });

    {/*
      db.transaction(tx => {
        tx.executeSql('DELETE FROM calculator_data');
        tx.executeSql('DELETE FROM quizzes');
        tx.executeSql('DELETE FROM quiz_questions')
      });

      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO quizzes (quiz_date, total_questions, total_correct) VALUES (?, ?, ?);',
          ['02022023', 15, 15],
          (tx, results) => {
            console.log('Data inserted successfully');
          },
          (tx, error) => {
            console.log('Error inserting data: ', error);
          }
        );
      });

    
    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM calculator_data',
        [],
        (_, { rows }) => {
          console.log('Calculator data:');
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
          }
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM quizzes',
        [],
        (_, { rows }) => {
          console.log('Quiz data:');
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
          }
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM quiz_questions',
        [],
        (_, { rows }) => {
          console.log('Quiz Questions:');
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
          }
        }
      );
    });
  */}
  

    setIsLoading(false);
  }, []);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading App...</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default App;