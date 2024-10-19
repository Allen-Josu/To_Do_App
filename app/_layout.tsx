import { Stack, Tabs } from "expo-router";
import Home from "./(home)";

export default function _layout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="home" />
            </Stack>
        </>
    );
}
