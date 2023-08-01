import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './HomeScreen/HomeScreen';
import Settings from './SettingsScreen/SettingsScreen';
import SetAvailabilityScreen from './BookingPopup/SetAvailabilityScreen';
import BookingPopup from './BookingPopup/BookingPopup';
import StudentBookingScreen from './BookingPopup/StudentBookingScreen';
import BookedSlotsScreen from './BookedSlotsScreen/BookedSlotsScreen';
import ReleasedSlotsScreen from './ReleasedSlotsScreen';
import ModuleList from './ModuleListScreen/ModuleListScreen';
import UpdateModule from './SettingsScreen/UpdateModule';
import AdditionModule from './SettingsScreen/AddModules';

const homeName = 'Home';
const bookingName = 'New Bookings';
const bookingListName = 'Booking List';
const settingsName = 'Settings';
const releasedSlotsName = 'Released Slots';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// decides whether to show header or not
const getScreenLocation = (route) => {
  const CurrentPage = getFocusedRouteNameFromRoute(route);
  if (CurrentPage?.includes('Tutor: Set Availability')
    || CurrentPage?.includes('BookingPopup')
    || CurrentPage?.includes('Student: New Booking') ||
    CurrentPage?.includes('Update Modules')) {
    return false;
  }
  return true;
};

function BookingTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingTab" component={ModuleList} options={{ headerShown: false, unmountOnBlur: true }} />
      <Stack.Screen name="BookingPopup" component={BookingPopup} options={{ headerShown: true }} />
      <Stack.Screen name="Tutor: Set Availability" component={SetAvailabilityScreen} />
      <Stack.Screen name="Student: New Booking" component={StudentBookingScreen} />
    </Stack.Navigator>
  );
}

function SettingTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="History" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="Update Modules" component={UpdateModule} />
      <Stack.Screen name="Add Module" component={AdditionModule} />
    </Stack.Navigator>
  );
}

export default function MainContainer() {
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
        options={({ route }) => ({ headerShown: getScreenLocation(route), unmountOnBlur: true })}
      />
      <Tab.Screen name={bookingListName} component={BookedSlotsScreen} />
      <Tab.Screen name={releasedSlotsName} component={ReleasedSlotsScreen} />
      <Tab.Screen name={settingsName} component={SettingTab} options={({ route }) => ({ headerShown: getScreenLocation(route), unmountOnBlur: true })} />
    </Tab.Navigator>
  );
}