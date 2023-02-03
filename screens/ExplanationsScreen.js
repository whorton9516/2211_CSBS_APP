import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';

const {width, height} = Dimensions.get('window');

const ExplanationScreen = ({ route }) => {


    return (
        <View>
            {/*<Button title='Close' onPress={() => navigation.navigate('Calculator')}/>*/}
            <View style={styles.container}>
                <Text style={styles.text}>
                    {route.params.eq} = {route.params.ans}
                </Text>
                {(remainder > 0) ? (<Text style={styles.text}>With a remainder of {route.params.rem}</Text>) :
                (<Text></Text>)}
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