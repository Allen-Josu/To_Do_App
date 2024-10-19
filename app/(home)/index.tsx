import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
} from "react-native";
import { CheckBox } from "react-native-elements";

export default function Home() {
    const [text, setText] = useState<string | undefined>(undefined);
    const [addTask, setAddTask] = useState<string[]>([]); // Correct array type
    const [isChecked, setIsChecked] = useState({});
    const [checkedItems, setCheckedItems] = useState<{
        [key: string]: boolean;
    }>({});

    const colorScheme = useColorScheme();

    const colors = Colors[colorScheme || "light"];

    const setTask = (e: string) => {
        setText(e);
    };

    const AddTask = () => {
        if (text && text.trim() !== "") {
            setAddTask((prevTasks) => [...prevTasks, text]);
            setText("");
            setCheckedItems({ ...checkedItems, [text]: false });
        } else {
            Alert.alert("Input Error", "Please add task");
        }
    };

    const handleCheckboxPress = (item: string) => {
        console.log(item);
        setCheckedItems({ ...checkedItems, [item]: true });

        setTimeout(() => {
            setAddTask((prevTasks) =>
                prevTasks.filter((task) => task !== item)
            );
            setCheckedItems((prev) => {
                const newCheckedItems = { ...prev };
                delete newCheckedItems[item];
                return newCheckedItems;
            });
        }, 1000);
    };

    return (
        <>
            <ScrollView>
                <SafeAreaView>
                    <Stack.Screen
                        options={{
                            title: "To-Do List",
                            headerStyle: { backgroundColor: colors.background },
                            headerTintColor: colors.text,
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                        }}
                    />
                    <View style={styles.container}>
                        <TextInput
                            selectionColor={colors.icon}
                            editable
                            maxLength={40}
                            style={styles.textInput}
                            value={text}
                            onChangeText={(e) => setTask(e)}
                        />
                        <Button title="Add Task" onPress={AddTask} />
                    </View>

                    <View style={styles.seeTaskContainer}>
                        {addTask.map((item) => (
                            <>
                                <CheckBox
                                    title={item}
                                    checked={checkedItems[item]}
                                    onPress={() => handleCheckboxPress(item)}
                                    checkedColor={colors.tint}
                                    uncheckedColor="grey"
                                    containerStyle={{ borderRadius: 10 }}
                                    size={25}
                                />
                            </>
                        ))}
                    </View>
                </SafeAreaView>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 15,
    },
    textInput: {
        height: 40,
        borderWidth: 0.5,
        fontSize: 22,
        width: "75%",
        borderRadius: 10,
        paddingLeft: 10,
    },
    seeTaskContainer: {
        padding: 20,
        borderRadius: 5,
    },
    text: {
        fontSize: 28,
    },
});
