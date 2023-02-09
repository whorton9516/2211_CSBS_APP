import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Button, Animated, Image} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import ExplanationComponent from "../components/ExplanationComponent";

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({ route }) => {
let num1 = '7'
let num2 = '4'
let ans = '11'
let sym = '+'
var views;
switch(sym) {
    case "+":
        views = <View style={styles.explanationbox}>
        <Row>
        <Col><ExplanationComponent num1={num1} color1={"red"}></ExplanationComponent></Col>
        <Col><Animated.Text style={styles.symbol}>{sym}</Animated.Text></Col>
        <Col><ExplanationComponent num1={num2} color1={"green"}></ExplanationComponent></Col>
        </Row>
         <Row><Col></Col><Col><Animated.Text style={styles.symbol}>↓</Animated.Text></Col><Col></Col></Row>
        <Row><Col></Col><Col><ExplanationComponent num1={ans} color1={"green"} num2={num1} color2={"red"}></ExplanationComponent></Col><Col></Col></Row>
        <Row></Row>
    </View>
    break;
    case "-":
        views = <View style={styles.explanationbox}>
        <Row>
        <Col><ExplanationComponent num1={num1} color1={"red"}></ExplanationComponent></Col>
        <Col><Animated.Text style={styles.symbol}>{sym}</Animated.Text></Col>
        <Col><ExplanationComponent num1={num2} color1={"green"}></ExplanationComponent></Col>
        </Row>
         <Row><Col></Col><Col><Animated.Text style={styles.symbol}>↓</Animated.Text></Col><Col></Col></Row>
        <Row><Col></Col><Col><ExplanationComponent num1={ans} color1={"green"} num2={num1} color2={"red"}></ExplanationComponent></Col><Col></Col></Row>
        <Row></Row>
    </View>
    break;
}
    return (
        <View>
            {/*<Button title='Close' onPress={() => navigation.navigate('Calculator')}/>*/}
            <View style={styles.container}>
                <Text style={styles.text}>
                    7+4
                </Text>
            <Text>Remainder goes here</Text>
            </View>
            <View style={styles.space}></View>
            {
              views
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        height: 125,
        width: (width - 50),
        backgroundColor: 'white',
      },
      space: {
        alignSelf:'center',
        height: 25,
        width: (width - 50),
      },
      explanationbox: {
        flexDirection: 'column',
        alignSelf:'center',
        height: (height - 300),
        width: (width - 50),
        backgroundColor: 'white',
      },
      mathbox: {
        alignSelf:'auto',
        height: (height - 690),
        width: (width - 300),
        top: 10,
        left: 5,
        backgroundColor: 'lightgray',
      },
      symbol: {
        alignSelf:'center',
        top: 30,
        color: "black",
        fontSize: 35,
        fontWeight: "bold",
        alignContent: 'center',
        backgroundColor: 'white',
      },
    text: {
        textAlign: "center",
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        alignContent: 'center',
        },
        image: {
            width: 100,
            height: 50,
            borderRadius: 50
          },
})

export default ExplanationScreen;