import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The starting point */}
      <Stack.Screen name="index" />

      {/* The Auth Screen */}
      <Stack.Screen name="(auth)/login" />

      {/* The Game Screen (Route name is 'game' because it is in a (folder)) */}
      <Stack.Screen name="(game)/game" />
    </Stack>
  );
}