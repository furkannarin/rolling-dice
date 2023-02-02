import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen');

const Style = StyleSheet.create({
    diceContainer: {
        width: width * 0.25,
        height: width * 0.25,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 15
    },
    singleDotContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    singleDot: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    dotsContainer: {
        width: width * 0.25,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    mulDotContainer: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    multipleDot: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'black',
        flexDirection: 'row'
    },
    inputStyle: {
        width: width * 0.8,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
    rollTitle: {
        marginVertical: 10,
        color: 'black',
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 10
    },
    historyContainer: {
        width: width * 0.9,
        height: height * 0.25,
        marginHorizontal: 6,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 5
    },
    rollDataContainer: {
        alignSelf: 'center',
        width: width,
        height: height * 0.4
    }
})

export default Style;