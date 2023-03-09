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
                                    setAddition(true);
                                    console.log("Addition added");
                                }}>
                                <Image
                                    source={require('../assets/images/addition.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{padding: 10}}
                                onPress={() => {
                                    setSubtraction(true);
                                    console.log("Subtraction added");
                                }}>
                                <Image
                                    source={require('../assets/images/subtraction.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>                       
                        </HStack>
                        <HStack style={{justifyContent: 'center'}}>
                            <TouchableOpacity 
                                style={{padding: 10}}
                                onPress={() => {
                                    setMultiplication(true);
                                    console.log("Multiplication added");
                                }}>
                                <Image
                                    source={require('../assets/images/multiplication.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{padding: 10}}
                                onPress={() => {
                                    setDivision(true);
                                    console.log("Division added");
                                }}>
                                <Image
                                    source={require('../assets/images/division.png')}
                                    style={styles.image}
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