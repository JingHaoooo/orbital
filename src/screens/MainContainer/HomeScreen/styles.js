// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    welcomeContainer: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        paddingBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    motivationalQuoteBox: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
    },
    motivationalQuote: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    upcomingText: {
        fontSize: 24,
        textAlign: 'center',
        // fontWeight: 'bold',
        marginTop: 24,
    },
    bookingListContainer: {
        flex: 1,
        marginTop: 16,
    },
});