import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Post } from './components/Post';
import { Text, Button, TextInput, Checkbox } from 'react-native-paper'; 
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoginPage } from './components/Nus';


export default function App() {

  
  return (
    <SafeAreaProvider>
    <SafeAreaView style= {styles.container}>
      <LoginPage />
      <Text>Test</Text>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
