import { View, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles';
import Nuscourse from '../../../components/ui/Nuscourse';
import SearchBar from '../../../components/ui/SearchBar';

export default function BookingScreen() {
  const [searchModule, setSearchModule] = useState('');
  const [nusModule, setNusModule] = useState([]);

  const filteredModuleData = () => nusModule.filter(
    (item) => item.moduleCode.toLowerCase().includes(searchModule.toLowerCase())
      // || item.title.toLowerCase().includes(searchModule.toLowerCase()),
  );

  const getNusmods = () => {
    axios.get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then((response) => {
        // handle success
        setNusModule(response.data);
      })
      .catch((error) => {
        // handle error
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchModule={searchModule}
        setSearchModule={setSearchModule}
        onSubmit={getNusmods}
      />
      <FlatList
        style={{ gap: 5 }}
        data={filteredModuleData()}
        renderItem={({ item }) => (
          <Nuscourse
            moduleCode={item.moduleCode}
            title={item.title}
            onPress={() => navigation.navigate('BookingPopup', item)}
          />
        )}
        keyExtractor={(item) => item.moduleCode}
      />
    </View>
  );
}


