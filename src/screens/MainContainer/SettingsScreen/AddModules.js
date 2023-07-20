import { View, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../../screens/AddModuleScreen/styles'
import SearchBar from '../../../components/ui/SearchBar';
import Course from '../../../components/ui/Course';
import { useNavigation } from '@react-navigation/native';

export default function AdditionModule({ route }) {
    const [searchModule, setSearchModule] = useState('');
    const [nusModule, setNusModule] = useState([]);

    const navigation = useNavigation();
    const { currModules, user } = route.params;

    // Check if it's already set, if not, set it with the value from route.params
    const [selectedModules, setSelectedModules] = useState(selectedModules || currModules);

    const filteredModuleData = () =>
        nusModule.filter((item) =>
            item.moduleCode.toLowerCase().includes(searchModule.toLowerCase())
        );

    const getNusmods = () => {
        axios
            .get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
            .then((response) => {
                // handle success
                setNusModule(response.data);
            })
            .catch((error) => {
                // handle error
            });
    };

    const handleModulePress = (moduleCode) => {
        setSelectedModules((prevSelectedModules) => {
            if (prevSelectedModules.includes(moduleCode)) {
                // Module already selected, remove it from the list
                return prevSelectedModules.filter((code) => code !== moduleCode);
            } else {
                // Module not selected, add it to the list
                return [...prevSelectedModules, moduleCode];
            }
        });
    };

    const handleSavePress = () => {
        navigation.navigate('Update Modules', {
            selectedModules: selectedModules,
            user: user
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
                style={{ marginBottom: 20 }}
                data={filteredModuleData()}
                renderItem={({ item }) => (
                    <Course
                        moduleCode={item.moduleCode}
                        title={item.title}
                        onPress={() => handleModulePress(item.moduleCode)}
                        semesters={item.semesters}
                        selected={selectedModules.includes(item.moduleCode)}
                    />
                )}
                keyExtractor={(item) => item.moduleCode}
            />
            <View style={{ marginBottom: 10 }}>
                <Text style={styles.text}>Currently Selected:</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.selectedModulesContainer}
                >
                    {selectedModules.map((moduleCode) => (
                        <View key={moduleCode} style={styles.moduleBubble}>
                            <Text style={styles.moduleBubbleText}>{moduleCode}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSavePress}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}