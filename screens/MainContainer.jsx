import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './HomeScreen';
import Settings from './SettingsScreen';
import BookingScreen from './BookingScreen';
import SetAvailabilityScreen from './SetAvailabilityScreen';
import BookingPopup from './BookingPopup';
import StudentBookingScreen from './StudentBookingScreen';
import BookedSlotsScreen from './BookedSlotsScreen';

const homeName = 'Home';
const bookingName = 'New Bookings';
const bookingListName = 'Booking List';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getScreenLocation = (route) => {
  const CurrentPage = getFocusedRouteNameFromRoute(route);
  if (CurrentPage?.includes('Tutor: Set Availaibility') || CurrentPage?.includes('BookingPopup') || CurrentPage?.includes('Student: New Booking')) {
    return false;
  }
  return true;
};

function BookingTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingTab" component={BookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingPopup" component={BookingPopup} options={{ headerShown: true }} />
      <Stack.Screen name="Tutor: Set Availaibility" component={SetAvailabilityScreen} />
      <Stack.Screen name="Student: New Booking" component={StudentBookingScreen} />
    </Stack.Navigator>
  );
}

export default function MainContainer(props) {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, colour, size }) => {
          let iconName;
          const routerName = route.name;

          if (routerName === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (routerName === bookingName) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (routerName === bookingListName) {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (routerName === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={colour} />;
        },
        // add styling later
        tabBarActiveTintColor: 'black',

      })}
    >

      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen
        name={bookingName}
        component={BookingTab}
        options={({ route }) => ({ headerShown: getScreenLocation(route) })}
      />
      <Tab.Screen name={bookingListName} component={BookedSlotsScreen} />
      <Tab.Screen name={settingsName} component={Settings} />

    </Tab.Navigator>
  );
}
