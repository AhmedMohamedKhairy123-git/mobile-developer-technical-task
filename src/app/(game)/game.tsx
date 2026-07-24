import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateBestScore } from '../../services/database';

export default function GameScreen() {
    const [targetNumber, setTargetNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState('Guess a number between 1 and 43');
    const router = useRouter();

    // Initialize game
    useEffect(() => {
        generateNewNumber();
    }, []);

    const generateNewNumber = () => {
        setTargetNumber(Math.floor(Math.random() * 43) + 1);
        setAttempts(0);
        setGuess('');
        setMessage('Guess a number between 1 and 43');
    };

    const handleGuess = () => {
        const numGuess = parseInt(guess);
        if (isNaN(numGuess) || numGuess < 1 || numGuess > 43) {
            Alert.alert("Invalid input", "Please enter a number between 1 and 43");
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (numGuess === targetNumber) {
            const isNewRecord = updateBestScore(newAttempts);
            Alert.alert(
                "Correct!",
                `You got it in ${newAttempts} guesses! ${isNewRecord ? "NEW RECORD!" : ""}`,
                [{ text: "Play Again", onPress: generateNewNumber }]
            );
        } else if (numGuess < targetNumber) {
            setMessage("Higher! ↑");
        } else {
            setMessage("Lower! ↓");
        }
        setGuess('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/(auth)/login')}>
                <Text style={{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Guess The Number</Text>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.attempts}>Attempts: {attempts}</Text>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={guess}
                onChangeText={setGuess}
                placeholder="Enter number"
            />

            <TouchableOpacity style={styles.button} onPress={handleGuess}>
                <Text style={styles.buttonText}>Submit Guess</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    logoutBtn: { position: 'absolute', top: 50, right: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    message: { fontSize: 18, color: '#666', marginBottom: 20 },
    attempts: { fontSize: 16, marginBottom: 10 },
    input: { borderBottomWidth: 2, borderColor: '#007AFF', width: '50%', fontSize: 24, textAlign: 'center', marginBottom: 30 },
    button: { backgroundColor: '#007AFF', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 25 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});