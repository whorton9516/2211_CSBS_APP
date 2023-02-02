import React from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({navigation}) => {
    return (
        <View>
            <Button title='Close' onPress={() => navigation.navigate('Calculator')}/>
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is the Explanation Screen
                </Text>
            </View>
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
    text: {
        textAlign: "center",
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        alignContent: 'center',
        },
})

export default ExplanationScreen;