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
import ScrollingWheel from '../components/ScrollingWheel';

const QuizEntry = ({navigation}) => {


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
                                    console.log("Division added");
                                }}>
                                <Image
                                    source={require('../assets/images/division.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>                       
                        </HStack>
                    </Flex>
                    <Text style={[styles.text, {marginTop: 25, marginBottom: 30}]}>
                        Select the number of questions you{'\n'}would like to be asked:
                    </Text>
                    <ScrollingWheel />
                </View>
        </View>
    );
}

export default QuizEntry;