import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nuscourse from '../Nuscourse';

export default function Booking() {
  const [searchModule, setSearchModule] = useState("");
  const [nusModule, setNusModule] = useState([]);

  
  return (
    <View style={styles.container}>
      <SearchBar searchModule={searchModule} setSearchModule={setSearchModule} onSubmit={getNusmods} />
      <FlatList style={{backgroundColor:'red'}}
        data={nusModule}
        renderItem={({ item }) => 
        <Nuscourse
          moduleCode={item.moduleCode}
          title={item.title}
        />}
   //     keyExtractor={(item) => item.semesters}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'yellow',
  }
})