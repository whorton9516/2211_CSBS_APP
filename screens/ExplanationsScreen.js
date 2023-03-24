import React, { useEffect, useState } from 'react';
import { View, 
         Text, 
         Dimensions, 
         Animated,
         ScrollView,
        } from 'react-native';
import { Col, Row, } from "react-native-easy-grid";
import ExplanationComponent from "../components/ExplanationComponent";
import GetCalcData from '../hooks/GetCalcData';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../constants/styles';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({navigation}) => {
  let updatedBoilerText;
  const colors = ['red', 'yellow', 'green', 'orange', 'light blue', 'fuchsia', 
                  'deep pink', 'teal', 'navy', 'goldenrod', 'crimson', 'indigo',];
  const [alt1, setAlt1] = useState();
  const [alt2, setAlt2] = useState();
  const [sym, setSym] = useState();
  const [altAns, setAltAns] = useState();
  const [altRem, setAltRem] = useState();
  const [boiler, setBoiler] = useState();
  const [color1, setColor1] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [color2, setColor2] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [ans, setAns] = useState();
  const [rem, setRem] = useState();
  let views = null;

  const loadData = () => {
    setNum1(GetCalcData.equation[0]);
    setNum2(GetCalcData.equation[2]);
    setAns(GetCalcData.answer);
    setRem(GetCalcData.remainder);
    setSym(GetCalcData.equation[1]);
    setColor1(getColor());
    setColor2(getColor());
    setBoiler(GetCalcData.boilerplate);

    switch (GetCalcData.equation[1]) {
      case '+':
        if (GetCalcData.equation[0] > 25 || GetCalcData.equation[2] > 25) {
          if (GetCalcData.equation[0] > 25 && GetCalcData.equation[2] > 25){
            setAlt1(Math.floor(Math.random() * 24) + 2);
            setAlt2(Math.floor(Math.random() * 24) + 2);
            setAltAns(alt1 + alt2);
          } else if(GetCalcData.equation[0] > 25 && GetCalcData.equation[2] <= 25) {
            setAlt1(Math.floor(Math.random() * 25) + 1);
            setAlt2(GetCalcData.equation[2]);
          } else if(GetCalcData.equation[0] <= 25 && GetCalcData.equation[2] > 25) {
            setAlt1(GetCalcData.equation[0]);
            setAlt2(Math.floor(Math.random() * 25) + 1);
          }
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
          setAltRem(GetCalcData.remainder);
        }
        break;
      case '-':
        if (GetCalcData.equation[0] > 25 || GetCalcData.equation[2] > 25) {
          if (GetCalcData.equation[0] > 25 && GetCalcData.equation[2] > 25){
            setAlt1(Math.floor(Math.random() * 24) + 2);
            setAlt2(Math.floor(Math.random() * (num1 - 1)) + 2);
            setAltAns(alt1 - alt2);
          }
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
          setAltRem(GetCalcData.remainder);
        }
        break;
      case '*':
        if (GetCalcData.answer > 50) {
          setAlt1(Math.floor(Math.random() * 7) + 2);
          setAlt2(Math.floor(Math.random() * 7) + 2);
          setAltAns(alt1 * alt2);
          setAltRem(GetCalcData.remainder);
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
          setAltRem(GetCalcData.remainder);
        }
        break;
      case '/':
        if (GetCalcData.equation[0] > 20 || GetCalcData.equation[2] > 20){
          setAlt1(Math.floor(Math.random() * 19) + 2);
          setAlt2(Math.floor(Math.random() * (num1 - 1)) + 2);
          setAltRem(parseInt(GetCalcData.equation[0]) % parseInt(GetCalcData.equation[2]));
          setAltAns(Math.floor((GetCalcData.equation[0]) / parseInt(GetCalcData.equation[2])));
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
          setAltRem(GetCalcData.remainder);
        }
        break;
    }
  };


  const getColor = () => {
    const availableColors = colors.filter(color => color !== color1);
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
  }

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

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

  switch (sym) {
    case '+':
      views = (
        <View>
          <View style={{width: (width - 50), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
                <ExplanationComponent circleSize={width} numCircles={alt1} color={color1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-end'}}>
                <ExplanationComponent circleSize={width} numCircles={alt2} color={color2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent circleSize={width * 1.5} numCircles={altAns} color={color1} altColor={color2} altNum={alt2} />
            </View>
          </View>
        </View>
      );
      break;
    case '-':
      views = (
        <View>
          <View style={{width: (width - 50), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
                <ExplanationComponent circleSize={width} numCircles={alt1} color={color1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-end'}}>
                <ExplanationComponent circleSize={width} numCircles={alt2} color={color2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent circleSize={width * .8} numCircles={altAns} color={color1} />
            </View>
          </View>
        </View>
      );
      break;
    case '*':
        const mulElements = [];
        for (let i = 0; i < alt1; i++) {
          mulElements.push((
            <View style={{alignItems: 'center'}} padding={10}>
              <ExplanationComponent circleSize={width} numCircles={alt2} color={getColor()} />
            </View>
          ));
        }
        views = (
          <View>
            <View style={{width: (width - 50), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: (width-50)/2, alignItems: 'center', padding: 10}}>
                  {mulElements}  
                </View>
              </View>
              <View style={{alignSelf: 'center', padding: 10}}>
                <ExplanationComponent circleSize={width * 2} numCircles={altAns} color={getColor()} />
              </View>
            </View>
          </View>
        );
      break;
    case '/':
      const divElements = [];
        for (let i = 0; i < altAns; i++) {
          divElements.push((
            <View style={{alignItems: 'center'}} padding={10}>
              <ExplanationComponent circleSize={width} numCircles={alt2} color={color1} />
            </View>
          ));
        }
        views = (
          <View>
            <View style={{width: (width - 50), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
              <View style={{alignSelf: 'center', padding: 10}}>
                <ExplanationComponent circleSize={width * 2} numCircles={alt1} color={getColor()} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {divElements}
                {(rem > 0) ? (
                  <View style={{alignItems: 'center'}} padding={10}>
                    <ExplanationComponent circleSize={width} numCircles={rem} color={getColor()} />
                  </View>
                  ) : (
                    <View />
                  )}
              </View>
            </View>
          </View>
        );
      break;
  }


  return (
    <ScrollView>
      <View>
        <View style={{backgroundColor: 'white', borderRadius: 30, flexGrow: 1, flexShrink: 1, alignSelf: 'center', width: width-50}}>
          <Text style={[styles.text, {fontSize: 25}]}>
            We know that {'\n'}
              {num1} {sym} {num2} = {ans}
            </Text>
            {(rem) ? (
              <Text style={[styles.text, {fontSize: 25}]}>
                With a remainder of {rem}
              </Text>
            ) : (
              <Text />
            )}
            <Text style={[styles.text, {fontSize: 25}]}>
              {'\n'} but how do we know that? {'\n\n'}
              {boiler}
          </Text>
        </View>
        <View style={styles.space}>{views}</View>
      </View>
    </ScrollView>
  );
}

export default ExplanationScreen;