import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import Settings from './SettingsScreen/SettingsScreen';
import BookingScreen from './BookingScreen/BookingScreen';
import SetAvailabilityScreen from './BookingPopup/SetAvailabilityScreen';
import BookingPopup from './BookingPopup/BookingPopup';
import StudentBookingScreen from './BookingPopup/StudentBookingScreen';
import BookedSlotsScreen from './BookedSlotsScreen/BookedSlotsScreen';
import ReleasedSlotsScreen from './ReleasedSlotsScreen';
import { getCurrentUserUid } from '../../firebase/config';

const homeName = 'Home';
const bookingName = 'New Bookings';
const bookingListName = 'Booking List';
const settingsName = 'Settings';
const releasedSlotsName = 'Released Slots';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const getScreenLocation = (route) => {
  const CurrentPage = getFocusedRouteNameFromRoute(route);
  if (CurrentPage?.includes('Tutor: Set Availability')
    || CurrentPage?.includes('BookingPopup')
    || CurrentPage?.includes('Student: New Booking')) {
    return false;
  }
  return true;
};

function BookingTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingTab" component={BookingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingPopup" component={BookingPopup} options={{ headerShown: true }} />
      <Stack.Screen name="Tutor: Set Availability" component={SetAvailabilityScreen} />
      <Stack.Screen name="Student: New Booking" component={StudentBookingScreen} />
    </Stack.Navigator>
  );
}

export default function MainContainer() {
  const userId = getCurrentUserUid();
  console.log(userId);
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
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
          } else if (routerName === bookingListName) {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (routerName === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (routerName === releasedSlotsName) {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }

          return <Ionicons name={iconName} size={size} color={colour} />;
        },
        tabBarActiveTintColor: 'black',
      })}
    >

      <Tab.Screen name={homeName} component={HomeScreen} options={{ unmountOnBlur: true }} />
      <Tab.Screen
        name={bookingName}
        component={BookingTab}
        options={({ route }) => ({ headerShown: getScreenLocation(route) })}
      />
      <Tab.Screen name={bookingListName} component={BookedSlotsScreen} />
      <Tab.Screen name={releasedSlotsName} component={ReleasedSlotsScreen} />
      <Tab.Screen name={settingsName} component={Settings} />
    </Tab.Navigator>
  );
}
