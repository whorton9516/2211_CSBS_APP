import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Button } from "react-native";
import CustomButton from "../components/CustomButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import Colors from "../constants/Colors";
import Expo from 'expo'

export default function SettingsScreen() {

  const [colorTheme, setColorTheme] = useState(0);
  const [colorBlindMode, setColorBlindMode] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

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
        <Grid>
          <Col size={1}></Col>
        <Col size={3}>
        <View style={styles.space} />
        <CustomButton
          title="Color Blind Mode"
          btop={styles.firstrow.top}
          bright={styles.firstrow.right}
          bwidth={styles.firstrow.width}
          style={styles.firstrow}
          onPress = {colorBlindMode => setColorBlindMode(1)}
        ></CustomButton>
                <View style={styles.space} />
                <CustomButton
          title="Dark Mode"
          btop={styles.firstrow.top}
          bright={styles.firstrow.right}
          bwidth={styles.firstrow.width}
          style={styles.firstrow}
        ></CustomButton>
                <View style={styles.space} />
                <CustomButton
          title="Show History"
          btop={styles.firstrow.top}
          bright={styles.firstrow.right}
          bwidth={styles.firstrow.width}
          style={styles.firstrow}
        ></CustomButton>
                <View style={styles.space} />
                <CustomButton
          title="Save History"
          btop={styles.firstrow.top}
          bright={styles.firstrow.right}
          bwidth={styles.firstrow.width}
          style={styles.firstrow}
        ></CustomButton>
                <View style={styles.space} />
                <CustomButton
          title="Clear History"
          btop={styles.firstrow.top}
          bright={styles.firstrow.right}
          bwidth={styles.firstrow.width}
          style={styles.firstrow}
        ></CustomButton></Col>
          <Col size={1}></Col>
        </Grid>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      //flexWrap: 'wrap', Don't use unless you are an idiot :)
      justifyContent: 'space-between',
      borderWidth: 0,
      borderColor: "rgba(246,239,239,1)",
      jusifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
      marginTop: 10,
      padding: 10
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
  