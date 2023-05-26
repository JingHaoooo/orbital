import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Nuscourse = (props) => {
  return (
    <View style={styles.container}>
      <View style= {styles.modulecontainer}>
        <Text style={styles.modulesize}>{props.moduleCode}</Text>
        <Text style={styles.moduletitle}>{props.title}</Text>
      </View>
    </View>
  );
}

export default Nuscourse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    width:"95%",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  modulecontainer: {
    justifyContent: 'center', 
    backgroundColor:'orange',
    borderWidth: 1,    
    borderRadius: 15,
    paddingBottom: 5,
  },
  modulesize: {
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent:'flex-start',
    paddingLeft: 10,
  },
  moduletitle:{
    fontSize: 15,
    paddingLeft: 10,
  }
})