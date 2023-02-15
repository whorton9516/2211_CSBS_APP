import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default styles = StyleSheet.create({
    calculatorButton:{
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    calculatorButtonText: {
        textAlign: "center",
        fontSize: 50,
        fontFamily: 'MaryKate',
        alignContent: 'center',
    },
    explanationsText: {
        textAlign: "center",
        fontSize: 50,
        fontFamily: 'Sassoon',
        alignContent: 'center',
    },
    explanationsTextMinor: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'KGNeatlyPrinted',
        alignContent: 'center',
    },
    container: {
        alignSelf:'center',
        height: 125,
        width: (width - 50),
        backgroundColor: 'white',
      },
})