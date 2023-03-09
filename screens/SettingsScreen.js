import React, { useState, } from "react";
import { StyleSheet,
         View,
         StatusBar,
         Button,
         Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Theming from "../hooks/Theming"
import Colors from "../constants/Colors";
import * as SQLite from 'expo-sqlite';

const {width, height} = Dimensions.get('window');

export default function SettingsScreen({navigation}) {

  const [colorTheme, setColorTheme] = useState(0);
  const [colorBlindMode, setColorBlindMode] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const db = SQLite.openDatabase('userData.db');

  const setTheme = (darkMode) => {
    console.log('run');
  if (darkMode) {
  }
  else {
    if (Theming.colorBlind) {
      Theming.bg1 = Colors.red.background;
      Theming.txt1 = Colors.red.text;
      Theming.bg2 = Colors.green.background;
      Theming.txt2 = Colors.green.text;
      Theming.bg3 = Colors.orange.background;
      Theming.txt3 = Colors.orange.text;
      Theming.bg4 = Colors.blue.background;
      Theming.txt4 = Colors.blue.text;
      Theming.colorBlind = false;
    }
    else {
      Theming.bg1 = Colors.red.bgc;
      Theming.txt1 = Colors.red.txtc;
      Theming.bg2 = Colors.green.bgc;
      Theming.txt2 = Colors.green.txtc;
      Theming.bg3 = Colors.orange.bgc;
      Theming.txt3 = Colors.orange.txtc;
      Theming.bg4 = Colors.blue.bgc;
      Theming.txt4 = Colors.blue.txtc;
      Theming.colorBlind = true;
    }
  }
  }
  const savePreferences = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS userSettings (colorTheme INTEGER, colorBlindMode INTEGER, darkMode BOOLEAN);'
      );
      tx.executeSql(
        'INSERT INTO preferences (colorTheme, colorBlindMode, darkMode) VALUES (?, ?, ?);',
        [colorTheme, colorBlindMode, darkMode]
      );
    });
  }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Grid><Row></Row>
          <Row><Col size={1}></Col>
        <Col size={3}>
        <Button title='Color Blind Mode' onPress={() => setTheme(false)}/>
        <View style={styles.space}></View>
        <Button title='Dark Mode' onPress={() => setTheme(true)}/>
        <View style={styles.space}></View>
        <Button title='Clear History' onPress={() => setTheme(false)}/>
        <View style={styles.space}></View>
        <Button title='See Stats' onPress={() => {
          navigation.navigate('Settings', {screen: 'StatsScreen'});
        }}/></Col>
          <Col size={1}></Col></Row>
          <Row></Row>
        </Grid>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignSelf:'center',
      height: (height),
      width: (width),
      top: 30,
    },
    safe: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'space-evenly',
      alignItems: "center",
      paddingVertical: 20,
      paddingTop: StatusBar.currentHeight,
    },
    space: {
      width: 20,
      height: 20,
    },
    firstrow: {
      right: 27,
      width: 240,
      top: 300
    },
  });
  