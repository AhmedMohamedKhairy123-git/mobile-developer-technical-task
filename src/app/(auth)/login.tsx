import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginUser, registerUser } from '../../services/auth';
import { getBestScore, initDatabase } from '../../services/database';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [bestScore, setBestScore] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        initDatabase();
        setBestScore(getBestScore());
    }, []);

    const handleAuth = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (isRegistering) {
            await registerUser(username, password);
            Alert.alert("Success", "Account created! You can now login.");
            setIsRegistering(false);
        } else {
            const result = await loginUser(username, password);
            if (result.success) {
                // NAVIGATION FIX: Using the absolute path to the game screen
                router.replace('/game');
            } else {
                Alert.alert("Error", "Invalid username or password");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegistering ? "Register" : "Login"}</Text>

            {!isRegistering && bestScore !== null && (
                <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>🏆 Your Best Score: {bestScore} guesses</Text>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegistering ? "Sign Up" : "Sign In"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchText}>
                    {isRegistering ? "Have an account?Login?" : "Don't have an account? Register"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    scoreBadge: { backgroundColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 20, alignItems: 'center' },
    scoreText: { fontWeight: 'bold' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    switchText: { marginTop: 20, textAlign: 'center', color: '#007AFF' }
});