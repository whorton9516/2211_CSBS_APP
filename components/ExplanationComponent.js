import React, { useEffect, useState } from 'react';
import { StyleSheet, 
         Animated,
         Dimensions,
         View} from "react-native";

const {width, height} = Dimensions.get('window');

const ExplanationComponent = ({num1,num2,color1,color2,}) => {
  var array = [];
	for(let i = 0; i < num1; i++){
    if(i < num2){
		  array.push(
        <View key = {i}>
          <View backgroundColor={color2} style={styles.cube} />				
        </View>
		  )
    }
    else {
      array.push(
        <View key = {i}>
            <View backgroundColor={color1} style={styles.cube} />
        </View>
      )
    }
	}
  return (

    <Animated.View style={styles.container}>
      <View style={styles.cubecontainer}>
        {
          array
        }
      </View>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf:'auto',
        height: (height - 690),
        width: (width - 300),
        top: 10,
        left: 5,
        alignContent:'center',
        backgroundColor: 'lightgray',
      },
      cubecontainer: {
        flexWrap: 'wrap',
        padding: 12,
        flexDirection: 'row',
        alignSelf:'auto',
        alignItems: 'baseline',
        alignContent:'flex-start',
      },
      cube: {
        flexWrap: 'wrap',
        padding: 4,
        flexDirection: 'row',
        alignSelf:'auto',
        alignContent:'center',
        borderWidth: 1,
        borderColor: "#000000",
      },
});

export default ExplanationComponent;