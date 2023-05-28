import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabRouter, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomePage from './HomePage';
import Booking from './Booking';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Logout from './Logout';
import BookingPopup from './BookingPopup';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getScreenLocation = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName?.includes('BookingPopup')){
        return 'none';
    }
    return 'flex';
}

const StackNavigator = () => {
    const BookingTab = () => {
        return (
            <Stack.Navigator >
                <Stack.Screen name='BookingTab' component={Booking} options={{ headerShown: false }} />
                <Stack.Screen name='BookingPopup' component={BookingPopup} />
            </Stack.Navigator>
        );
    }

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
                    component={BookingTab}
                    options={({ route }) => ({
                        tabBarLabel: "Booking", headerShown: false, tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="calendar" size={24} color="black" />
                        ) : (
                            <AntDesign name="calendar" size={24} color="black" />
                        ),
                        tabBarStyle: { display: getScreenLocation(route) },
                    })}
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
        <Stack.Navigator >
            <Stack.Screen name="Nusmentor" component={BottomTabs} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})
