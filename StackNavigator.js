import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import Booking from './screens/Booking';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Logout from './screens/Logout';



const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarLabel: "Home", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="home" size={24} color="black" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        )
                    }}
                />
                <Tab.Screen
                    name="Booking"
                    component={Booking}
                    options={{
                        tabBarLabel: "Booking", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="calendar" size={24} color="black" />
                        ) : (
                            <AntDesign name="calendar" size={24} color="black" />
                        )
                    }}
                />
                <Tab.Screen
                    name="Logout"
                    component={Logout}
                    options={{
                        tabBarLabel: "Logout", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="log-out" size={24} color="black" />
                        ) : (
                            <Feather name="log-out" size={24} color="black" />
                        )
                    }}
                />
            </Tab.Navigator>
        );
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name="Nusmentor" component={BottomTabs} />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
