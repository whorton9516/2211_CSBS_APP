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
        fontSize: 25,
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
    backButtonImage: {
        width: 100,
        height: 50,
        marginLeft: 12,
    },
    dropZone: {
        alignSelf:'center',
        height: 125,
        width: (width - 50),
        backgroundColor: 'white'
    },
    answerBox: {
        alignSelf: 'center',
        width: (width - 75),
        height: 100,
        backgroundColor: 'white'
    },
    text: {
        textAlign: "center",
        color: "black",
        fontSize: 30,
        fontFamily: 'MaryKate',
        fontWeight: "bold",
        alignContent: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        height: 50,
    },
    buttons: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 50,
    },
    viewHeader: {
        marginTop: 50,
    },
    overlayBox: {
        height: (height - 500),
        width: (width - 100),
        alignContent: 'center',
    },
    overlayText: {
        alignSelf:'center',
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        alignContent: 'center',
        backgroundColor: 'white',
    },
})