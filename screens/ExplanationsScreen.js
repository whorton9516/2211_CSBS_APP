import React, { useEffect, useState } from 'react';
import { View, 
         Text, 
         Dimensions, 
         Animated,
         ScrollView,
        } from 'react-native';
import ExplanationComponent from "../components/ExplanationComponent";
import GetCalcData from '../hooks/GetCalcData';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../constants/styles';

const { width, } = Dimensions.get('window');

const ExplanationScreen = ({navigation}) => {
  const colors = ['tomato', 'gold', 'limegreen', 'mediumorchid', 'powderblue', 'sienna',
                  'darkcyan', 'darkslategrey', 'salmon', 'darkolivegreen'];
  const usedColors = [];
  const [alt1, setAlt1] = useState();
  const [alt2, setAlt2] = useState();
  const [sym, setSym] = useState();
  const [altAns, setAltAns] = useState();
  const [altRem, setAltRem] = useState();
  const [boiler, setBoiler] = useState();
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [ans, setAns] = useState();
  const [rem, setRem] = useState();
  const [altEquation, setAltEquation] = useState(false);
  
  let views = null;

  const loadData = () => {
    setNum1(GetCalcData.equation[0]);
    setNum2(GetCalcData.equation[2]);
    setAns(GetCalcData.answer);
    setRem(GetCalcData.remainder);
    setSym(GetCalcData.equation[1]);
    setBoiler(GetCalcData.boilerplate);

    let temp1;
    let temp2;

    switch (GetCalcData.equation[1]) {
      case '+':
        if (GetCalcData.equation[0] > 15 || GetCalcData.equation[2] > 15) {
          setAltEquation(true);
          temp1 = Math.floor(Math.random() * 13) + 3;
          temp2 = Math.floor(Math.random() * 13) + 3;
          setAlt1(temp1);
          setAlt2(temp2);
          setAltAns(temp1 + temp2);
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
        }
        break;
      case '-':
        if (GetCalcData.equation[0] > 15 || GetCalcData.equation[2] > 15) {
          setAltEquation(true);
          temp1 = Math.floor(Math.random() * 12) + 4;
          temp2 = Math.floor(Math.random() * (temp1 - 1)) + 1;
          setAlt1(temp1);
          setAlt2(temp2);
          setAltAns(temp1 - temp2);
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
        }
        break;
      case '*':
        if (GetCalcData.equation[0] > 6 || GetCalcData.equation[2] > 6) {
          setAltEquation(true);
          temp1 = Math.floor(Math.random() * 5) + 2;
          temp2 = Math.floor(Math.random() * 5) + 2;
          setAlt1(temp1);
          setAlt2(temp2);
          setAltAns(temp1 * temp2);
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
        }
        break;
      case '/':
        if (GetCalcData.equation[0] > 20 || GetCalcData.equation[2] > 20){
          setAltEquation(true);
          temp1 = Math.floor(Math.random() * 16) + 5;
          temp2 = Math.floor(Math.random() * (temp1 - 1)) + 2;
          setAlt1(temp1);
          setAlt2(temp2);
          setAltRem(parseInt(GetCalcData.equation[0]) % parseInt(GetCalcData.equation[2]));
          setAltAns(Math.floor(temp1 / temp2));
        } else {
          setAlt1(GetCalcData.equation[0]);
          setAlt2(GetCalcData.equation[2]);
          setAltAns(GetCalcData.answer);
          setAltRem(GetCalcData.remainder);
        }
        break;
    }
  };

  const getFinalDescription = () => {
    let finalString = '';
    switch(sym) {
      case '+':
        finalString = "if you have " + alt1 + " items and then add " + alt2 +
        " more items, you end up with " + altAns + " items total." 
        break;
      case '-':
        finalString = "subtracting " + alt2 + " items from a group of " + 
        alt1 + " items leaves us with " + altAns + " items left over.";
        break;
      case '*':
        finalString = alt1 + " multiplied by " + alt2 + " means that we have " +
        alt2 + " groups of " + alt1 + " items each. The answer to any " +
        "multiplication problem is the total of all of the items in the groups. "+
        "In this case, we have " + altAns + " total items.";
        break;
      case '/':
        finalString = alt1 + " divided by " + alt2 + " means that we are dividing a group of " +
        alt1 + " items into groups of " + alt2 + " items each. In this case, " + alt1 + " will make " +
        altAns + " groups of " + alt2 + " items";
        if (altRem > 0) {
          finalString += " with " + altRem + " items left over";
        }
        finalString +=".";
        break;
    }

    return finalString
  }


  const getColors = () => {
    const currentColors = [];
    const availableColors = colors.filter(color => !usedColors.includes(color));
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    currentColors.push(availableColors[randomIndex]);
    usedColors.push(availableColors[randomIndex]);
    return currentColors;
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
          <View style={{width: (width - 20), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: (width-50)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
                <ExplanationComponent circleSize={width + (width/5)} numCircles={alt1} colors={getColors()} interval={alt1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-20)/2, flex: 1, alignItems: 'flex-end', padding: 10}}>
                <ExplanationComponent circleSize={width + (width/5)} numCircles={alt2} colors={getColors()} interval={alt2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent circleSize={width * 2} numCircles={altAns} colors={usedColors} interval={alt1} />
            </View>
          </View>
        </View>
      );
      break;
    case '-':
      views = (
        <View>
          <View style={{width: (width - 20), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{width: (width-20)/2, flex: 1, alignItems: 'flex-start', padding: 10}}>
                <ExplanationComponent circleSize={width + (width/5)} numCircles={alt1} colors={getColors()} interval={alt1} />
              </View>
              <Text style={[styles.text, {fontSize: 50}]}>{sym}</Text>
              <View style={{width: (width-20)/2, flex: 1, alignItems: 'flex-end', padding: 10}}>
                <ExplanationComponent circleSize={width + (width/5)} numCircles={alt2} colors={getColors()} interval={alt2} />
              </View>
            </View>
            <View style={{alignSelf: 'center'}} padding={20}>
              <Text style={[styles.text, {fontSize: 50}]}>⇊</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 10}}>
              <ExplanationComponent circleSize={width * .8} numCircles={altAns} colors={usedColors} interval={alt1} />
            </View>
          </View>
        </View>
      );
      break;
    case '*':
        const mulElements = [];
        for (let i = 0; i < alt2; i++) {
          let midSymbol = '+';
          if (i == alt2-1) midSymbol = '=';
          mulElements.push((
            <View key={i} style={{alignItems: 'center'}}>
              <ExplanationComponent circleSize={width + (width/5)} numCircles={alt1} colors={getColors()} interval={alt1} />
              <Text style={[styles.text, {padding: 10}]}>{midSymbol}</Text>
            </View>
          ));
        }
        views = (
          <View>
            <View style={{width: (width - 20), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: (width-20)/2, alignItems: 'center', padding: 10}}>
                  {mulElements}  
                </View>
              </View>
              <View style={{alignSelf: 'center', padding: 10}}>
                <ExplanationComponent circleSize={width * 2} numCircles={altAns} colors={usedColors} interval={alt1} />
              </View>
            </View>
          </View>
        );
      break;
    case '/':
      const divElements = [];
        for (let i = 0; i < altAns; i++) {
          divElements.push((
            <View key={i} style={{alignItems: 'center'}} padding={10}>
              <ExplanationComponent circleSize={width + (width/5)} numCircles={alt2} colors={getColors()} />
            </View>
          ));
        }
        views = (
          <View>
            <View style={{width: (width - 20), alignSelf: 'center', backgroundColor: 'white', borderRadius: 30, marginTop: 10}}>
              <View style={{alignSelf: 'center', padding: 10}}>
                <ExplanationComponent circleSize={width * 2} numCircles={alt1} colors={usedColors} interval={alt2} />
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[styles.text, {fontSize: 20}]}>
                {alt1} will make {altAns} groups of {alt2}
              </Text>
                {divElements}
                {(altRem > 0) ? (
                  <View style={{alignItems: 'center', marginTop: 40}} padding={10}>
                    <Text style={[styles.text, {fontSize: 20}]}>
                      with {altRem} remaining:
                    </Text>
                    <ExplanationComponent circleSize={width} numCircles={rem} colors={getColors()} interval={rem} />
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
        <View style={{backgroundColor: 'white', borderRadius: 30, flexGrow: 1, flexShrink: 1,
                      alignSelf: 'center', width: width-20, marginTop: 10}}>
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
              but HOW do we know that? {'\n\n'}
              {boiler}
          </Text>
          {(altEquation) ? (<Text style={styles.text}>
            {alt1} {sym} {alt2} = {altAns}
          </Text>) : (<Text></Text>)}
        </View>
        <View style={styles.space}>{views}</View>
        <View style={{backgroundColor: 'white', borderRadius: 30, flexGrow: 1, flexShrink: 1, 
                      alignSelf: 'center', width: width-20, marginTop: 10, marginBottom: 100}}>
          <Text style={[styles.text, {margin: 10}]}>
            As you can see from the example above, {getFinalDescription()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ExplanationScreen;