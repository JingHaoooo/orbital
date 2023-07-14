import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchUserData } from '../../../firebase/config';
import Module from '../../../components/ui/Module';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function ModuleList() {
    const [modulesTaken, setModulesTaken] = useState([]);
    const [modulesTeaching, setModulesTeaching] = useState([]);

    navigation = useNavigation();

    useEffect(() => {
        retrieveModules();
    }, []);

    const retrieveModules = async () => {
        try {
            const studentDetails = await fetchUserData();
            const response = await axios.get(
                'https://api.nusmods.com/v2/2022-2023/moduleList.json'
            );

            const filteredModuleTaken = response.data.filter((module) =>
                studentDetails.modulesTaken.includes(module.moduleCode)
            );
            const filteredModuleTeaching = response.data.filter((module) =>
                studentDetails.modulesTeaching.includes(module.moduleCode)
            );

            setModulesTaken(filteredModuleTaken);
            setModulesTeaching(filteredModuleTeaching);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <ScrollView>
            <Text> </Text>
            <View>
                {modulesTaken.map(module => (
                    <Module key={module.moduleCode} module={module.moduleCode} title={module.title}
                        onPress={() => navigation.navigate('BookingPopup', { ...module, user: 'STUDENT' })} user={'STUDENT'} />
                ))}
                {modulesTeaching.map(module => (
                    <Module key={module.moduleCode} module={module.moduleCode} title={module.title}
                        onPress={() => navigation.navigate('BookingPopup', { ...module, user: 'TUTOR' })} user={'TUTOR'} />
                ))}
            </View>
        </ScrollView>
    );
}

export default ModuleList;