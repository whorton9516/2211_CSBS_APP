import React, { useEffect, useState } from 'react';
import {View, Text, Dimensions, Animated, } from 'react-native';
import { Col, Row, } from "react-native-easy-grid";
import ExplanationComponent from "../components/ExplanationComponent";
import GetCalcData from '../hooks/GetCalcData';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../constants/styles';

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({navigation}) => {

  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [sym, setSym] = useState();
  const [ans, setAns] = useState();
  const [rem, setRem] = useState();
  const [boiler, setBoiler] = useState();
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  let views;
  const colors = ['red', 'yellow', 'green', 'orange', 'light blue', 'fuchsia', 'deeppink'];

  const loadData = () => {
    setNum1(GetCalcData.equation[0]);
    setNum2(GetCalcData.equation[2]);
    setSym(GetCalcData.equation[1]);
    setAns(GetCalcData.answer);
    setRem(GetCalcData.remainder);
    setColor1(getColor());
    setColor2(getColor());
    setBoiler(GetCalcData.boilerplate);
  };

  const getColor = () => {
    const availableColors = colors.filter(color => color !== color1);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
  }

  useEffect(() => {
    loadData();
  }, []);

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

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  if(sym === '+' || sym === '-') {
    views = 
      <View style={styles.explanationbox}>
        <Row>
          <Col>
            <ExplanationComponent num1={num1} color1={color1} />
          </Col>
          <Col>
            <Animated.Text style={styles.symbol}>
              {sym}
            </Animated.Text>
          </Col>
          <Col>
            <ExplanationComponent num1={num2} color1={color2} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Animated.Text style={styles.symbol}>↓</Animated.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExplanationComponent num1={ans} color1={color2} num2={num1} color2={color1} />
          </Col>
        </Row>

      </View>
  }
  return (
    <View>
      <View style={[styles.container, {height: 250}]}>
        <Text style={[styles.text, {fontSize: 25}]}>
          We know that {'\n'}
            {num1} {sym} {num2} = {ans}
            {'\n'} but how do we know that? {'\n\n'}
            {boiler}
        </Text>
        <Text>{rem}</Text>
      </View>
      <View style={styles.space}>{views}</View>
    </View>
  );
}

export default ExplanationScreen;