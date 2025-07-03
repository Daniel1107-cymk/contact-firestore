import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Create, Home, Update } from "../pages";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();

const Router = () => {
    React.useEffect(() => {
        LogBox.ignoreLogs(["..."]);
    }, []);
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Update" component={Update} />
            <Stack.Screen name="Create" component={Create} />
        </Stack.Navigator>
    );
};

export default Router;

const styles = StyleSheet.create({});
