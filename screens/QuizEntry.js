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

const QuizEntry = ({navigation}) => {


    return (
        <View>
            {/* Header */}
            <View style={styles.viewHeader}>
                <Text style={styles.text}>Quizzes</Text>
            </View>

            <Flex>
                <View style={{marginTop: 75}}>
                    <Text style={styles.text}>
                        Ready for a quiz? {'\n\n'}
                        Select your options below
                    </Text>
                    <Text style={[styles.text, {marginTop: 50}]}>
                        Select the type of questions you{'\n'}want to be asked:
                    </Text>
                    <HStack style={{marginTop: 20}}>
                        <TouchableOpacity onPress={() => {
                            
                        }}/>
                        <TouchableOpacity
                        
                        />
                    </HStack>
                </View>

                
            </Flex>
        </View>
    );
}

export default QuizEntry;