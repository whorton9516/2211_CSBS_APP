import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, Button } from 'react-native';
import styles from '../constants/styles';
import { Col, Row } from "react-native-easy-grid";
import ExplanationComponent from "../components/ExplanationComponent";
import GetCalcData from '../hooks/GetCalcData';
import { useFocusEffect } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const TestingScreen = ({navigation}) => {

  const [num1, setNum1] = useState(GetCalcData.equation[0]);
  const [num2, setNum2] = useState(GetCalcData.equation[2]);
  const [sym, setSym] = useState(GetCalcData.equation[1]);
  const [ans, setAns] = useState(GetCalcData.answer);
  const [rem, setRem] = useState(GetCalcData.remainder);

  const loadData = () => {
    setNum1(GetCalcData.equation[0]);
    setNum2(GetCalcData.equation[2]);
    setSym(GetCalcData.equation[1]);
    setAns(GetCalcData.answer);
    setRem(GetCalcData.remainder);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );


  return (
    <View>
      <Button title='Back' onPress={() => navigation.navigate('Calculator')}/>
      <View style={styles.container}>
        <Text style={styles.explanationsText}>
            {num1} {sym} {num2} = {ans}
        </Text>
        <Text style={styles.explanationsTextMinor}>
        {(rem > 0) ? (<Text style={styles.text}>With a remainder of {rem}</Text>) :
                (<Text></Text>)}
        </Text>
      </View>
      
    </View>
  );
}

export default TestingScreen;