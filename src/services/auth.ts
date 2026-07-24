import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'user_credentials';

export const registerUser = async (username: string, password: string) => {
    const credentials = JSON.stringify({ username, password });
    await SecureStore.setItemAsync(USER_KEY, credentials);
};

export const loginUser = async (username: string, password: string) => {
    const stored = await SecureStore.getItemAsync(USER_KEY);
    if (!stored) return false;

    const { username: sUsername, password: sPassword } = JSON.parse(stored);
    return username === sUsername && password === sPassword;
};

export const logoutUser = async () => {
    // Requirement says logout feature, we can just clear a session state later
    // but let's keep the credentials stored as per requirements
};