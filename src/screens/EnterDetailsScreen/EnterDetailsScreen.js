import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles';
import { firebase } from '../../firebase/config';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { AuthContext } from '../../../utility/AuthContext'; // Import the AuthContext


export default function EnterDetailsScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const userId = getCurrentUserUid();

    const [displayName, setDisplayName] = useState('');
    const [nusModule, setNusModule] = useState([]);

    const [modulesTaken, setModulesTaken] = useState([]);
    const [takingOpen, setTakingOpen] = useState(false);

    const [modulesTeaching, setModulesTeaching] = useState([]);
    const [teachingOpen, setTeachingOpen] = useState(false);

    // render again when component mounts
    useEffect(() => {
        getNusmods();
    }, []);

    const getNusmods = () => {
        axios
            .get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
            .then((response) => {
                setNusModule(response.data);
                // console.log(nusModule.map((item) => item.moduleCode))
            })
            .catch((error) => {
                // to handle error
            });
    };

    const NUSmods = nusModule.map((module) => ({
        label: module.moduleCode,
        value: module.moduleCode,
    }))

    const onTakingOpen = useCallback(() => {
        setTeachingOpen(false);
    }, []);

    const onTeachingOpen = useCallback(() => {
        setTakingOpen(false);
    }, []);

    const onSaveDetailsPress = () => {
        const data = {
            modulesTaken,
            modulesTeaching,
            displayName,
        };

        const usersRef = firebase.firestore().collection('users');
        usersRef
            .doc(userId)
            .update(data)
            .then(() => {
                navigation.replace('MainContainer');
            })
            .catch((error) => {
                alert(error);
            });
    };

    // if (user.displayName !== '') {
    //     navigation.replace('MainContainer')
    // }
    useEffect(() => {
        if (user.displayName !== '') {
            navigation.replace('MainContainer')
        }
    }, []);


    return (
        <View style={styles.container}>

            {/* <Text style={styles.mentorsize}>NUSmentor</Text> */}
            <Text style={styles.text}>
                Let us know the modules you are taking and/or teaching this semester!
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDisplayName(text)}
                value={displayName}
                underlineColorAndroid="transparent"
                autoCapitalize="characters"
                autoCorrect={false}
            />

            <View style={styles.dropdownContainer1}>
                <Text style={styles.text}>Which modules are you taking this semester?</Text>
                <DropDownPicker
                    items={nusModule.map((module) => ({
                        label: module.moduleCode,
                        value: module.moduleCode,
                    }))}
                    open={takingOpen}
                    onOpen={onTakingOpen}
                    setOpen={() => setTakingOpen(!takingOpen)}
                    value={modulesTaken}
                    setValue={(val) => setModulesTaken(val)}

                    autoScroll
                    placeholder='Select modules'
                    theme='LIGHT'
                    containerStyle={styles.dropdown}

                    multiple={true}
                    min={0}
                    max={10}
                    mode="BADGE"
                    multipleText="%d modules selected"

                    searchable={true}
                    searchPlaceholder="Search for a module"
                    searchPlaceholderTextColor="#aaaaaa"
                    showArrowIcon={true}
                    showTickIcon={true}
                />
            </View>

            <View style={styles.dropdownContainer2}>
                <Text style={styles.text}>
                    Which modules are you teaching this semester?
                </Text>
                <DropDownPicker
                    items={nusModule.map((module) => ({
                        label: module.moduleCode,
                        value: module.moduleCode,
                    }))}
                    open={teachingOpen}
                    onOpen={onTeachingOpen}
                    setOpen={() => setTeachingOpen(!teachingOpen)}
                    value={modulesTeaching}
                    setValue={(val) => setModulesTeaching(val)}

                    autoScroll
                    placeholder='Select modules'
                    theme='LIGHT'
                    containerStyle={styles.dropdown}

                    multiple={true}
                    min={0}
                    max={10}
                    mode="BADGE"
                    multipleText="%d modules selected"

                    searchable={true}
                    searchPlaceholder="Search for a module"
                    searchPlaceholderTextColor="#aaaaaa"
                    showArrowIcon={true}
                    showTickIcon={true}

                    style={{ zIndex: 1 }}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSaveDetailsPress}>
                <Text style={styles.buttonTitle}>Save Details</Text>
            </TouchableOpacity>
        </View>
    );
}