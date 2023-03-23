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

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({navigation}) => {
  let updatedBoilerText;
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [sym, setSym] = useState();
  const [ans, setAns] = useState();
  const [rem, setRem] = useState();
  const [boiler, setBoiler] = useState();
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [alt1, setAlt1] = useState();
  const [alt2, setAlt2] = useState();
  const [altAns, setAltAns] = useState();
  const [altRem, setAltRem] = useState();
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
    setAlt1(GetCalcData.altEquation[0]);
    setAlt2(GetCalcData.altEquation[2]);
    setAltAns(GetCalcData.altAnswer);
    setAltRem(GetCalcData.altRemainder)
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
                <ExplanationComponent radius={width} numCircles={alt1} color={color1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-end'}}>
                <ExplanationComponent radius={width} numCircles={alt2} color={color2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent radius={width * 1.5} numCircles={altAns} color={color1} altColor={color2} altNum={alt2} />
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
                <ExplanationComponent radius={width} numCircles={alt1} color={color1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-end'}}>
                <ExplanationComponent radius={width} numCircles={alt2} color={color2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent radius={width * .8} numCircles={altAns} color={color1} />
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
              <ExplanationComponent radius={width} numCircles={alt2} color={getColor()} />
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
                <ExplanationComponent radius={width * 2} numCircles={altAns} color={getColor()} />
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
              <ExplanationComponent radius={width} numCircles={alt2} color={color1} />
            </View>
          ));
        }
        views = (
          <View>
            <View style={{width: (width - 50), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
              <View style={{alignSelf: 'center', padding: 10}}>
                <ExplanationComponent radius={width * 2} numCircles={alt1} color={getColor()} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {divElements}
                {(rem > 0) ? (
                  <View style={{alignItems: 'center'}} padding={10}>
                    <ExplanationComponent radius={width} numCircles={rem} color={getColor()} />
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