import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "./HomeScreen";
import Booking from "./BookingScreen";
import SetAvailability from "./SetAvailabilityScreen";
import Settings from "./SettingsScreen";


const homeName = "Home";
const bookingName = "Booking";
const setAvailName = "Availability";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, colour, size }) => {
                    let iconName;
                    let routerName = route.name;

                    if (routerName === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (routerName === bookingName) {
                        iconName = focused ? 'calendar' : 'calendar-outline'
                    } else if (routerName === setAvailName) {
                        iconName = focused ? 'checkbox' : 'checkbox-outline'
                    } else if (routerName === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={colour} />
                },
                // add styling later
                tabBarActiveTintColor: 'black',

            })}>

            <Tab.Screen name={homeName} component={HomePage} />
            <Tab.Screen name={bookingName} component={Booking} />
            <Tab.Screen name={setAvailName} component={SetAvailability} />
            <Tab.Screen name={settingsName} component={Settings} />

        </Tab.Navigator>
    )
}