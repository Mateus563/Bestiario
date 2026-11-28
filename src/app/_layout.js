import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Layout() {
  return (
    <SafeAreaProvider>

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#B9F3E4" },
          headerTintColor: "#080402",
        }}
      />
    </SafeAreaProvider>
  );
}
