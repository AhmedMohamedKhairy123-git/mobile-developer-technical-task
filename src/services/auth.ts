import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'user_credentials';

export const registerUser = async (username: string, password: string) => {
    // Store the username and password as a JSON string in encrypted storage
    const credentials = JSON.stringify({ username, password });
    await SecureStore.setItemAsync(USER_KEY, credentials);
    return true;
};

export const loginUser = async (username: string, password: string) => {
    const stored = await SecureStore.getItemAsync(USER_KEY);
    if (!stored) return { success: false, message: "No user found" };

    const { username: sUsername, password: sPassword } = JSON.parse(stored);

    if (username === sUsername && password === sPassword) {
        return { success: true };
    } else {
        return { success: false, message: "Invalid credentials" };
    }
};

export const logoutUser = async () => {
    // For this task, we will handle logout by clearing the app state later.
    // The credentials remain encrypted in storage for next time.
};