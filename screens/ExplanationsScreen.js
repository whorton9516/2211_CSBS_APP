import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import ExplanationComponent from "../components/ExplanationComponent";
import GetCalcData from '../hooks/GetCalcData';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const {width, height} = Dimensions.get('window');

const ExplanationScreen = () => {

  const [num1, setNum1] = useState(GetCalcData.equation[0]);
  const [num2, setNum2] = useState(GetCalcData.equation[2]);
  const [sym, setSym] = useState(GetCalcData.equation[1]);
  const [ans, setAns] = useState(GetCalcData.answer);
  const [rem, setRem] = useState(GetCalcData.remainder);
  const [boiler, setBoiler] = useState(GetCalcData.boilerplate);

  const loadData = () => {
    setNum1(GetCalcData.equation[0]);
    setNum2(GetCalcData.equation[2]);
    setSym(GetCalcData.equation[1]);
    setAns(GetCalcData.answer);
    setRem(GetCalcData.remainder);
    setBoiler(GetCalcData.boilerplate);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );
  const getColor = () => {
    switch(Math.floor(Math.random() * 7)){
        case 0:
          if(color1 == 'red') {
            console.log('oops');
            return getColor();
          }
          else {
            return 'red';
          }
        case 1:
          if(color1 == 'yellow') {
            console.log('oops');
            return getColor();
          }
          else {
            return 'yellow';
          }
        case 2:
          if(color1 == 'green') {
            console.log('oops');
            return getColor();
          }
          else {
            return 'green';
          }
        case 3:
          if(color1 == 'orange') {
            console.log('oops');
            return getColor();
          }
          else {
            return 'orange';
          }
        case 4:
          if(color1 == 'light blue') {
            console.log('oops');
            return getColor();
          }
          else {
            return 'light blue';
          }
          case 5:
            if(color1 == 'fuchsia') {
              console.log('oops');
              return getColor();
            }
            else {
              return 'fuchsia';
            }
            case 6:
              if(color1 == 'deeppink') {
                console.log('oops');
                return getColor();
              }
              else {
                return 'deeppink';
              }
      }
  }
  const [color1, setColor1] = useState(getColor());
  const [color2, setColor2] = useState(getColor());
  var views;
  if(sym === '+' || sym === '-') {
    views = 
      <View style={styles.explanationbox}>
        <Row>
        <Col><ExplanationComponent num1={num1} color1={color1}></ExplanationComponent></Col>
        <Col><Animated.Text style={styles.symbol}>{sym}</Animated.Text></Col>
        <Col><ExplanationComponent num1={num2} color1={color2}></ExplanationComponent></Col>
        </Row>
        <Row><Col></Col><Col><Animated.Text style={styles.symbol}>↓</Animated.Text></Col><Col></Col></Row>
        <Row><Col></Col><Col><ExplanationComponent num1={ans} color1={color2} num2={num1} color2={color1}></ExplanationComponent></Col><Col></Col></Row>
        <Row></Row>
      </View>
  }
  return (
    <View>
        {/*<Button title='Close' onPress={() => navigation.navigate('Calculator')}/>*/}
        <View style={styles.container}>
        <Text>{boiler}</Text>
        <View style={styles.space}></View>
            <Text style={styles.text}>
                {num1} {sym} {num2} = {ans}
            </Text>
        <Text>{rem}</Text>
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