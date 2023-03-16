import { Overlay } from 'react-native-elements';
import React, { useState } from "react";
import { 
  View,
  TouchableOpacity, 
  Dimensions, 
  Text,
  Image,
  Button
} from "react-native";
import { Flex, Spacer, HStack } from 'react-native-flex-layout';
import styles from '../constants/styles';
import CalculatorButton from '../components/CalculatorButton';
import Colors from '../constants/Colors';
import GetQuizData from '../hooks/GetQuizData';
import { sub } from 'react-native-reanimated';

const QuizEntry = ({navigation}) => {

    const [addition, setAddition] = useState(false);
    const [subtraction, setSubtraction] = useState(false);
    const [multiplication, setMultiplication] = useState(false);
    const [division, setDivision] = useState(false);
    const [addSelected, setAddSelected] = useState(false);
    const [subSelected, setSubSelected] = useState(false);
    const [mulSelected, setMulSelected] = useState(false);
    const [divSelected, setDivSelected] = useState(false);

    const setData = (addition, subtraction, multiplication, division) => {
        GetQuizData.addition = addition;
        GetQuizData.subtraction = subtraction;
        GetQuizData.multiplication = multiplication;
        GetQuizData.division = division;
      }

    return (
        <View>
            {/* Header */}
            <View style={styles.viewHeader}>
                <Text style={styles.text}>Quizzes</Text>
            </View>
                <View style={{marginTop: 75}}>
                    <Text style={styles.text}>
                        Ready for a quiz? {'\n\n'}
                        Select your options below
                    </Text>
                    <Text style={[styles.text, {marginTop: 50}]}>
                        Select the type of questions you{'\n'}want to be asked:
                    </Text>
                    <Flex>
                        <HStack style={{marginTop: 20, justifyContent: 'center'}}>
                            <TouchableOpacity 
                                style={{padding: 10}}
                                onPress={() => {
                                    setAddition(!addition);
                                    setAddSelected(!addSelected);
                                    if (!addSelected) console.log("addition added")
                                    else console.log("addition removed")
                                }}>
                                <Image
                                    source={require('../assets/images/addition.png')}
                                    style={[styles.image, {opacity: addSelected ? 1 : 0.5}]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{padding: 10}}                            
                                onPress={() => {
                                    setSubtraction(!subtraction);
                                    setSubSelected(!subSelected);
                                    if (!subSelected) console.log("subtraction added")
                                    else console.log("subtraction removed")
                                }}>
                                <Image
                                    source={require('../assets/images/subtraction.png')}
                                    style={[styles.image, {opacity: subSelected ? 1 : 0.5}]}
                                    
                                />
                            </TouchableOpacity>                       
                        </HStack>
                        <HStack style={{justifyContent: 'center'}}>
                            <TouchableOpacity 
                                style={{padding: 10}}
                                onPress={() => {
                                    setMultiplication(!multiplication);
                                    setMulSelected(!mulSelected);
                                    if (!mulSelected) console.log("multiplication added")
                                    else console.log("multiplication removed")
                                }}>
                                <Image
                                    source={require('../assets/images/multiplication.png')}
                                    style={[styles.image, {opacity: mulSelected ? 1 : 0.5}]}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{padding: 10}}
                                onPress={() => {
                                    setDivision(!division);
                                    setDivSelected(!divSelected);
                                    if (!divSelected) console.log("division added")
                                    else console.log("division removed")
                                }}>
                                <Image
                                    source={require('../assets/images/division.png')}
                                    style={[styles.image, {opacity: divSelected ? 1 : 0.5}]}
                                />
                            </TouchableOpacity>                       
                        </HStack>
                    </Flex>
                    <Text style={styles.text}>Press the button to begin!</Text>
                    <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignItems: 'center',}}
                            onPress={() => {
                                setData(addition, subtraction, multiplication, division);
                                navigation.navigate('Quizzes', {screen: 'QuizScreen'});
                            }}>
                        <Image
                            source={require('../assets/images/start.png')}
                            style={{
                                height: 50,
                                width: 150,
                                borderRadius: 10,
                                marginTop: 50
                            }}
                        />
                    </TouchableOpacity>
                </View>
        </View>
    );
}

export default QuizEntry;