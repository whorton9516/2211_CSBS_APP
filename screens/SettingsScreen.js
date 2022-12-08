import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Button } from "react-native";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { Col, Row, Grid } from "react-native-easy-grid";
import Colors from "../constants/Colors";

export default function SettingsScreen() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Grid>
          <Col size={1}></Col>
        <Col size={3}>
        <View style={styles.space} />
        <MaterialButtonViolet
          caption="Color Blind Mode"
          style={styles.firstrow}
        ></MaterialButtonViolet>
                <View style={styles.space} />
                <MaterialButtonViolet
          caption="Dark Mode"
          style={styles.firstrow}
        ></MaterialButtonViolet>
                <View style={styles.space} />
                <MaterialButtonViolet
          caption="Show History"
          style={styles.firstrow}
        ></MaterialButtonViolet>
                <View style={styles.space} />
                <MaterialButtonViolet
          caption="Save History"
          style={styles.firstrow}
        ></MaterialButtonViolet>
                <View style={styles.space} />
                <MaterialButtonViolet
          caption="Clear History"
          style={styles.firstrow}
        ></MaterialButtonViolet></Col>
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
      height: 36,
      width: 300,
      top: 300
    },
  });
  