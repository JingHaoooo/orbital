import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import axios from 'axios';
import Nuscourse from '../utility/Nuscourse';

export default function BookingScreen() {

  const [searchModule, setSearchModule] = useState("");
  const [nusModule, setNusModule] = useState([]);



  const filteredModuleData = () => {
    return nusModule.filter(
      (item) =>
        item.moduleCode.toLowerCase().includes(searchModule.toLowerCase()) ||
        item.title.toLowerCase().includes(searchModule.toLowerCase())
    );
  };

  const getNusmods = () => {
    axios.get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then(function (response) {
        // handle success
        setNusModule(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <View style={styles.container}>
      <SearchBar searchModule={searchModule} setSearchModule={setSearchModule} onSubmit={getNusmods} />
      <FlatList style={{ gap: 5, }}
        data={filteredModuleData()}
        renderItem={({ item }) =>
          <Nuscourse
            moduleCode={item.moduleCode}
            title={item.title}
            onPress={() => navigation.navigate('BookingPopup', item)}
          />}
        keyExtractor={(item) => item.moduleCode}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})