// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import BookingList from '../../../components/BookingList';

const quotes = [
    "It's not that I'm so smart, it's just that I stay with problems longer. - Albert Einstein",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. - Thomas Edison",
    "Book a consultation slot today! - Creators of NUSmentor",
];

function HomeScreen() {
    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        getRandomQuote();
    }, []);

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome to NUSmentor!</Text>
                <View style={styles.motivationalQuoteBox}>
                    <Text style={styles.motivationalQuote}>
                        {randomQuote}
                    </Text>
                </View>
            </View>
            <Text style={styles.upcomingText}>Upcoming Bookings:</Text>
            <View style={styles.bookingListContainer}>
                <BookingList booleanCondition={(slotTime) => slotTime > new Date()} />
            </View>
        </View>
    );
}

export default HomeScreen;