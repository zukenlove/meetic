import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout(){
    return(
<SafeAreaProvider>

        <Stack>
            <Stack.Screen
                name="index"
                options = {
                {
                    title: "Homepage",
                    animation : 'fade',
                    headerShown : false
                }
                }
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    title: "Details",
                    animation: 'fade',
                    headerShown: false
                }}
            />
        </Stack>
    </SafeAreaProvider>
    )
}