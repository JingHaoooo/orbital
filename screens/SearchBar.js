import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'


const SearchBar = (props) => {

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Search Module Code'
                style={styles.input}
                value={props.searchModule}
                onChangeText={(text) => props.setSearchModule(text)}
                onSubmitEditing={props.onSubmit}
            />
        </View>
    );
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        color: 'black',
    }
})